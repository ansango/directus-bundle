import type { NodeEl, NodeDirectusPreview } from '../stores';

/**
 * Compares two arrays of nodes and returns the nodes to add and remove.
 *
 * @param initial - The initial array of nodes.
 * @param newValue - The new array of nodes.
 * @returns An object containing the nodes to add and remove.
 */
export const compareNodes = (
  initial: NodeDirectusPreview[],
  newValue: NodeEl[]
): {
  nodesToAdd: NodeEl[];
  nodesToRemove: number[];
} => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const nodesToAdd = newValue.filter(node => !initial.map(node => node.id).includes(node.id));
  const nodesToRemove = initial
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .filter(node => !newValue.map(node => node.id).includes(node.id))
    .map(node => node.junctionId);
  return { nodesToAdd, nodesToRemove };
};
