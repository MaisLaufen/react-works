export type TreeNodeType = 'warm' | 'cool' | 'light' | 'dark' | 'color';

export interface TreeNode {
  id: string; // 'warm', 'cool', 'light', 'dark' || HEX
  type: TreeNodeType;
  name: string;
  children?: TreeNode[]; 
  color?: string;
  parent?: TreeNode;
}