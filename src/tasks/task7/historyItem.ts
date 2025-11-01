import { TreeNode } from "../task6_2/colorBlenderTree";

export interface HistoryItem {
  colorA: string;
  colorB: string;
  result: string;
  tree: TreeNode;
}