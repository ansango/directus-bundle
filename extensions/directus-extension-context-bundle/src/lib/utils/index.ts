import { useApi } from "@directus/extensions-sdk";
import { type Ref } from "vue";
import { type NodeEl } from "../../context-tree-selector/stores";
/**
 * Retrieves items from a collection using the Directus API.
 *
 * @param api - The Directus API instance.
 * @param collectionName - The name of the collection to retrieve items from.
 * @returns A promise that resolves to an object containing the retrieved items.
 */
export const getItems = async <T>(api: ReturnType<typeof useApi>, collectionName: string) =>
  await api.get<{ data: T }>(`/items/${collectionName}`);

/**
 * Fetches data and junction data from the specified collections.
 *
 * @param {Object} params - The parameters for the function.
 * @param {ReturnType<typeof useApi>} params.api - The API instance to use for fetching data.
 * @param {string} params.collection - The name of the collection to fetch nodes from.
 * @param {string} params.currentRelationCollection - The name of the collection to fetch junction data from.
 * @param {Ref<string[] | undefined>} params.types - A reference to an array of types to filter nodes by.
 *
 * @returns {Promise<{ data: NodeEl[], junctionData: Array<Record<string, any>> }>} An object containing the fetched data and junction data.
 */
export const getDataAndJunctionData = async ({
  api,
  collection,
  currentRelationCollection,
  types,
}: {
  api: ReturnType<typeof useApi>;
  collection: string;
  currentRelationCollection: string;
  types: Ref<string[] | undefined>;
}) => {
  const [resNodes, resJunction] = await Promise.all([
    await getItems<NodeEl[]>(api, collection),
    await getItems<Array<Record<string, any>>>(api, currentRelationCollection),
  ]);

  const thereAreNoTypes = !types.value || types.value.length === 0;
  const allNodes = resNodes.data.data;
  const nodesByType = resNodes.data.data.filter((node) => types?.value?.includes(node.type) || !types.value);
  const data = thereAreNoTypes ? allNodes : nodesByType;
  const junctionData = resJunction.data.data;
  return { data, junctionData };
};
