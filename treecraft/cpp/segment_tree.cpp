// #include "node.h"
// #include <string>
// #include <sstream>
// #include <vector>

// // ============================================================
// // Segment Tree Implementation
// // ============================================================

// static std::vector<int> seg_tree;
// static int seg_size = 0;

// // --- Helpers ---

// static std::string seg_node_to_json(int idx, int start, int end) {
//     if (idx >= (int)seg_tree.size()) return "null";
//     std::ostringstream oss;
//     oss << "{\"value\":" << seg_tree[idx]
//         << ",\"range\":[" << start << "," << end << "]";
//     if (start < end) {
//         int mid = (start + end) / 2;
//         oss << ",\"left\":" << seg_node_to_json(2 * idx + 1, start, mid)
//             << ",\"right\":" << seg_node_to_json(2 * idx + 2, mid + 1, end);
//     } else {
//         oss << ",\"left\":null,\"right\":null";
//     }
//     oss << "}";
//     return oss.str();
// }

// // --- Public API ---

// void seg_insert(int value) {
//     // TODO: Implement Segment Tree point update
//     // Steps:
//     // 1. Add value to the underlying array
//     // 2. Rebuild or update the segment tree
//     // Note: "insert" here means appending a value and rebuilding
// }

// void seg_delete(int value) {
//     // TODO: Implement Segment Tree element removal
//     // Steps:
//     // 1. Find and remove value from underlying array
//     // 2. Rebuild the segment tree
// }

// int seg_search(int value) {
//     // TODO: Implement Segment Tree range query
//     // For simplicity, search if value exists in the tree
//     // Return 1 if found, 0 if not
//     return 0;
// }

// std::string seg_export_json() {
//     if (seg_size == 0) return "null";
//     return seg_node_to_json(0, 0, seg_size - 1);
// }

// std::string seg_get_traversal(int type) {
//     // Return the segment tree array as a flat list
//     std::ostringstream oss;
//     oss << "[";
//     for (size_t i = 0; i < seg_tree.size(); i++) {
//         if (i > 0) oss << ",";
//         oss << seg_tree[i];
//     }
//     oss << "]";
//     return oss.str();
// }

// void seg_reset() {
//     seg_tree.clear();
//     seg_size = 0;
// }
