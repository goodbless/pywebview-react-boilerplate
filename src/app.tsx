import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import './app.css';

import useStore from './store';
import ColorChooserNode from './react-flow/custom-nodes/ColorChooserNode';
import { AppState } from './types';

import TextUpdaterNode from './react-flow/custom-nodes/TextUpdaterNode';
import { CustomEdge } from './react-flow/custom-edges/CustomEdges';


const nodeTypes = {
  textUpdater: TextUpdaterNode,
  colorChooser: ColorChooserNode
};

const edgeTypes = {
  'custom-edge': CustomEdge,
};
const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        />
    </div>
  );
}

export default Flow;
