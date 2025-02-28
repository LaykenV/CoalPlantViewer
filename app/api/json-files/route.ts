import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file');
  
  // Path to the json-files directory
  const jsonFilesDir = path.join(process.cwd(), 'json-files');
  
  try {
    // If a specific file is requested, return its contents
    if (file) {
      // Ensure the file is within the json-files directory to prevent directory traversal
      const filePath = path.join(jsonFilesDir, path.basename(file));
      
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }
      
      // Read and parse the file
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonContent = JSON.parse(fileContent);
      
      return NextResponse.json({ content: jsonContent });
    }
    
    // Otherwise, list all JSON files in the directory
    if (!fs.existsSync(jsonFilesDir)) {
      return NextResponse.json({ files: [] });
    }
    
    const files = fs.readdirSync(jsonFilesDir)
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        name: file,
        path: file
      }));
    
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error handling JSON files:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 