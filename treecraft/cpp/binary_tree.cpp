#include "node.h"
#include <string>
#include <sstream>
#include <vector>
#include <queue>

// ============================================================
// Binary Tree Implementation (Level-Order Insertion)
// ============================================================

static Node* bt_root = nullptr;

// --- Helpers ---

static std::string bt_node_to_json(Node* node) {
    if (!node) return "null";
    std::ostringstream oss;
    oss << "{\"value\":" << node->value
        << ",\"left\":" << bt_node_to_json(node->left)
        << ",\"right\":" << bt_node_to_json(node->right) << "}";
    return oss.str();
}

static void bt_inorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    bt_inorder(node->left, result);
    result.push_back(node->value);
    bt_inorder(node->right, result);
}

static void bt_preorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    result.push_back(node->value);
    bt_preorder(node->left, result);
    bt_preorder(node->right, result);
}

static void bt_postorder(Node* node, std::vector<int>& result) {
    if (!node) return;
    bt_postorder(node->left, result);
    bt_postorder(node->right, result);
    result.push_back(node->value);
}

static void bt_delete_tree(Node* node) {
    if (!node) return;
    bt_delete_tree(node->left);
    bt_delete_tree(node->right);
    delete node;
}

// --- Public API ---

void bt_insert(int value) {
    Node* newNode = new Node(value);
    if (!bt_root) {
        bt_root = newNode;
        return;
    }

    // Level-order insertion for a complete tree
    std::queue<Node*> q;
    q.push(bt_root);

    while (!q.empty()) {
        Node* curr = q.front();
        q.pop();

        if (!curr->left) {
            curr->left = newNode;
            return;
        } else {
            q.push(curr->left);
        }

        if (!curr->right) {
            curr->right = newNode;
            return;
        } else {
            q.push(curr->right);
        }
    }
}

void bt_delete(int value) {
    // Basic level-order delete (not strictly required for demo but good to have)
    // For simplicity, we just reset if user wants to delete for now, 
    // or we could implement the "deepest node swap" strategy.
    // Given the visual focus, we'll keep it simple: find and remove if leaf, 
    // else swap with deepest and remove deepest.
    
    if (!bt_root) return;
    if (!bt_root->left && !bt_root->right) {
        if (bt_root->value == value) {
            delete bt_root;
            bt_root = nullptr;
        }
        return;
    }

    std::queue<Node*> q;
    q.push(bt_root);
    Node* targetNode = nullptr;
    Node* curr = nullptr;
    
    // Find the node and traverse to end
    while(!q.empty()) {
        curr = q.front();
        q.pop();
        if(curr->value == value) targetNode = curr;
        if(curr->left) q.push(curr->left);
        if(curr->right) q.push(curr->right);
    }

    if(targetNode) {
        int x = curr->value;
        // Search for deepest's parent and remove it
        std::queue<Node*> qp;
        qp.push(bt_root);
        while(!qp.empty()) {
            Node* temp = qp.front();
            qp.pop();
            if(temp->left == curr) { temp->left = nullptr; break; }
            if(temp->right == curr) { temp->right = nullptr; break; }
            if(temp->left) qp.push(temp->left);
            if(temp->right) qp.push(temp->right);
        }
        targetNode->value = x;
        delete curr;
    }
}

int bt_search(int value) {
    if (!bt_root) return 0;
    std::queue<Node*> q;
    q.push(bt_root);
    while(!q.empty()) {
        Node* curr = q.front();
        q.pop();
        if(curr->value == value) return 1;
        if(curr->left) q.push(curr->left);
        if(curr->right) q.push(curr->right);
    }
    return 0;
}

std::string bt_export_json() {
    return bt_node_to_json(bt_root);
}

std::string bt_get_traversal(int type) {
    std::vector<int> result;
    if (type == 0) bt_preorder(bt_root, result);
    else if (type == 1) bt_inorder(bt_root, result);
    else if (type == 2) bt_postorder(bt_root, result);

    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < result.size(); i++) {
        if (i > 0) oss << ",";
        oss << result[i];
    }
    oss << "]";
    return oss.str();
}

void bt_reset() {
    bt_delete_tree(bt_root);
    bt_root = nullptr;
}
