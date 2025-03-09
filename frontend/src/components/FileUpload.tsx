import React, { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validExtensions = ['.obj', '.stl'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    console.log('Validating file:', file.name);
    console.log('File extension:', fileExtension);
    
    if (!validExtensions.includes(fileExtension)) {
      setError(`Invalid file type. Supported formats: ${validExtensions.join(', ')}`);
      return false;
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size too large. Maximum size is 50MB');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragging ? '#4a90e2' : '#ccc'}`,
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: isDragging ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
        transition: 'all 0.3s ease',
        margin: '20px',
      }}
    >
      <input
        type="file"
        accept=".stl,.obj"
        onChange={handleFileInput}
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
        {selectedFile ? (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div>
            <p>Drag and drop your 3D model here</p>
            <p>or click to select a file</p>
            <p style={{ fontSize: '0.8em', color: '#666' }}>
              Supported formats: .STL, .OBJ
            </p>
          </div>
        )}
      </label>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload; 