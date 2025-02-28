import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

export default function FileUpload() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    setIsLoading(true);
    setError(null);
    
    reader.onload = async (event) => {
      try {
        if (event.target && event.target.result) {
          const data = JSON.parse(event.target.result as string);
          // Store data in localStorage for simplicity
          localStorage.setItem('plantData', JSON.stringify(data));
          router.push('/viewer');
        }
      } catch (err) {
        setError('Invalid JSON file. Please check the file format.');
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  }, [router]);
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ 
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    maxFiles: 1
  });
  
  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`
          border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-accent bg-opacity-10' : 'border-input hover:border-primary'}
          ${isDragReject ? 'border-destructive bg-destructive bg-opacity-10' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-primary opacity-75" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          
          {isDragActive ? (
            <p className="text-sm md:text-base font-medium">Drop the file here...</p>
          ) : (
            <div>
              <p className="text-sm md:text-base font-medium">Drag and drop a JSON file here</p>
              <p className="text-xs md:text-sm text-neutral-500 mt-1">or click to browse files</p>
            </div>
          )}
          
          {isLoading && (
            <div className="mt-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm mt-2">Processing file...</p>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-3 text-sm text-destructive bg-destructive bg-opacity-10 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 