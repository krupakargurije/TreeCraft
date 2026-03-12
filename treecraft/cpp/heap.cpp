// #include "node.h"
// #include <string>
// #include <sstream>
// #include <vector>

// // ============================================================
// // Heap (Min-Heap) Implementation
// // ============================================================

// static std::vector<int> heap_data;

// // --- Helpers ---

// // Convert array-based heap into a JSON tree for visualization
// static std::string heap_node_to_json(int idx) {
//     if (idx >= (int)heap_data.size()) return "null";
//     std::ostringstream oss;
//     oss << "{\"value\":" << heap_data[idx]
//         << ",\"left\":" << heap_node_to_json(2 * idx + 1)
//         << ",\"right\":" << heap_node_to_json(2 * idx + 2) << "}";
//     return oss.str();
// }

// // --- Public API ---

// void heap_insert(int value) {
//     // TODO: Implement Heap insertion (Min-Heap)
//     // Steps:
//     // 1. Add value to end of array
//     // 2. Heapify-up: bubble the value up to maintain heap property
// }

// void heap_delete(int value) {
//     // TODO: Implement Heap deletion
//     // Steps:
//     // 1. Find the value in the array
//     // 2. Replace it with the last element
//     // 3. Heapify-down: sink the replacement to maintain heap property
// }

// int heap_search(int value) {
//     // TODO: Implement Heap search
//     // Linear search through the array
//     // Return 1 if found, 0 if not
//     return 0;
// }

// std::string heap_export_json() {
//     if (heap_data.empty()) return "null";
//     return heap_node_to_json(0);
// }

// std::string heap_get_traversal(int type) {
//     // Return level-order (array order) since heap is array-based
//     std::ostringstream oss;
//     oss << "[";
//     for (size_t i = 0; i < heap_data.size(); i++) {
//         if (i > 0) oss << ",";
//         oss << heap_data[i];
//     }
//     oss << "]";
//     return oss.str();
// }

// void heap_reset() {
//     heap_data.clear();
// }
