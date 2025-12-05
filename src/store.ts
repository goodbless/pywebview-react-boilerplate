import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, type Edge } from '@xyflow/react';
import { type AppNode, type AppState, type ColorNode } from './types';

function isColorChooserNode(node: AppNode): node is ColorNode {
  return node.type === 'colorChooser';
}

const initialNodes = [
  {
    id: '1',
    type: 'colorChooser',
    data: { color: '#4FD1C5' },
    position: { x: 250, y: 25 },
  },
 
  {
    id: '2',
    type: 'colorChooser',
    data: { color: '#F6E05E' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'colorChooser',
    data: { color: '#B794F4' },
    position: { x: 250, y: 250 },
  },
] as AppNode[];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
] as Edge[];

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
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
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  updateNodeColor: (nodeId, color) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId && isColorChooserNode(node)) {
          // it's important to create a new object here, to inform React Flow about the changes
          return { ...node, data: { ...node.data, color } };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
