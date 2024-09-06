import type { Item } from '@directus/types';

import type { NodeMapped as NodeEl } from '../stores';

/**
 * Recursively removes the 'children' property from a given node and its descendants
 * if the 'children' array is empty.
 * @param node - The node to clean.
 */
const cleanChildren = (node: NodeEl) => {
  if (node.children?.length === 0) delete node.children;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  else node.children && node.children.forEach(cleanChildren);
};

/**
 * Checks if an item has both "key" and "parent" properties.
 *
 * @param item - The item to check.
 * @returns True if the item has both "key" and "parent" properties, false otherwise.
 */
const checkIfItemHasKeyAndParent = (item: Item): item is Item =>
  Object.prototype.hasOwnProperty.call(item, 'value') &&
  Object.prototype.hasOwnProperty.call(item, 'parent');

/**
 * Maps an array of items to an array of nodes with parent-child relationships.
 *
 * @param input - The array of items to be mapped.
 * @returns An array of nodes with parent-child relationships.
 */
export const mapInputParentChildren = (input: Item[]): NodeEl[] => {
  const map: Record<number, NodeEl> = {};
  const result: NodeEl[] = [];

  input.forEach(item => {
    if (!checkIfItemHasKeyAndParent(item)) return;

    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        value: item.value,
        parent: item.parent,
        type: item.type,
        children: [],
        selected: false,
        collapsed: false,
      };
    }
    if (item.parent === null) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      result.push({ ...map[item.id], selected: false, collapsed: false } as NodeEl);
    } else {
      if (!map[item.parent]) {
        map[item.parent] = {
          id: item.parent,
          value: '',
          type: '',
          parent: null,
          children: [],
          selected: false,
          collapsed: false,
        };
      }
      map[item.parent]?.children?.push(map[item.id]!);
    }
  });

  result.forEach(cleanChildren);
  return result;
};
