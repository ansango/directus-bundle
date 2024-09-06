/* eslint-disable @typescript-eslint/naming-convention */
import type { NodeEl } from '../stores';

/**
 * Updates the selection status of the parent node based on the selection status of its siblings.
 * If the parent node is selected, all its siblings must be selected as well.
 * If any of the siblings is not selected, the parent node must be deselected.
 * Recursively updates the selection status of the parent's parent until reaching the root node.
 *
 * @param nodes - The array of nodes.
 * @param parentId - The ID of the parent node.
 */
export const updateParentSelection = (nodes: NodeEl[], parentId: string | null): void => {
  if (parentId === null) return;
  const parent = nodes.find(n => n.id === parentId);
  if (!parent) return;
  const siblings = nodes.filter(n => n.parent === parentId);
  const allSiblingsSelected = siblings.every(sibling => sibling.selected);
  parent.selected = allSiblingsSelected;
  parent.indeterminate =
    !allSiblingsSelected && siblings.some(sibling => sibling.selected || sibling.indeterminate);
  updateParentSelection(nodes, parent.parent);
};
