import React from 'react';

interface ViewerControlsProps {
  onResetView: () => void;
  onToggleGrid: () => void;
  onToggleAxes: () => void;
  onToggleStats: () => void;
  onExportSTL?: () => void;
  showGrid: boolean;
  showAxes: boolean;
  showStats: boolean;
  renderMode?: 'solid' | 'wireframe';
}

const ViewerControls: React.FC<ViewerControlsProps> = ({
  onResetView,
  onToggleGrid,
  onToggleAxes,
  onToggleStats,
  onExportSTL,
  showGrid,
  showAxes,
  showStats,
  renderMode = 'solid',
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(28, 28, 28, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: 'white',
        width: '200px',
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', color: '#4a90e2', borderBottom: '1px solid #333', paddingBottom: '8px' }}>
        Viewer Controls
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onResetView}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Reset View
        </button>
        
        {onExportSTL && (
          <button
            onClick={onExportSTL}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Export to STL
          </button>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={onToggleGrid}
            />
            Show Grid
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showAxes}
              onChange={onToggleAxes}
            />
            Show Axes
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showStats}
              onChange={onToggleStats}
            />
            Show Stats
          </label>
        </div>

        <div style={{ marginTop: '10px', borderTop: '1px solid #333', paddingTop: '10px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: '#888' }}>
            Navigation:
          </p>
          <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.85em', color: '#888' }}>
            <li>Rotate: Left Mouse Button</li>
            <li>Pan: Shift + Left Mouse Button</li>
            <li>Zoom: Mouse Wheel</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewerControls; 