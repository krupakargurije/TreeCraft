// #include "node.h"
// #include <string>
// #include <sstream>

// // ============================================================
// // Red-Black Tree Implementation
// // ============================================================

// static Node* rb_root = nullptr;

// // --- Helpers ---

// static std::string rb_node_to_json(Node* node) {
//     if (!node) return "null";
//     std::ostringstream oss;
//     oss << "{\"value\":" << node->value
//         << ",\"color\":" << node->color
//         << ",\"left\":" << rb_node_to_json(node->left)
//         << ",\"right\":" << rb_node_to_json(node->right) << "}";
//     return oss.str();
// }

// static void rb_inorder(Node* node, std::vector<int>& result) {
//     if (!node) return;
//     rb_inorder(node->left, result);
//     result.push_back(node->value);
//     rb_inorder(node->right, result);
// }

// static void rb_preorder(Node* node, std::vector<int>& result) {
//     if (!node) return;
//     result.push_back(node->value);
//     rb_preorder(node->left, result);
//     rb_preorder(node->right, result);
// }

// static void rb_postorder(Node* node, std::vector<int>& result) {
//     if (!node) return;
//     rb_postorder(node->left, result);
//     rb_postorder(node->right, result);
//     result.push_back(node->value);
// }

// static void rb_delete_tree(Node* node) {
//     if (!node) return;
//     rb_delete_tree(node->left);
//     rb_delete_tree(node->right);
//     delete node;
// }

// // --- Public API ---

// void rb_insert(int value) {
//     // TODO: Implement Red-Black Tree insertion
//     // Steps:
//     // 1. Perform standard BST insert (new node is RED)
//     // 2. Fix Red-Black violations:
//     //    - Case 1: Uncle is RED → Recolor
//     //    - Case 2: Uncle is BLACK (triangle) → Rotate to make it a line
//     //    - Case 3: Uncle is BLACK (line) → Rotate + Recolor
//     // 3. Ensure root is always BLACK
// }

// void rb_delete(int value) {
//     // TODO: Implement Red-Black Tree deletion
//     // Steps:
//     // 1. Perform standard BST delete
//     // 2. Fix double-black violations
//     // 3. Handle cases based on sibling color and children
// }

// int rb_search(int value) {
//     // TODO: Implement Red-Black search (same as BST search)
//     // Return 1 if found, 0 if not found
//     return 0;
// }

// std::string rb_export_json() {
//     return rb_node_to_json(rb_root);
// }

// std::string rb_get_traversal(int type) {
//     std::vector<int> result;
//     if (type == 0) rb_preorder(rb_root, result);
//     else if (type == 1) rb_inorder(rb_root, result);
//     else if (type == 2) rb_postorder(rb_root, result);

//     std::ostringstream oss;
//     oss << "[";
//     for (size_t i = 0; i < result.size(); i++) {
//         if (i > 0) oss << ",";
//         oss << result[i];
//     }
//     oss << "]";
//     return oss.str();
// }

// void rb_reset() {
//     rb_delete_tree(rb_root);
//     rb_root = nullptr;
// }
