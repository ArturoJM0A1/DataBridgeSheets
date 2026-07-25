import { useState, useCallback, useRef } from 'react';
import { formatFileSize } from '../utils/formatters';

export default function FileUpload({ files, onAddFiles, onRemoveFile }) {
  const [isDragover, setIsDragover] = useState(false);
  const [showLoaded, setShowLoaded] = useState(false);
  const inputRef = useRef(null);

  const handleChange = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(e.target.files);
      e.target.value = '';
    }
  }, [onAddFiles]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragover(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragover(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragover(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(e.dataTransfer.files);
      setShowLoaded(true);
      setTimeout(() => setShowLoaded(false), 1000);
    }
  }, [onAddFiles]);

  return (
    <div className="card">
      <div className="card-title">Archivos Excel</div>
      <div
        className={'upload-area' + (isDragover ? ' dragover' : '') + (showLoaded ? ' loaded' : '')}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          multiple
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        {showLoaded ? (
          <span className="upload-icon"><i className="fa-solid fa-check"></i></span>
        ) : (
          <>
            <span className="upload-icon"><i className="fa-solid fa-cloud-arrow-up"></i></span>
            <span className="upload-text">Arrastra tu archivo Excel aquí</span>
            <span className="upload-subtext">Formatos: .xlsx, .xls</span>
          </>
        )}
      </div>
      {files.length > 0 && (
        <div className="file-list">
          {files.map((f, i) => (
            <div key={i} className="file-item">
              <span className="file-name">{f.name}</span>
              <span className="file-size">{formatFileSize(f.size)}</span>
              <button className="file-remove" onClick={() => onRemoveFile(i)} title="Eliminar"><i className="fa-solid fa-xmark"></i></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
