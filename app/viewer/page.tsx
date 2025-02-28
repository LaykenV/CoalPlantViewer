'use client';

import Viewer3D from '@/src/components/Viewer3D';
import Link from 'next/link';

export default function ViewerPage() {
  return (
    <div className="h-screen w-full relative">
      <div className="fixed top-4 left-4 z-20">
        <Link
          href="/"
          className="btn btn-primary flex items-center"
          aria-label="Back to Upload"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="hidden sm:inline">Back to Upload</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>
      
      <Viewer3D />
    </div>
  );
} 