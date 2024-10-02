import { useApi } from "@directus/extensions-sdk";
import { onMounted, ref, watch, watchEffect, type Ref } from "vue";
import { getItems } from "../utils";

type Option = {
  text: string;
  value: string | number | boolean;
};

type NodeType = {
  type: string;
};

export type ChoicesValue = Option[] | null;

/**
 * Custom composable function that fetches async choices for a given collection.
 * @param props - The properties object containing the collection name.
 * @returns A ref object containing the async choices.
 */
export const useAsyncChoices = (collectionName: Ref<string>) => {
  const api = useApi();
  const choices = ref<ChoicesValue>(null);

  const fetchItems = async (collectionName: string) => {
    try {
      const {
        data: { data },
      } = await getItems<NodeType[]>(api, collectionName);
      const types = data.filter((field) => field.type);
      const uniqueTypes = [...new Set(types.map((field) => field.type))];

      return uniqueTypes.map((type) => ({
        text: type,
        value: type,
      }));
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  watchEffect(async () => {
    const items = await fetchItems(collectionName.value);
    choices.value = items;
  });

  return choices;
};
