#include "node.h"
#include <string>
#include <cstring>

// ============================================================
// Tree Interface — WebAssembly-facing API
// Dispatches calls to the correct tree implementation
// ============================================================

// --- Forward declarations from individual tree files ---

// Binary Tree
extern void bt_insert(int value);
extern void bt_delete(int value);
extern int bt_search(int value);
extern std::string bt_export_json();
extern std::string bt_get_traversal(int type);
extern void bt_reset();

// BST
extern void bst_insert(int value);
extern void bst_delete(int value);
extern int bst_search(int value);
extern std::string bst_export_json();
extern std::string bst_get_traversal(int type);
extern void bst_reset();

// AVL
extern void avl_insert(int value);
extern void avl_delete(int value);
extern int avl_search(int value);
extern std::string avl_export_json();
extern std::string avl_get_traversal(int type);
extern void avl_reset();

/*
// Red-Black
...
*/

// --- State ---

static TreeType current_tree = BST;
static char json_buffer[65536];       // Buffer for JSON export
static char traversal_buffer[65536];  // Buffer for traversal export
static char word_buffer[256];         // Buffer for Trie word input

// ============================================================
// extern "C" — Functions exported to WebAssembly
// ============================================================

extern "C" {

void init_tree(int treeType) {
    current_tree = static_cast<TreeType>(treeType);

    // Reset current tree state
    switch (current_tree) {
        case BINARY_TREE:   bt_reset(); break;
        case BST:           bst_reset(); break;
        case AVL:           avl_reset(); break;
        /*
        case RED_BLACK:     rb_reset(); break;
        ...
        */
        default: break;
    }
}

void insert_value(int value) {
    switch (current_tree) {
        case BINARY_TREE:   bt_insert(value); break;
        case BST:           bst_insert(value); break;
        case AVL:           avl_insert(value); break;
        default: break;
    }
}

void delete_value(int value) {
    switch (current_tree) {
        case BINARY_TREE:   bt_delete(value); break;
        case BST:           bst_delete(value); break;
        case AVL:           avl_delete(value); break;
        default: break;
    }
}

int search_value(int value) {
    switch (current_tree) {
        case BINARY_TREE:   return bt_search(value);
        case BST:           return bst_search(value);
        case AVL:           return avl_search(value);
        default: return 0;
    }
}

// --- Trie-specific string operations ---

void insert_word(const char* word) {
    if (current_tree == TRIE) {
        // trie_insert(word);
    }
}

void delete_word(const char* word) {
    if (current_tree == TRIE) {
        // trie_delete(word);
    }
}

int search_word(const char* word) {
    if (current_tree == TRIE) {
        // return trie_search(word);
    }
    return 0;
}

// --- Export tree as JSON ---

const char* export_tree_json() {
    std::string json;
    switch (current_tree) {
        case BINARY_TREE:   json = bt_export_json(); break;
        case BST:           json = bst_export_json(); break;
        case AVL:           json = avl_export_json(); break;
        default:            json = "null"; break;
    }
    strncpy(json_buffer, json.c_str(), sizeof(json_buffer) - 1);
    json_buffer[sizeof(json_buffer) - 1] = '\0';
    return json_buffer;
}

// --- Traversal ---
// type: 0 = preorder, 1 = inorder, 2 = postorder

const char* get_traversal(int type) {
    std::string result;
    switch (current_tree) {
        case BINARY_TREE:   result = bt_get_traversal(type); break;
        case BST:           result = bst_get_traversal(type); break;
        case AVL:           result = avl_get_traversal(type); break;
        default:            result = "[]"; break;
    }
    strncpy(traversal_buffer, result.c_str(), sizeof(traversal_buffer) - 1);
    traversal_buffer[sizeof(traversal_buffer) - 1] = '\0';
    return traversal_buffer;
}

// --- Reset ---

void reset_tree() {
    switch (current_tree) {
        case BINARY_TREE:   bt_reset(); break;
        case BST:           bst_reset(); break;
        case AVL:           avl_reset(); break;
        default: break;
    }
}

// --- Get current tree type ---

int get_current_tree_type() {
    return static_cast<int>(current_tree);
}

int is_tree_implemented(int treeType) {
    TreeType type = static_cast<TreeType>(treeType);
    switch (type) {
        case BINARY_TREE:
        case BST:
        case AVL: return 1;
        default:  return 0;
    }
}

} // extern "C"
