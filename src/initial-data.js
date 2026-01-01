import zIndex from "@mui/material/styles/zIndex";

export const initialNodes = [
  {
    id: 'g1',
    type: 'group',
    data: {},
    position: { x: 0, y: 80 },
    style: {
      width: 420,
      height: 160,
    },
    zIndex: -1,
  },
  {
    id: 'n1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 110, y: -20 },
    style: { backgroundColor: '#6ede87', color: 'white' },
  },
  {
    id: 'n2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 10, y: 100 },
    style: { backgroundColor: '#ff0072', color: 'white' },
    parentId: 'g1',
  },
  {
    id: 'n3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 110, y: 320 },
    style: { backgroundColor: '#6865A5', color: 'white' },
  },
  {
    id: 'n4',
    type: 'textUpdater',
    position: { x: 225, y: 20 },
    data: { value: 456 },
    parentId: 'g1',
    extent: 'parent'
  },
  {
    id: 'n5',
    type: 'colorChooser',
    data: { color: '#4FD1C5' },
    position: { x: 250, y: 25 },
  }
];
export const initialEdges = [
  { id: 'e1-2', source: 'n1', target: 'n2', type: 'custom-edge'},
  { id: 'e1-4', source: 'n1', target: 'n4', type: 'custom-edge'},
  { id: 'e2-3', source: 'n2', target: 'n3', animated: true },
  { id: 'e4-2', source: 'n4', target: 'n2', sourceHandle: 'a' },
  { id: 'e4-3', source: 'n4', target: 'n3', sourceHandle: 'b' },
  { id: 'e4-5', source: 'n4', target: 'n5', sourceHandle: 'b' },
];