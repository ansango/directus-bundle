import { useApi } from "@directus/extensions-sdk";
import { onMounted, ref } from "vue";
import { getItems } from "../utils";

type Option = {
  text: string;
  value: string | number | boolean;
};

type NodeType = {
  type: string;
};

type ChoicesValue = Option[] | null;

/**
 * Custom composable function that fetches async choices for a given collection.
 * @param props - The properties object containing the collection name.
 * @returns A ref object containing the async choices.
 */
export const useAsyncChoices = (props: { collectionName: string }) => {
  const api = useApi();
  const choices = ref<ChoicesValue>(null);

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
