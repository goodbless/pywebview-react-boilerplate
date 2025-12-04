import { useCallback } from 'react';
import { Position, Handle } from '@xyflow/react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export function CustomHandle(props) {
  return (
    <Handle
      position={Position.Right}
      type="source"
      { ...props }
      style={{
        background: 'none',
        border: 'none',
        width: '1em',
        height: '1em',
        ...props.style
      }}
    >
      <ArrowCircleRightIcon
        style={{
          pointerEvents: 'none',
          fontSize: '1em',
          left: 0,
          position: 'absolute',
        }}
      />
    </Handle>
  );
}

export default function TextUpdaterNode(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" value={props.data.value} onChange={onChange} className="nodrag" />
        <CustomHandle type="target" position={Position.Top} />
        <CustomHandle type="source" position={Position.Bottom} id="a" style={{ left: 10 }} />
        <CustomHandle type="source" position={Position.Bottom} id="b" style={{ left: 170 }} />
      </div>
    </div>
  );
}
