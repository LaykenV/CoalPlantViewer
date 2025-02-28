import { useState } from 'react';

interface Metadata {
  documentName?: string;
  documentNumbers?: string[];
  revisionInfo?: string[];
  revisionDates?: string[];
  revisionNumbers?: string[];
  revisionBy?: string[];
  unitInfo?: string;
  elevation?: string;
}

interface ToolbarProps {
  plantData: Record<string, unknown>;
}

export default function Toolbar({ plantData }: ToolbarProps) {
  const [showMetadata, setShowMetadata] = useState(false);
  
  const exportData = () => {
    const dataStr = JSON.stringify(plantData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'coal-plant-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const metadata = plantData.metadata as Metadata | undefined;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-auto z-10">
      <div className="flex flex-row md:flex-col gap-2 p-2 md:p-0">
        <button
          onClick={exportData}
          className="btn btn-primary flex-1 md:flex-none text-sm md:text-base flex items-center justify-center"
          aria-label="Export Data"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          <span className="hidden md:inline">Export Data</span>
          <span className="md:hidden">Export</span>
        </button>
        
        <button
          onClick={() => setShowMetadata(!showMetadata)}
          className="btn btn-secondary flex-1 md:flex-none text-sm md:text-base flex items-center justify-center"
          aria-label={showMetadata ? "Hide Metadata" : "Show Metadata"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="hidden md:inline">{showMetadata ? 'Hide Metadata' : 'Show Metadata'}</span>
          <span className="md:hidden">Info</span>
        </button>
      </div>
      
      {showMetadata && metadata && (
        <div className="card m-2 md:mt-2 md:mb-0 md:ml-0 md:mr-0 max-w-md max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Document Metadata</h3>
              <button 
                onClick={() => setShowMetadata(false)}
                className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
                aria-label="Close metadata"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {metadata.documentName && (
              <MetadataItem label="Document" value={metadata.documentName} />
            )}
            
            {metadata.unitInfo && (
              <MetadataItem label="Unit" value={metadata.unitInfo} />
            )}
            
            {metadata.elevation && (
              <MetadataItem label="Elevation" value={metadata.elevation} />
            )}
            
            {metadata.documentNumbers && metadata.documentNumbers.length > 0 && (
              <MetadataItem 
                label="Document Numbers" 
                value={metadata.documentNumbers.join(', ')} 
              />
            )}
            
            {metadata.revisionInfo && metadata.revisionInfo.length > 0 && (
              <div className="mb-3">
                <span className="font-semibold text-sm">Revision Info:</span>
                <ul className="mt-1 space-y-1 text-sm">
                  {metadata.revisionInfo.map((info: string, index: number) => (
                    <li key={index} className="bg-secondary p-2 rounded">
                      {info}
                      {metadata.revisionDates && metadata.revisionDates[index] && (
                        <span className="block text-xs text-neutral-500 mt-1">
                          Date: {metadata.revisionDates[index]}
                        </span>
                      )}
                      {metadata.revisionNumbers && metadata.revisionNumbers[index] && (
                        <span className="block text-xs text-neutral-500">
                          Rev: {metadata.revisionNumbers[index]}
                        </span>
                      )}
                      {metadata.revisionBy && metadata.revisionBy[index] && (
                        <span className="block text-xs text-neutral-500">
                          By: {metadata.revisionBy[index]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface MetadataItemProps {
  label: string;
  value: string;
}

function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <div className="mb-3">
      <span className="font-semibold text-sm">{label}:</span>
      <div className="mt-1 text-sm bg-secondary p-2 rounded">{value}</div>
    </div>
  );
} 