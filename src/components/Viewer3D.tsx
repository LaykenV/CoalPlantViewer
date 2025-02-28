import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import Building from './PlantObjects/Building';
import Equipment from './PlantObjects/Equipment';
import Silo from './PlantObjects/Silo';
import Marker from './PlantObjects/Marker';
import Controls from './Controls';
import Toolbar from './Toolbar';
import Link from 'next/link';

interface PlantData {
  metadata?: {
    documentName?: string;
    documentNumbers?: string[];
    revisionInfo?: string[];
    revisionDates?: string[];
    revisionNumbers?: string[];
    revisionBy?: string[];
    unitInfo?: string;
    elevation?: string;
  };
  buildings?: Array<{
    id: string;
    position: { x: number; y: number; z: number };
    dimensions: { width: number; height: number; depth: number };
    name: string;
    color?: string;
  }>;
  structures?: Array<{
    id: string;
    type: string;
    position: { x: number; y: number; z: number };
    dimensions: {
      radius?: number;
      height?: number;
      width?: number;
      depth?: number;
    };
    name: string;
    color?: string;
    cylindrical?: boolean;
  }>;
  misc?: Array<{
    id: string;
    position: { x: number; y: number; z: number };
    dimensions: { width: number; height: number; depth: number };
    name: string;
    color?: string;
    type?: string;
  }>;
}

interface VisibilityState {
  buildings: boolean;
  equipment: boolean;
  silos: boolean;
  markers: boolean;
}

export default function Viewer3D() {
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [visibility, setVisibility] = useState<VisibilityState>({
    buildings: true,
    equipment: true,
    silos: true,
    markers: true
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get data from localStorage
    const data = localStorage.getItem('plantData');
    if (data) {
      try {
        setPlantData(JSON.parse(data));
      } catch (err) {
        console.error('Error parsing plant data:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading plant data...</p>
        </div>
      </div>
    );
  }
  
  if (!plantData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="card p-6 max-w-md text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-neutral-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
          <p className="text-xl font-medium mt-4 mb-2">No Data Loaded</p>
          <p className="text-neutral-500 mb-6">Please upload a plant data file to view the 3D model.</p>
          <Link href="/" className="btn btn-primary inline-block">
            Go to Upload Page
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [30, 30, 30], fov: 50 }}
        shadows
        className="bg-neutral-100 dark:bg-neutral-900"
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Grid for reference */}
        <Grid 
          infiniteGrid
          cellSize={1}
          sectionSize={10}
          fadeDistance={50}
          cellColor={visibility.buildings ? "rgba(60, 60, 60, 0.3)" : "rgba(60, 60, 60, 0.15)"}
          sectionColor={visibility.buildings ? "rgba(30, 30, 30, 0.5)" : "rgba(30, 30, 30, 0.3)"}
        />
        
        {/* Render buildings */}
        {visibility.buildings && plantData.buildings && plantData.buildings.map((building) => (
          <Building key={building.id} data={building} />
        ))}
        
        {/* Render structures */}
        {plantData.structures && plantData.structures.map((structure) => {
          if (structure.type === 'silo' && visibility.silos) {
            // Handle cylindrical silos
            if (structure.cylindrical && structure.dimensions.radius && structure.dimensions.height) {
              return <Silo key={structure.id} data={{
                id: structure.id,
                position: structure.position,
                dimensions: {
                  radius: structure.dimensions.radius,
                  height: structure.dimensions.height,
                  width: structure.dimensions.width,
                  depth: structure.dimensions.depth
                },
                name: structure.name,
                color: structure.color,
                cylindrical: structure.cylindrical
              }} />;
            }
            // Handle non-cylindrical silos or silos with missing radius
            else if (structure.dimensions.height && (structure.dimensions.width || structure.dimensions.radius)) {
              return <Silo key={structure.id} data={{
                id: structure.id,
                position: structure.position,
                dimensions: {
                  radius: structure.dimensions.radius,
                  height: structure.dimensions.height,
                  width: structure.dimensions.width,
                  depth: structure.dimensions.depth
                },
                name: structure.name,
                color: structure.color,
                cylindrical: structure.cylindrical
              }} />;
            }
            return null;
          }
          if (visibility.equipment && structure.type !== 'silo') {
            // Ensure required properties for Equipment exist
            return <Equipment key={structure.id} data={{
              id: structure.id,
              position: structure.position,
              dimensions: {
                width: structure.dimensions.width || 1, // Default value if undefined
                height: structure.dimensions.height || 1, // Default value if undefined
                depth: structure.dimensions.depth || 1 // Default value if undefined
              },
              name: structure.name,
              type: structure.type,
              color: structure.color
            }} />;
          }
          return null;
        })}
        
        {/* Render misc items */}
        {plantData.misc && plantData.misc.map((item) => {
          if (item.type === 'marker' && visibility.markers) {
            return <Marker key={item.id} data={item} />;
          } else if (visibility.equipment) {
            return <Equipment key={item.id} data={item} />;
          }
          return null;
        })}
        
        {/* Camera controls */}
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={5}
          maxDistance={200}
        />
        <Environment preset="warehouse" />
      </Canvas>
      
      <Controls visibility={visibility} setVisibility={setVisibility} />
      <Toolbar plantData={plantData as Record<string, unknown>} />
    </div>
  );
} 