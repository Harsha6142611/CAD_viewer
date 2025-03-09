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
        top: '150px',
        right: '20px',
        backgroundColor: 'rgba(28, 28, 28, 0.95)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        color: 'white',
        width: '200px',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <h3 style={{ 
        margin: '0 0 15px 0', 
        color: '#4a90e2', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        paddingBottom: '8px',
        fontSize: '1.1em',
        fontWeight: 500
      }}>
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
            fontSize: '0.9em',
            fontWeight: 500
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
              fontSize: '0.9em',
              fontWeight: 500
            }}
          >
            Export to STL
          </button>
        )}

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '10px',
          borderRadius: '6px'
        }}>
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

        <div style={{ 
          marginTop: '10px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          paddingTop: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '10px',
          borderRadius: '6px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: '#aaa' }}>
            Navigation:
          </p>
          <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '0.85em', color: '#aaa' }}>
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