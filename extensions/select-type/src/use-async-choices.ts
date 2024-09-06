import { useApi } from "@directus/extensions-sdk";
import { onMounted, ref } from "vue";

type Option = {
  text: string;
  value: string | number | boolean;
};

type NodeType = {
  type: string;
};

const getItems = async <T>(api: ReturnType<typeof useApi>, collectionName: string) =>
  await api.get<{ data: T }>(`/items/${collectionName}`);

export const useAsyncChoices = (props: { collectionName: string }) => {
  const api = useApi();
  const choices = ref<Option[] | null>(null);

  onMounted(async () => {
    try {
      const {
        data: { data },
      } = await getItems<NodeType[]>(api, props.collectionName);
      const types = data.filter((field) => field.type);
      const uniqueTypes = [...new Set(types.map((field) => field.type))];
      choices.value = uniqueTypes.map((type) => ({
        text: type,
        value: type,
      }));
    } catch (error) {
      console.error(error);
      choices.value = null;
    }
  });

  return choices;
};
