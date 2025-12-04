import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from '@xyflow/react';
import TextUpdaterNode from './react-flow/custom-nodes/TextUpdaterNode';
import { CustomEdge } from './react-flow/custom-edges/CustomEdges';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { initialEdges, initialNodes } from './initial-data';
import './app.css';

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const edgeTypes = {
  'custom-edge': CustomEdge,
};


const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [variant, setVariant] = useState('cross');

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => {
      const edge = { ...params, type: 'custom-edge' };
      setEdges((edgesSnapshot) => addEdge(edge, edgesSnapshot))
    },
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background variant={variant} gap={12} size={1} />
        <Panel position="top-center">
            <div>variant:</div>
            <button onClick={() => setVariant('dots')}>dots</button>
            <button onClick={() => setVariant('lines')}>lines</button>
            <button onClick={() => setVariant('cross')}>cross</button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
