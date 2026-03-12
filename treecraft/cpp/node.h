#ifndef NODE_H
#define NODE_H

#include <string>
#include <vector>

// ============================================================
// Shared Node Structures for Tree Data Structures
// ============================================================

// Binary Tree / BST / AVL / Red-Black node
struct Node {
    int value;
    Node* left;
    Node* right;
    int height;    // Used by AVL
    int color;     // Used by Red-Black (0 = black, 1 = red)
    Node* parent;  // Used by Red-Black

    Node(int val)
        : value(val), left(nullptr), right(nullptr),
          height(1), color(1), parent(nullptr) {}
};

// Trie node
struct TrieNode {
    TrieNode* children[26];
    bool isEndOfWord;

    TrieNode() : isEndOfWord(false) {
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
    }
};

// Tree type enumeration
enum TreeType {
    BINARY_TREE = 0,
    BST = 1,
    AVL = 2,
    RED_BLACK = 3,
    TRIE = 4,
    SEGMENT_TREE = 5,
    HEAP = 6,
    FENWICK_TREE = 7
};

#endif // NODE_H
