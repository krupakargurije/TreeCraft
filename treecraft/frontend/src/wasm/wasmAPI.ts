// ============================================================
// TreeCraft — WebAssembly API Wrapper
// TypeScript interface to the WASM module
// Strictly uses C++ implementations via WebAssembly
// ============================================================

import { useTreeStore, TREE_TYPES, type TreeType, type TreeNode } from '../store';

interface WasmModule {
  ccall: (name: string, returnType: string, argTypes: string[], args: unknown[]) => unknown;
  cwrap: (name: string, returnType: string, argTypes: string[]) => (...args: unknown[]) => unknown;
  UTF8ToString: (ptr: number) => string;
}

let wasmModule: WasmModule | null = null;

// ============================================================
// Initialization
// ============================================================

export async function initializeWasm(): Promise<boolean> {
  try {
    const TreeModule = (window as unknown as Record<string, unknown>)['TreeModule'] as
      | ((...args: unknown[]) => Promise<WasmModule>)
      | undefined;

    if (!TreeModule) {
      console.warn('TreeModule not found. WASM not compiled yet.');
      useTreeStore.getState().setStatusMessage('⚠️ WebAssembly not loaded — Please run wasm/build.sh');
      return false;
    }

    wasmModule = await TreeModule();
    useTreeStore.getState().setWasmLoaded(true);
    useTreeStore.getState().setStatusMessage('✓ WebAssembly loaded successfully');

    // Initialize the backend tree state to match the frontend selection
    const currentType = useTreeStore.getState().treeType;
    const typeInfo = TREE_TYPES.find(t => t.id === currentType);
    if (typeInfo) {
      wasmModule.ccall('init_tree', 'void', ['number'], [typeInfo.wasmId]);
      console.log(`[WASM] Initialized backend to ${typeInfo.label} (ID: ${typeInfo.wasmId})`);
    }

    // Check initial tree implementation status
    checkImplementationStatus();

    return true;
  } catch (error) {
    console.error('Failed to initialize WASM:', error);
    useTreeStore.getState().setStatusMessage('⚠️ Failed to load WASM');
    return false;
  }
}

function checkImplementationStatus() {
  if (!wasmModule) return;
  const currentType = useTreeStore.getState().treeType;
  const typeInfo = TREE_TYPES.find(t => t.id === currentType);
  if (typeInfo) {
    const isImplemented = wasmModule.ccall('is_tree_implemented', 'number', ['number'], [typeInfo.wasmId]) as number;
    console.log(`[WASM] Verifying implementation status for ${typeInfo.label} (ID: ${typeInfo.wasmId})... Result: ${isImplemented === 1 ? 'IMPLEMENTED' : 'COMING SOON'}`);
    useTreeStore.getState().setTreeImplemented(isImplemented === 1);
  } else {
    useTreeStore.getState().setTreeImplemented(null);
  }
}

// ============================================================
// Tree Operations
// ============================================================

export function initTree(type: TreeType): void {
  const params = new URLSearchParams(window.location.search);
  params.set('tree', type);
  window.location.search = params.toString();
}

export function insertValue(value: number): void {
  if (wasmModule) {
    wasmModule.ccall('insert_value', 'void', ['number'], [value]);
    refreshTreeData();
    useTreeStore.getState().setStatusMessage(`Inserted ${value}`);
  }
}

export function insertWord(word: string): void {
  if (wasmModule) {
    wasmModule.ccall('insert_word', 'void', ['string'], [word]);
    refreshTreeData();
    useTreeStore.getState().setStatusMessage(`Inserted "${word}"`);
  }
}

export function deleteValue(value: number): void {
  if (wasmModule) {
    wasmModule.ccall('delete_value', 'void', ['number'], [value]);
    refreshTreeData();
    useTreeStore.getState().setStatusMessage(`Deleted ${value}`);
  }
}

export function deleteWord(word: string): void {
  if (wasmModule) {
    wasmModule.ccall('delete_word', 'void', ['string'], [word]);
    refreshTreeData();
    useTreeStore.getState().setStatusMessage(`Deleted "${word}"`);
  }
}

export function searchValue(value: number): boolean {
  let found = false;
  if (wasmModule) {
    const result = wasmModule.ccall('search_value', 'number', ['number'], [value]) as number;
    found = result === 1;
  }
  useTreeStore.getState().setSearchResult({ found, value: String(value) });
  useTreeStore.getState().setStatusMessage(found ? `✓ Found ${value}` : `✗ ${value} not found`);
  return found;
}

export function searchWord(word: string): boolean {
  let found = false;
  if (wasmModule) {
    const result = wasmModule.ccall('search_word', 'number', ['string'], [word]) as number;
    found = result === 1;
  }
  useTreeStore.getState().setSearchResult({ found, value: word });
  useTreeStore.getState().setStatusMessage(found ? `✓ Found "${word}"` : `✗ "${word}" not found`);
  return found;
}

export function resetTree(): void {
  if (wasmModule) {
    wasmModule.ccall('reset_tree', 'void', [], []);
  }
  useTreeStore.getState().setTreeData(null);
  useTreeStore.getState().setTraversals({ preorder: [], inorder: [], postorder: [] });
  useTreeStore.getState().clearSearchResult();
  useTreeStore.getState().setStatusMessage('Tree reset');
}

export function getTree(): TreeNode | null {
  if (!wasmModule) return null;

  const ptr = wasmModule.ccall('export_tree_json', 'number', [], []) as number;
  const jsonStr = wasmModule.UTF8ToString(ptr);

  if (!jsonStr || jsonStr === 'null') return null;

  try {
    return JSON.parse(jsonStr) as TreeNode;
  } catch {
    console.error('Failed to parse tree JSON:', jsonStr);
    return null;
  }
}

export function getTraversal(type: 'preorder' | 'inorder' | 'postorder'): number[] {
  if (!wasmModule) return [];

  const typeMap = { preorder: 0, inorder: 1, postorder: 2 };
  const ptr = wasmModule.ccall('get_traversal', 'number', ['number'], [typeMap[type]]) as number;
  const jsonStr = wasmModule.UTF8ToString(ptr);

  try {
    return JSON.parse(jsonStr) as number[];
  } catch {
    return [];
  }
}

// ============================================================
// Helpers
// ============================================================

function refreshTreeData(): void {
  const data = getTree();
  useTreeStore.getState().setTreeData(data);

  // Update traversals
  const preorder = getTraversal('preorder');
  const inorder = getTraversal('inorder');
  const postorder = getTraversal('postorder');
  useTreeStore.getState().setTraversals({ preorder, inorder, postorder });
}

// Generate demo tree: currently does nothing as fallbacks are removed
export function generateDemoTree(): void {
  useTreeStore.getState().setStatusMessage('Demo tree requires WASM implementation');
}
