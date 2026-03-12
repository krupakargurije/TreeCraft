// #include "node.h"
// #include <string>
// #include <sstream>

// // ============================================================
// // Trie Implementation
// // ============================================================

// static TrieNode* trie_root = nullptr;

// // --- Helpers ---

// static std::string trie_node_to_json(TrieNode* node, char label) {
//     if (!node) return "null";
//     std::ostringstream oss;
//     oss << "{\"label\":\"" << label << "\""
//         << ",\"isEnd\":" << (node->isEndOfWord ? "true" : "false")
//         << ",\"children\":[";
//     bool first = true;
//     for (int i = 0; i < 26; i++) {
//         if (node->children[i]) {
//             if (!first) oss << ",";
//             oss << trie_node_to_json(node->children[i], 'a' + i);
//             first = false;
//         }
//     }
//     oss << "]}";
//     return oss.str();
// }

// static void trie_delete_all(TrieNode* node) {
//     if (!node) return;
//     for (int i = 0; i < 26; i++) {
//         trie_delete_all(node->children[i]);
//     }
//     delete node;
// }

// // --- Public API ---
// // Note: Trie uses string values. The int value is treated as an index
// // into a word buffer, or callers pass character-by-character.
// // For simplicity, we use insert_word / delete_word / search_word
// // which accept C-strings via the tree_interface dispatcher.

// void trie_insert(const char* word) {
//     // TODO: Implement Trie insertion
//     // Steps:
//     // 1. Start from root
//     // 2. For each character, create child node if not exists
//     // 3. Mark the last node as end of word
// }

// void trie_delete(const char* word) {
//     // TODO: Implement Trie deletion
//     // Steps:
//     // 1. Recursively search for the word
//     // 2. Unmark endOfWord
//     // 3. Delete nodes that are no longer needed (no children, not end of another word)
// }

// int trie_search(const char* word) {
//     // TODO: Implement Trie search
//     // Return 1 if the word exists, 0 otherwise
//     return 0;
// }

// std::string trie_export_json() {
//     if (!trie_root) return "null";
//     return trie_node_to_json(trie_root, '*');
// }

// std::string trie_get_traversal(int type) {
//     // TODO: Implement Trie traversal (DFS to list all words)
//     return "[]";
// }

// void trie_reset() {
//     trie_delete_all(trie_root);
//     trie_root = nullptr;
// }

// void trie_init() {
//     trie_reset();
//     trie_root = new TrieNode();
// }
