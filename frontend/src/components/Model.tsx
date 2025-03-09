import React, { useEffect, useState, forwardRef } from 'react';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Center, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh, BufferGeometry } from 'three';

interface ModelProps {
  url: string;
  renderMode?: 'solid' | 'wireframe';
  fileType?: string;
}

const Model = forwardRef<THREE.Mesh, ModelProps>(({ url, renderMode = 'solid', fileType }, ref) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Loading model from URL:', url);
        const fileExtension = fileType || url.split('.').pop()?.toLowerCase();
        console.log('File extension:', fileExtension);

        if (!fileExtension) {
          throw new Error('No file extension found');
        }

        switch (fileExtension) {
          case 'stl':
            console.log('Loading STL file...');
            const stlLoader = new STLLoader();
            const stlGeometry = await stlLoader.loadAsync(url);
            setGeometry(stlGeometry);
            break;

          case 'obj':
            console.log('Loading OBJ file...');
            const objLoader = new OBJLoader();
            const objResult = await objLoader.loadAsync(url);
            console.log('OBJ loaded:', objResult);

            // Handle OBJ Group
            const meshes: BufferGeometry[] = [];
            objResult.traverse((child) => {
              if (child instanceof Mesh) {
                console.log('Found mesh in OBJ:', child);
                if (child.geometry) {
                  meshes.push(child.geometry);
                }
              }
            });

            if (meshes.length > 0) {
              console.log('Using first mesh geometry');
              setGeometry(meshes[0]);
            } else {
              throw new Error('No meshes found in OBJ file');
            }
            break;

          default:
            throw new Error(`Unsupported file format: ${fileExtension}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error loading model';
        setError(errorMessage);
        console.error('Error loading model:', error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      loadModel();
    }
  }, [url, fileType]);

  if (loading) {
    return (
      <Html center>
        <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
          Loading model...
        </div>
      </Html>
    );
  }

  if (error) {
    return (
      <Html center>
        <div style={{ color: 'white', background: 'rgba(255,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
          Error: {error}
        </div>
      </Html>
    );
  }

  if (!geometry) {
    return (
      <Html center>
        <div style={{ color: 'white', background: 'rgba(255,165,0,0.7)', padding: '10px', borderRadius: '5px' }}>
          No geometry loaded
        </div>
      </Html>
    );
  }

  return (
    <Center>
      <mesh ref={ref} geometry={geometry}>
        <meshStandardMaterial
          color="#808080"
          wireframe={renderMode === 'wireframe'}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Center>
  );
});

Model.displayName = 'Model';

export default Model; 