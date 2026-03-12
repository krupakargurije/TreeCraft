#!/bin/bash

# ============================================================
# TreeCraft — WebAssembly Build Script
# Compiles C++ tree implementations to WASM using Emscripten
# ============================================================
#
# Prerequisites:
#   - Emscripten SDK installed and activated (source emsdk_env.sh)
#   - OR use Docker: docker run --rm -v $(pwd)/..:/src emscripten/emsdk:latest /src/wasm/build.sh
#
# Usage:
#   cd treecraft/wasm
#   ./build.sh
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CPP_DIR="$PROJECT_DIR/cpp"
OUTPUT_DIR="$PROJECT_DIR/frontend/public"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

echo "==> Compiling TreeCraft C++ to WebAssembly..."

emcc -O2 \
    "$CPP_DIR/tree_interface.cpp" \
    "$CPP_DIR/bst.cpp" \
    # "$CPP_DIR/avl.cpp" \
    # "$CPP_DIR/red_black.cpp" \
    # "$CPP_DIR/trie.cpp" \
    # "$CPP_DIR/segment_tree.cpp" \
    # "$CPP_DIR/heap.cpp" \
    # "$CPP_DIR/fenwick.cpp" \
    -o "$OUTPUT_DIR/tree.js" \
    -s WASM=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="TreeModule" \
    -s "EXPORTED_FUNCTIONS=[ \
        '_init_tree', \
        '_insert_value', \
        '_delete_value', \
        '_search_value', \
        '_export_tree_json', \
        '_reset_tree', \
        '_get_traversal', \
        '_insert_word', \
        '_delete_word', \
        '_search_word', \
        '_get_current_tree_type', \
        '_is_tree_implemented' \
    ]" \
    -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap','UTF8ToString','stringToUTF8','lengthBytesUTF8']" \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s TOTAL_MEMORY=16777216

echo "==> Build complete!"
echo "    Output: $OUTPUT_DIR/tree.js"
echo "           $OUTPUT_DIR/tree.wasm"
