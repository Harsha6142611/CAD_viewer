import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stats } from '@react-three/drei';
import ViewerControls from './ViewerControls';
import Model from './Model';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';

interface ModelViewerProps {
  modelUrl?: string;
  renderMode?: 'solid' | 'wireframe';
  fileType?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, renderMode = 'solid', fileType }) => {
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const modelRef = useRef<THREE.Mesh>(null);

  const handleResetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5);
      cameraRef.current.lookAt(0, 0, 0);
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleExportSTL = () => {
    if (modelRef.current) {
      const exporter = new STLExporter();
      const stl = exporter.parse(modelRef.current);
      const blob = new Blob([stl], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'model.stl';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#1a1a1a' }}>
      <Canvas>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, 5]}
          near={0.1}
          far={1000}
          fov={75}
        />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment and helpers */}
        <Environment preset="warehouse" />
        {showGrid && <gridHelper args={[10, 10]} />}
        {showAxes && <axesHelper args={[5]} />}
        
        {/* Model */}
        {modelUrl && (
          <Model url={modelUrl} renderMode={renderMode} fileType={fileType} ref={modelRef} />
        )}

        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={100}
          enablePan={true}
          panSpeed={1}
          rotateSpeed={1}
          zoomSpeed={1}
        />

        {showStats && <Stats />}
      </Canvas>

      <ViewerControls
        onResetView={handleResetView}
        onToggleGrid={() => setShowGrid(!showGrid)}
        onToggleAxes={() => setShowAxes(!showAxes)}
        onToggleStats={() => setShowStats(!showStats)}
        onExportSTL={handleExportSTL}
        showGrid={showGrid}
        showAxes={showAxes}
        showStats={showStats}
        renderMode={renderMode}
      />
    </div>
  );
};

export default ModelViewer; 