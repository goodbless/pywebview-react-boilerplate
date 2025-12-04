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
import './app.css';

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const edgeTypes = {
  'custom-edge': CustomEdge,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: -75 },
    style: { backgroundColor: '#6ede87', color: 'white' },
  },
 
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#ff0072', color: 'white' },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
    style: { backgroundColor: '#6865A5', color: 'white' },
  },
  {
    id: '4',
    type: 'textUpdater',
    position: { x: 250, y: 25 },
    data: { value: 456 },
  },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '4', type: 'custom-edge'},
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e4-2', source: '4', target: '2', sourceHandle: 'a' },
  { id: 'e4-3', source: '4', target: '3', sourceHandle: 'b' }
];

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
