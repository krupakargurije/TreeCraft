#include "node.h"
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>
#include <cstdio>

// ============================================================
// AVL Tree Implementation
// ============================================================

static Node* avl_root = nullptr;

// --- Helpers ---

static int get_height(Node* n) {
    return n ? n->height : 0;
}

static int get_balance(Node* n) {
    return n ? get_height(n->left) - get_height(n->right) : 0;
}

static void update_height(Node* n) {
    if (n) {
        n->height = 1 + std::max(get_height(n->left), get_height(n->right));
    }
}

static Node* rotate_right(Node* y) {
    printf("AVL: Rotating Right at %d\n", y->value);
    Node* x = y->left;
    Node* T2 = x->right;

    x->right = y;
    y->left = T2;

    update_height(y);
    update_height(x);

    return x;
}

static Node* rotate_left(Node* x) {
    printf("AVL: Rotating Left at %d\n", x->value);
    Node* y = x->right;
    Node* T2 = y->left;

    y->left = x;
    x->right = T2;

    update_height(x);
    update_height(y);

    return y;
}

static Node* avl_insert_recursive(Node* node, int value) {
    if (!node) return new Node(value);

    if (value < node->value)
        node->left = avl_insert_recursive(node->left, value);
    else if (value > node->value)
        node->right = avl_insert_recursive(node->right, value);
    else
        return node;

    update_height(node);

    int balance = get_balance(node);

    // Left heavy
    if (balance > 1) {
        if (get_balance(node->left) >= 0) {
            // LL Case
            return rotate_right(node);
        } else {
            // LR Case
            node->left = rotate_left(node->left);
            return rotate_right(node);
        }
    }

    // Right heavy
    if (balance < -1) {
        if (get_balance(node->right) <= 0) {
            // RR Case
            return rotate_left(node);
        } else {
            // RL Case
            node->right = rotate_right(node->right);
            return rotate_left(node);
        }
    }
    return node;
}

static Node* min_value_node(Node* node) {
    Node* current = node;
    while (current->left != nullptr)
        current = current->left;
    return current;
}

static Node* avl_delete_recursive(Node* root, int value) {
    if (!root) return root;

    if (value < root->value)
        root->left = avl_delete_recursive(root->left, value);
    else if (value > root->value)
        root->right = avl_delete_recursive(root->right, value);
    else {
        if ((!root->left) || (!root->right)) {
            Node* temp = root->left ? root->left : root->right;
            if (!temp) {
                temp = root;
                root = nullptr;
            } else
                *root = *temp;
            delete temp;
        } else {
            Node* temp = min_value_node(root->right);
            root->value = temp->value;
            root->right = avl_delete_recursive(root->right, temp->value);
        }
    }

    if (!root) return root;

    update_height(root);

    int balance = get_balance(root);

    // Left heavy
    if (balance > 1) {
        if (get_balance(root->left) >= 0) {
            return rotate_right(root);
        } else {
            root->left = rotate_left(root->left);
            return rotate_right(root);
        }
    }

    // Right heavy
    if (balance < -1) {
        if (get_balance(root->right) <= 0) {
            return rotate_left(root);
        } else {
            root->right = rotate_right(root->right);
            return rotate_left(root);
        }
    }

    return root;
}


static std::string avl_node_to_json(Node* node) {
    if (!node) return "null";
    std::ostringstream oss;
    oss << "{\"value\":" << node->value
        << ",\"height\":" << node->height
        << ",\"left\":" << avl_node_to_json(node->left)
        << ",\"right\":" << avl_node_to_json(node->right) << "}";
    return oss.str();
}

static void avl_inorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    avl_inorder(node->left, result);
    result.push_back(node->value);
    avl_inorder(node->right, result);
}

static void avl_preorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    result.push_back(node->value);
    avl_preorder(node->left, result);
    avl_preorder(node->right, result);
}

static void avl_postorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    avl_postorder(node->left, result);
    avl_postorder(node->right, result);
    result.push_back(node->value);
}

static void avl_delete_tree(Node* node) {
    if (!node) return;
    avl_delete_tree(node->left);
    avl_delete_tree(node->right);
    delete node;
}

// --- Public API ---

void avl_insert(int value) {
    avl_root = avl_insert_recursive(avl_root, value);
}

void avl_delete(int value) {
    avl_root = avl_delete_recursive(avl_root, value);
}

int avl_search(int value) {
    Node* curr = avl_root;
    while (curr) {
        if (value == curr->value) return 1;
        if (value < curr->value) curr = curr->left;
        else curr = curr->right;
    }
    return 0;
}

std::string avl_export_json() {
    return avl_node_to_json(avl_root);
}

std::string avl_get_traversal(int type) {
    std::vector<int> result;
    if (type == 0) avl_preorder(avl_root, result);
    else if (type == 1) avl_inorder(avl_root, result);
    else if (type == 2) avl_postorder(avl_root, result);

    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < result.size(); i++) {
        if (i > 0) oss << ",";
        oss << result[i];
    }
    oss << "]";
    return oss.str();
}

void avl_reset() {
    avl_delete_tree(avl_root);
    avl_root = nullptr;
}

