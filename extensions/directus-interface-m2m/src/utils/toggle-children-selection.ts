import type { NodeEl } from '../stores';

/**
 * Toggles the selection of children nodes recursively.
 *
 * @param node - The parent node.
 * @param nodes - The array of all nodes.
 * @param selected - The selection state to apply to the children nodes.
 */
export const toggleChildrenSelection = (node: NodeEl, nodes: NodeEl[], selected: boolean): void => {
  const children = nodes.filter(n => n.parent === node.id);
  children.forEach(child => {
    child.selected = selected;
    toggleChildrenSelection(child, nodes, selected);
  });
};
