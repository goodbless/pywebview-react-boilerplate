import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type BuiltInNode,
} from '@xyflow/react';

export type ColorNode = Node<
  {
    color: string;
  },
  'colorChooser'
>;

export type TextUpdateNode = Node<
  {
    value: number;
  },
  'textUpdater'
>;

export type AppNode = ColorNode | TextUpdateNode | BuiltInNode;

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
};
