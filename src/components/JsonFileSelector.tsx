import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface JsonFile {
  name: string;
  path: string;
}

export default function JsonFileSelector() {
  const router = useRouter();
  const [files, setFiles] = useState<JsonFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch('/api/json-files');
        if (!response.ok) {
          throw new Error('Failed to fetch JSON files');
        }
        const data = await response.json();
        setFiles(data.files);
      } catch (err) {
        setError('Error loading JSON files');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  const loadFile = async (filePath: string) => {
    try {
      setSelectedFile(filePath);
      setLoading(true);
      
      const response = await fetch(`/api/json-files?file=${encodeURIComponent(filePath)}`);
      if (!response.ok) {
        throw new Error('Failed to load file');
      }
      const data = await response.json();
      
      // Store data in localStorage for the viewer
      localStorage.setItem('plantData', JSON.stringify(data.content));
      router.push('/viewer');
    } catch (err) {
      setError('Error loading the selected file');
      console.error(err);
      setSelectedFile(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !selectedFile) {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-2">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading available JSON files...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold mb-4">Select a JSON file</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-destructive bg-opacity-10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}
      
      {files.length === 0 && !loading ? (
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">No JSON files available</p>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {files.map((file) => (
            <button
              key={file.path}
              onClick={() => loadFile(file.path)}
              disabled={loading && selectedFile === file.path}
              className={`
                w-full text-left p-3 rounded-md transition-colors flex items-center
                ${selectedFile === file.path 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground hover:bg-primary hover:bg-opacity-10'}
              `}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              
              <div className="overflow-hidden">
                <span className="block truncate">{file.name}</span>
                {selectedFile === file.path && loading && (
                  <span className="text-xs mt-1 flex items-center">
                    <span className="w-3 h-3 mr-1 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    Loading...
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 