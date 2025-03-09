import React, { useState, useCallback } from 'react';
import './App.css';
import ModelViewer from './components/ModelViewer';
import FileUpload from './components/FileUpload';

function App() {
  const [modelUrl, setModelUrl] = useState<string>();
  const [fileType, setFileType] = useState<string>();
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe'>('solid');

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const extension = file.name.split('.').pop()?.toLowerCase();
      setModelUrl(url);
      setFileType(extension);
    } catch (error) {
      console.error('Error creating object URL:', error);
    }
  }, []);

  const handleRenderModeChange = useCallback((mode: 'solid' | 'wireframe') => {
    setRenderMode(mode);
  }, []);

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: '#1a1a1a' }}>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1,
        backgroundColor: 'rgba(28, 28, 28, 0.95)',
        borderBottom: '1px solid #333'
      }}>
        <FileUpload onFileSelect={handleFileSelect} />
        
        <div className="render-mode-controls">
          <label>
            <input
              type="radio"
              value="solid"
              checked={renderMode === 'solid'}
              onChange={() => handleRenderModeChange('solid')}
            />
            <span style={{ color: 'white', marginLeft: '4px' }}>Solid</span>
          </label>
          <label>
            <input
              type="radio"
              value="wireframe"
              checked={renderMode === 'wireframe'}
              onChange={() => handleRenderModeChange('wireframe')}
            />
            <span style={{ color: 'white', marginLeft: '4px' }}>Wireframe</span>
          </label>
        </div>
      </div>
      
      <ModelViewer modelUrl={modelUrl} renderMode={renderMode} fileType={fileType} />
    </div>
  );
}

export default App;
