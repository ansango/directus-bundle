import type { NodeMapped as NodeEl } from '../stores';

/**
 * Checks if the parent node of a given node is selected.
 * @param node - The node to check.
 * @param arrayOfCurrentNodes - The array of currently selected nodes.
 * @returns True if the parent node is selected, false otherwise.
 */
export const isParentNodeSelected = (node: NodeEl, arrayOfCurrentNodes: NodeEl[]): boolean => {
  if (!node.parent) return false;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  return arrayOfCurrentNodes.map(node => node.id).includes(node.parent);
};

/**
 * Filters an array of nodes to remove based on a condition.
 * @param arrayOfNodes - The array of nodes to filter.
 * @returns An array of nodes that satisfy the condition.
 */
export const nodesToRemove = (arrayOfNodes: NodeEl[]): NodeEl[] =>
  arrayOfNodes.filter(node => isParentNodeSelected(node, arrayOfNodes));
