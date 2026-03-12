#include "node.h"
#include <string>
#include <sstream>

// ============================================================
// Binary Search Tree Implementation
// ============================================================

static Node* bst_root = nullptr;

// --- Helpers ---

static std::string bst_node_to_json(Node* node) {
    if (!node) return "null";
    std::ostringstream oss;
    oss << "{\"value\":" << node->value
        << ",\"left\":" << bst_node_to_json(node->left)
        << ",\"right\":" << bst_node_to_json(node->right) << "}";
    return oss.str();
}

static void bst_inorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    bst_inorder(node->left, result);
    result.push_back(node->value);
    bst_inorder(node->right, result);
}

static void bst_preorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    result.push_back(node->value);
    bst_preorder(node->left, result);
    bst_preorder(node->right, result);
}

static void bst_postorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    bst_postorder(node->left, result);
    bst_postorder(node->right, result);
    result.push_back(node->value);
}

static void bst_delete_tree(Node* node) {
    if (!node) return;
    bst_delete_tree(node->left);
    bst_delete_tree(node->right);
    delete node;
}

// --- Public API ---

void bst_insert(int value) {
    Node* newNode = new Node(value);
    if (!bst_root) {
        bst_root = newNode;
        return;
    }
    Node* curr = bst_root;
    while (true) {
        if (value < curr->value) {
            if (!curr->left) { curr->left = newNode; return; }
            curr = curr->left;
        } else if (value > curr->value) {
            if (!curr->right) { curr->right = newNode; return; }
            curr = curr->right;
        } else {
            // Duplicate value — ignore
            delete newNode;
            return;
        }
    }
}

// Helper: find the minimum node in a subtree
static Node* bst_find_min(Node* node) {
    while (node && node->left) node = node->left;
    return node;
}

// Helper: recursive delete
static Node* bst_delete_node(Node* root, int value) {
    if (!root) return nullptr;

    if (value < root->value) {
        root->left = bst_delete_node(root->left, value);
    } else if (value > root->value) {
        root->right = bst_delete_node(root->right, value);
    } else {
        // Found the node to delete
        // Case 1 & 2: No child or one child
        if (!root->left) {
            Node* temp = root->right;
            delete root;
            return temp;
        }
        if (!root->right) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        // Case 3: Two children — replace with inorder successor
        Node* successor = bst_find_min(root->right);
        root->value = successor->value;
        root->right = bst_delete_node(root->right, successor->value);
    }
    return root;
}

void bst_delete(int value) {
    bst_root = bst_delete_node(bst_root, value);
}

int bst_search(int value) {
    Node* curr = bst_root;
    while (curr) {
        if (value == curr->value) return 1;
        curr = (value < curr->value) ? curr->left : curr->right;
    }
    return 0;
}

std::string bst_export_json() {
    return bst_node_to_json(bst_root);
}

std::string bst_get_traversal(int type) {
    std::vector<int> result;
    if (type == 0) bst_preorder(bst_root, result);
    else if (type == 1) bst_inorder(bst_root, result);
    else if (type == 2) bst_postorder(bst_root, result);

    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < result.size(); i++) {
        if (i > 0) oss << ",";
        oss << result[i];
    }
    oss << "]";
    return oss.str();
}

void bst_reset() {
    bst_delete_tree(bst_root);
    bst_root = nullptr;
}
