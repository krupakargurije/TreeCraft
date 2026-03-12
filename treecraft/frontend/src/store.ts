import { create } from 'zustand';

// ============================================================
// TreeCraft — Global State Store (Zustand)
// ============================================================

export type TreeType =
  | 'binary-tree'
  | 'bst'
  | 'avl'
  | 'red-black'
  | 'trie'
  | 'segment-tree'
  | 'heap'
  | 'fenwick-tree';

export interface TreeTypeInfo {
  id: TreeType;
  label: string;
  wasmId: number;
  icon: string;
  description: string;
  usesStrings: boolean;
}

export const TREE_TYPES: TreeTypeInfo[] = [
  { id: 'binary-tree', label: 'Binary Tree', wasmId: 0, icon: '🌳', description: 'Basic binary tree', usesStrings: false },
  { id: 'bst', label: 'Binary Search Tree', wasmId: 1, icon: '🔍', description: 'Ordered binary tree', usesStrings: false },
  { id: 'avl', label: 'AVL Tree', wasmId: 2, icon: '⚖️', description: 'Self-balancing BST', usesStrings: false },
  { id: 'red-black', label: 'Red-Black Tree', wasmId: 3, icon: '🔴', description: 'Color-balanced BST', usesStrings: false },
  { id: 'trie', label: 'Trie', wasmId: 4, icon: '📝', description: 'Prefix tree for strings', usesStrings: true },
  { id: 'segment-tree', label: 'Segment Tree', wasmId: 5, icon: '📊', description: 'Range query tree', usesStrings: false },
  { id: 'heap', label: 'Heap', wasmId: 6, icon: '📐', description: 'Min-heap priority queue', usesStrings: false },
  { id: 'fenwick-tree', label: 'Fenwick Tree', wasmId: 7, icon: '📈', description: 'Binary indexed tree', usesStrings: false },
];

// Tree node structure matching the JSON from WASM
export interface TreeNode {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
  height?: number;
  color?: number; // 0 = black, 1 = red
  label?: string;
  isEnd?: boolean;
  children?: TreeNode[];
  range?: [number, number];
  index?: number;
}

export interface TraversalResult {
  preorder: number[];
  inorder: number[];
  postorder: number[];
}

interface TreeState {
  // Current state
  treeType: TreeType;
  treeData: TreeNode | null;
  traversals: TraversalResult;
  searchResult: { found: boolean; value: string } | null;
  isWasmLoaded: boolean;
  isTreeImplemented: boolean | null;
  isLoading: boolean;
  statusMessage: string;

  // Actions
  setTreeType: (type: TreeType) => void;
  setTreeData: (data: TreeNode | null) => void;
  setTraversals: (traversals: TraversalResult) => void;
  setSearchResult: (result: { found: boolean; value: string } | null) => void;
  setWasmLoaded: (loaded: boolean) => void;
  setTreeImplemented: (implemented: boolean | null) => void;
  setLoading: (loading: boolean) => void;
  setStatusMessage: (msg: string) => void;
  clearSearchResult: () => void;
}

// Helper to get tree type from URL
const getInitialTreeType = (): TreeType => {
  const params = new URLSearchParams(window.location.search);
  const tree = params.get('tree') as TreeType;
  return TREE_TYPES.some(t => t.id === tree) ? tree : 'bst';
};

export const useTreeStore = create<TreeState>((set) => ({
  treeType: getInitialTreeType(),
  treeData: null,
  traversals: { preorder: [], inorder: [], postorder: [] },
  searchResult: null,
  isWasmLoaded: false,
  isTreeImplemented: null,
  isLoading: false,
  statusMessage: 'Select a tree type to begin',

  setTreeType: (type) => set({
    treeType: type,
    treeData: null,
    searchResult: null,
    traversals: { preorder: [], inorder: [], postorder: [] },
    isTreeImplemented: null
  }),
  setTreeData: (data) => set({ treeData: data }),
  setTraversals: (traversals) => set({ traversals }),
  setSearchResult: (result) => set({ searchResult: result }),
  setWasmLoaded: (loaded) => set({ isWasmLoaded: loaded }),
  setTreeImplemented: (implemented) => set({ isTreeImplemented: implemented }),
  setLoading: (loading) => set({ isLoading: loading }),
  setStatusMessage: (msg) => set({ statusMessage: msg }),
  clearSearchResult: () => set({ searchResult: null }),
}));
