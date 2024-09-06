import { useApi } from "@directus/extensions-sdk";

/**
 * Retrieves items from a collection using the Directus API.
 *
 * @param api - The Directus API instance.
 * @param collectionName - The name of the collection to retrieve items from.
 * @returns A promise that resolves to an object containing the retrieved items.
 */
export const getItems = async <T>(api: ReturnType<typeof useApi>, collectionName: string) =>
  await api.get<{ data: T }>(`/items/${collectionName}`);
