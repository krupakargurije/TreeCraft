This directory holds the compiled WebAssembly output.

After running `wasm/build.sh`, the following files will appear here:
- `tree.js` — Emscripten JS glue code
- `tree.wasm` — Compiled WebAssembly binary

These are loaded by the frontend as static assets.
