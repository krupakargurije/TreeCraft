# TreeCraft 🌳

**Interactive tree data structure visualizer** powered by C++ → WebAssembly → React.

Visualize 8 tree types with real-time insert, delete, search, traversals, and animated rendering via D3.js.

---

## Supported Trees

| Tree | Description |
|------|-------------|
| Binary Tree | Basic binary tree |
| Binary Search Tree | Ordered binary tree |
| AVL Tree | Self-balancing BST with rotations |
| Red-Black Tree | Color-balanced BST |
| Trie | Prefix tree for strings |
| Segment Tree | Range query tree |
| Heap | Min-heap priority queue |
| Fenwick Tree | Binary indexed tree |

---

## Tech Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS + D3.js + Zustand
- **Algorithms**: C++ compiled to WebAssembly via Emscripten
- **Communication**: `ccall` / `cwrap` (JS ↔ WASM)
- **Deployment**: Static site (GitHub Pages compatible)

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) (for building WASM)

### 1. Install Frontend Dependencies

```bash
cd treecraft/frontend
npm install
```

### 2. Run Dev Server (no WASM — demo mode)

```bash
npm run dev
```

The app runs in **demo mode** without WASM. You can load a sample tree to test the visualization.

### 3. Build WebAssembly (after implementing algorithms)

```bash
cd treecraft/wasm
chmod +x build.sh
./build.sh
```

Or using Docker:

```bash
docker run --rm -v $(pwd)/..:/src emscripten/emsdk:latest /src/wasm/build.sh
```

This outputs `tree.js` + `tree.wasm` to `frontend/public/`.

### 4. Build for Production

```bash
cd treecraft/frontend
npm run build
```

Output in `dist/` — deploy to any static host.

---

## Implementing Algorithms

All tree algorithms are in `cpp/`. Each file has `// TODO:` comments where the logic should go.

| File | What to implement |
|------|------------------|
| `bst.cpp` | BST insert, delete, search |
| `avl.cpp` | AVL insert/delete with rotations |
| `red_black.cpp` | RB insert/delete with recoloring |
| `trie.cpp` | Trie insert, delete, search |
| `segment_tree.cpp` | Point update, range query |
| `heap.cpp` | Heapify-up, heapify-down |
| `fenwick.cpp` | Point update, prefix sum |

After implementing, rebuild WASM and refresh the browser.

---

## Project Structure

```
treecraft/
├── cpp/                          # C++ tree implementations
│   ├── node.h                    # Shared node structures
│   ├── tree_interface.cpp        # WASM API dispatcher
│   ├── bst.cpp                   # Binary Search Tree
│   ├── avl.cpp                   # AVL Tree
│   ├── red_black.cpp             # Red-Black Tree
│   ├── trie.cpp                  # Trie
│   ├── segment_tree.cpp          # Segment Tree
│   ├── heap.cpp                  # Heap
│   └── fenwick.cpp               # Fenwick Tree
│
├── wasm/
│   └── build.sh                  # Emscripten build script
│
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── wasm/wasmAPI.ts       # WASM TypeScript wrapper
│   │   ├── visualization/        # D3.js tree renderer
│   │   ├── store.ts              # Zustand state
│   │   ├── App.tsx               # Main layout
│   │   └── main.tsx              # Entry point
│   ├── public/                   # WASM output goes here
│   ├── index.html
│   └── vite.config.ts
│
└── README.md
```

---

## Deploy to GitHub Pages

```bash
cd treecraft/frontend
npm run build
# Push contents of dist/ to gh-pages branch
```

---

## Future Improvements

- [ ] Step-by-step animation controls
- [ ] AVL rotation visualization
- [ ] Red-Black color transition animation
- [ ] Time/space complexity display
- [ ] Traversal animation playback
- [ ] Zoom and pan on the canvas
- [ ] Export tree as image
