/**
 * Represents a node in the tree.
 */
export interface NodeEl {
  /**
   * The unique identifier of the node.
   */
  id: string;

  /**
   * The key of the node.
   */
  value: string;
  /**
   * The type of the node.
   */
  type: string;

  /**
   * The parent node's identifier. Can be null for root nodes.
   */
  parent: string | null;

  /**
   * Indicates whether the node is selected.
   */
  selected: boolean;

  /**
   * Indicates whether the node is disabled. Optional.
   */
  disabled?: boolean;

  /**
   * Indicates whether the node is collapsed. Optional.
   */
  collapsed?: boolean;
  /**
   * Indicates if node is in indeterminate state.
   */
  indeterminate?: boolean;
}

/**
 * Represents a mapped node in the tree.
 */
export interface NodeMapped extends NodeEl {
  children?: NodeMapped[];
}

export type NodeDirectusPreview = Pick<NodeEl, 'id' | 'value'> & {
  junctionId: number;
};
