import { useState, useRef } from 'react';
import { Upload, X, Image, FileText, Code } from 'lucide-react';

export default function FileUpload({ onFileAnalyze, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Check file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'text/plain', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please select an image (JPEG, PNG, GIF, WebP) or text file');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      await onFileAnalyze(selectedFile);
      // Clear after successful analysis
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (file.type === 'text/plain') return <FileText className="w-5 h-5" />;
    if (file.type === 'application/pdf') return <FileText className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* File Upload Area */}
      {!selectedFile && (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            Upload DSA-related file
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Drag & drop or click to upload images, code snippets, or diagrams
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Supports: JPEG, PNG, GIF, WebP, TXT, PDF (Max 5MB)
          </p>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleInputChange}
            accept=".jpg,.jpeg,.png,.gif,.webp,.txt,.pdf"
            className="hidden"
            disabled={disabled}
          />
        </div>
      )}

      {/* File Preview */}
      {selectedFile && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getFileIcon(selectedFile)}
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                className="max-h-32 mx-auto rounded-lg border border-gray-200 dark:border-gray-600"
              />
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={disabled}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Code className="w-4 h-4" />
            <span>Analyze for DSA Content</span>
          </button>
        </div>
      )}
    </div>
  );
}