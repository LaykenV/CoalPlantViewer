'use client';

import FileUpload from '@/src/components/FileUpload';
import JsonFileSelector from '@/src/components/JsonFileSelector';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Coal Plant 3D Viewer</h1>
        <div className="card p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Upload Plant Data</h2>
          <FileUpload />
        </div>
        
        <div className="card p-4 md:p-6">
          <JsonFileSelector />
        </div>
      </div>
    </main>
  );
}
