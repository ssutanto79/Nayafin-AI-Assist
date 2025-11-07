
import React, { useState, useCallback } from 'react';
import { UploadedFile } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface Document {
  name: string;
  id: string;
}

const requiredDocs: Document[] = [
    { id: 'tax-return', name: 'Tax Return (2023)' },
    { id: 'bank-statements', name: 'Bank Statements (3 months)' },
    { id: 'biz-license', name: 'Business License' },
    { id: 'p-and-l', name: 'Profit & Loss Statement' },
];

const DocumentUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploaded' as const,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);
  
  const removeFile = (id: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  };
  
  const uploadedDocNames = uploadedFiles.map(f => f.name.toLowerCase());
  
  const isDocUploaded = (docName: string) => {
      const simplifiedName = docName.split('(')[0].trim().toLowerCase();
      return uploadedDocNames.some(uf => uf.includes(simplifiedName));
  }
  
  const uploadedCount = requiredDocs.filter(d => isDocUploaded(d.name)).length;

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">📄 Required Documents ({uploadedCount} of {requiredDocs.length} uploaded)</h3>
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <ul className="space-y-3">
          {requiredDocs.map(doc => (
            <li key={doc.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                    {isDocUploaded(doc.name) ? (
                        <CheckIcon className="w-5 h-5 text-success mr-2"/>
                    ) : (
                        <svg className="w-5 h-5 text-warning mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    )}
                    {doc.name}
                </span>
                {isDocUploaded(doc.name) ? (
                     <span className="text-success font-semibold">Uploaded</span>
                ): (
                    <button className="font-semibold text-primary hover:underline">Upload</button>
                )}
            </li>
          ))}
        </ul>
      </div>

      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-6 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-primary bg-blue-50' : 'border-gray-300'}`}
      >
        <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h2a3 3 0 013 3v2a3 3 0 01-3 3H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20a4 4 0 004-4V7a4 4 0 00-4-4h-2a3 3 0 00-3 3v2a3 3 0 003 3h2z"></path></svg>
            <p className="mt-2 text-sm text-gray-600">Drag files here or <label htmlFor="file-upload" className="font-medium text-primary hover:underline cursor-pointer">Browse Files</label></p>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={e => handleFileChange(e.target.files)} />
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
          <div className="mt-4">
              <h4 className="text-sm font-medium">Uploaded files:</h4>
              <ul className="mt-2 space-y-2">
                  {uploadedFiles.map(file => (
                      <li key={file.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-md text-sm">
                          <span className="truncate">{file.name}</span>
                          <button onClick={() => removeFile(file.id)} className="ml-4 p-1 rounded-full hover:bg-gray-200">
                            <XIcon className="w-4 h-4 text-gray-500" />
                          </button>
                      </li>
                  ))}
              </ul>
          </div>
      )}
    </div>
  );
};

export default DocumentUpload;
