// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  inputNodes: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    // check if it's an input node → track separately
    if (node.type === "customInput") {
      set({
        inputNodes: [
          ...get().inputNodes,
          node.id.replace("customInput-", "input_"),
        ],
      });
    }
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  addEdgeBetween: (sourceId, targetId) => {
    const edges = get().edges;
    console.log("Add Edge Source and target: ", sourceId, targetId);
    // Prevent duplicate edges
    if (!edges.find((e) => e.source === sourceId && e.target === targetId)) {
      set({
        edges: addEdge(
          {
            id: `e-${sourceId}-${targetId}`,
            source: sourceId,
            sourceHandle: `${sourceId}-${targetId}`,
            target: targetId,
            targetHandle: `${sourceId}-${targetId}`,
            type: "smoothstep",
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
          },
          edges
        ),
      });
    }
  },
  removeEdgeBetween: (sourceId, targetId) => {
    console.log("Remove Edge Source and target: ", sourceId, targetId);
    const edges = get().edges;
    set({
      edges: edges.filter(
        (e) => !(e.source === sourceId && e.target === targetId)
      ),
    });
  },
}));
