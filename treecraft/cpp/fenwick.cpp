/*
#include "node.h"
#include <string>
#include <sstream>
#include <vector>

// ============================================================
// Fenwick Tree (Binary Indexed Tree) Implementation
// ============================================================

static std::vector<int> fenwick_tree;
static std::vector<int> fenwick_original; // original values for display
static int fenwick_size = 0;

// --- Helpers ---

static std::string fenwick_node_to_json(int idx, int level, int maxLevel) {
    if (idx > fenwick_size || idx <= 0) return "null";
    std::ostringstream oss;
    oss << "{\"value\":" << fenwick_tree[idx]
        << ",\"index\":" << idx;
    oss << ",\"left\":null,\"right\":null}";
    return oss.str();
}

// --- Public API ---

void fenwick_insert(int value) {
    // TODO: Implement Fenwick Tree point update
}

void fenwick_delete(int value) {
    // TODO: Implement Fenwick Tree element removal
}

int fenwick_search(int value) {
    return 0;
}

std::string fenwick_export_json() {
    if (fenwick_size == 0) return "null";

    std::ostringstream oss;
    oss << "{\"type\":\"fenwick\",\"size\":" << fenwick_size
        << ",\"tree\":[";
    for (int i = 1; i <= fenwick_size; i++) {
        if (i > 1) oss << ",";
        oss << "{\"index\":" << i << ",\"value\":" << fenwick_tree[i] << "}";
    }
    oss << "],\"original\":[";
    for (size_t i = 0; i < fenwick_original.size(); i++) {
        if (i > 0) oss << ",";
        oss << fenwick_original[i];
    }
    oss << "]}";
    return oss.str();
}

std::string fenwick_get_traversal(int type) {
    std::ostringstream oss;
    oss << "[";
    for (int i = 1; i <= fenwick_size; i++) {
        if (i > 1) oss << ",";
        oss << fenwick_tree[i];
    }
    oss << "]";
    return oss.str();
}

void fenwick_reset() {
    fenwick_tree.clear();
    fenwick_original.clear();
    fenwick_size = 0;
}
*/
