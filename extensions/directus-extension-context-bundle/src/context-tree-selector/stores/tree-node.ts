/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { type Ref, computed, ref } from "vue";
import { defineStore } from "pinia";
import { useApi } from "@directus/extensions-sdk";
import { mapInputParentChildren, nodesToRemove } from "../utils";
import { toggleChildrenSelection, updateParentSelection, compareNodes } from "../utils";
import type { NodeDirectusPreview, NodeEl, NodeMapped } from "./tree-node.types";

const getItems = async <T>(api: ReturnType<typeof useApi>, collectionName: string) =>
  await api.get<{ data: T }>(`/items/${collectionName}`);

export const useTreeNodeStore = defineStore("tree-node", () => {
  /**
   * The API object used for making API calls.
   */
  const api = useApi();
  /**
   * Indicates whether the tree node is currently loading.
   */
  const isLoading = ref(false);
  /**
   * Represents the error message associated with the tree node.
   */
  const error = ref<string | null>(null);
  /**
   * Represents an array of nodes.
   */
  const nodes = ref<NodeEl[]>([]);
  const previousDirectusNodes = ref<NodeDirectusPreview[]>([]);
  /**
   * An array of selected IDs.
   */
  const selectedIds = ref<number[]>([]);

  /**
   * Fetches items from the API and updates the state of the nodes.
   *
   * @param collection - The collection name to fetch items from.
   * @param currentRelationCollection - The current relation collection name.
   * @param junctionField - The junction field name.
   * @param relationField - The relation field name.
   * @param primaryKey - The primary key reference.
   */
  const fetchItems = async (
    collection: string,
    currentRelationCollection: string,
    junctionField: string,
    relationField: string,
    primaryKey: Ref<string>,
    types: Ref<string[] | undefined>
  ) => {
    isLoading.value = true;
    try {
      const [resNodes, resJunction] = await Promise.all([
        await getItems<NodeEl[]>(api, collection),
        await getItems<Array<Record<string, any>>>(api, currentRelationCollection),
      ]);

      const data = resNodes.data.data.filter((node) => types?.value?.includes(node.type) || !types.value);
      const junctionData = resJunction.data.data;

      nodes.value = data.map((node) => ({
        ...node,
        selected: false,
        collapsed: false,
        indeterminate: false,
      }));

      const _selectedNodes = junctionData
        .filter((item) => item[junctionField] === parseInt(primaryKey.value))
        .map((item) => item[relationField]) as number[];
      selectedIds.value = _selectedNodes;

      const _previousDirectus = junctionData
        .filter((item) => item[junctionField] === parseInt(primaryKey.value))
        .map((item) => ({ id: item[relationField], junctionId: item.id }));

      previousDirectusNodes.value = _previousDirectus.map(({ id, junctionId }) => {
        const nodeValue = nodes.value.find((n) => n.id === id);
        return {
          id: nodeValue?.id,
          value: nodeValue?.value,
          junctionId,
        };
      }) as NodeDirectusPreview[];

      nodes.value.forEach((node) => {
        const nodeId = selectedIds.value.find((n) => n.toString() === node.id.toString());
        if (!nodeId) return;
        node.selected = true;
        toggleChildrenSelection(node, nodes.value, true);
        updateParentSelection(nodes.value, node.parent);
      });

      isLoading.value = false;
    } catch (err) {
      isLoading.value = false;
      error.value = JSON.stringify(err);
    }
  };

  /**
   * Toggles the selection state of a tree node and updates the selection state of its children and parent nodes.
   *
   * @param id - The ID of the node to toggle the selection for.
   */
  const toggleNodeSelection = (id: string) => {
    const node = nodes.value.find((n) => n.id === id);
    if (!node) return;

    const newSelected = !node.selected;
    node.selected = newSelected;
    node.indeterminate = false;
    toggleChildrenSelection(node, nodes.value, newSelected);
    updateParentSelection(nodes.value, node.parent);
  };

  /**
   * Toggles the collapse state of a tree node.
   * If the node is currently collapsed, it will be expanded.
   * If the node is currently expanded, it will be collapsed.
   *
   * @param id - The ID of the node to toggle.
   */
  const toggleNodeCollapse = (id: string) => {
    const node = nodes.value.find((n) => n.id === id);
    if (!node) return;

    node.collapsed = !node.collapsed;
  };

  /**
   * Retrieves the collapsed state of a tree node by its ID.
   * @param id - The ID of the tree node.
   * @returns The collapsed state of the tree node, or undefined if the node is not found.
   */
  const getIsCollapsed = (id: string | null) => nodes.value.find((node) => node.id === id)?.collapsed;

  /**
   * Returns the selected state of a node with the specified ID.
   * @param id - The ID of the node.
   * @returns The selected state of the node, or undefined if the node is not found.
   */
  const getIsSelected = (id: string | null) => nodes.value.find((node) => node.id === id)?.selected;

  const getIsIntermediate = (id: string | null) => nodes.value.find((node) => node.id === id)?.indeterminate;

  /**
   * Computed property that returns an array of selected nodes.
   *
   * @returns {TreeNode[]} An array of selected nodes.
   */
  const selectedNodes = computed(() => nodes.value.filter((node) => node.selected));
  /**
   * Computed property that returns an array of selected nodes without their own children.
   *
   * @returns {Array} The selected nodes without their own children.
   */
  const selectedNodesWithoutOwnChildren = computed(() => {
    const nodes = nodesToRemove(selectedNodes.value);
    return selectedNodes.value.filter((node) => !nodes.map((node) => node.id).includes(node.id));
  });
  /**
   * An array of selected node IDs.
   *
   * @remarks
   * This array contains the IDs of the selected nodes without their own children.
   *
   * @returns An array of selected node IDs.
   */
  const selectedNodesIds = computed(() => selectedNodesWithoutOwnChildren.value.map((node) => node.id));
  /**
   * Computed property that maps the input parent children to a new array of NodeMapped objects.
   */
  const mappedNodes = computed(() => ({
    nodes: mapInputParentChildren(nodes.value) as unknown as NodeMapped[],
  }));

  /**
   * Prepares the payload for a specific junction field, relation field, and primary key.
   *
   * @param junctionField - The junction field name.
   * @param relationField - The relation field name.
   * @param primaryKey - The primary key reference.
   */
  const preparePayload = ({
    junctionField,
    relationField,
    primaryKey,
  }: {
    junctionField: string;
    relationField: string;
    primaryKey: Ref<string>;
  }) => {
    const initialDirectusNodes = previousDirectusNodes.value;
    const selectedNodes = selectedNodesWithoutOwnChildren.value;
    const { nodesToAdd, nodesToRemove } = compareNodes(initialDirectusNodes, selectedNodes);

    const initialStatePayload = initialDirectusNodes.map(({ junctionId }) => junctionId);
    let payloadState = {};

    if (nodesToAdd.length > 0) {
      payloadState = {
        create: nodesToAdd.map(({ id }) => ({
          [junctionField]: primaryKey,
          [relationField]: {
            id,
          },
        })),
      };
    }

    if (nodesToRemove.length > 0) payloadState = { ...payloadState, delete: nodesToRemove };

    return Object.keys(payloadState).length > 0 ? payloadState : initialStatePayload;
  };

  return {
    nodes,
    previousDirectusNodes,
    isLoading,
    error,
    selectedIds,
    selectedNodes,
    selectedNodesIds,
    selectedNodesWithoutOwnChildren,
    mappedNodes,
    fetchItems,
    toggleNodeSelection,
    toggleNodeCollapse,
    getIsSelected,
    getIsIntermediate,
    getIsCollapsed,
    preparePayload,
  };
});
