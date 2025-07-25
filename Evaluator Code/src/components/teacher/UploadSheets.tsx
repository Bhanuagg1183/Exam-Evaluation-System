import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  X,
  Plus
} from 'lucide-react';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

const UploadSheets: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const exams = [
    { id: '1', name: 'Mathematics Final Exam' },
    { id: '2', name: 'Physics Midterm' },
    { id: '3', name: 'Chemistry Quiz' }
  ];

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        const newFile: UploadFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          status: 'uploading',
          progress: 0
        };

        setUploadedFiles(prev => [...prev, newFile]);

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadedFiles(prev => 
            prev.map(f => {
              if (f.id === newFile.id) {
                if (f.progress >= 100) {
                  clearInterval(interval);
                  return { ...f, status: 'success', progress: 100 };
                }
                return { ...f, progress: f.progress + Math.random() * 30 };
              }
              return f;
            })
          );
        }, 200);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Answer Sheets</h2>
        <p className="text-gray-600">
          Upload PDF answer sheets for evaluation. Select the exam and drag & drop or browse files.
        </p>
      </div>

      {/* Exam Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Exam
        </label>
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose an exam...</option>
          {exams.map(exam => (
            <option key={exam.id} value={exam.id}>{exam.name}</option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop PDF files here or click to browse
          </h3>
          <p className="text-gray-500 mb-4">
            Support for multiple PDF files up to 10MB each
          </p>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
            disabled={!selectedExam}
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              selectedExam
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Browse Files</span>
          </label>
          
          {!selectedExam && (
            <div className="flex items-center justify-center space-x-2 mt-3 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Please select an exam first</span>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
          <div className="space-y-3">
            {uploadedFiles.map(file => (
              <div key={file.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {file.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : file.status === 'error' ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <FileText className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  
                  {file.status === 'uploading' && (
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Uploading...</span>
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {file.status === 'error' && (
                    <p className="text-xs text-red-500 mt-1">{file.error}</p>
                  )}
                </div>
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {uploadedFiles.filter(f => f.status === 'success').length} of {uploadedFiles.length} files uploaded successfully
            </span>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Process All Files
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSheets;