import { useRef } from 'react';
import { Cylinder, Html } from '@react-three/drei';
import { Mesh } from 'three';

interface SiloProps {
  data: {
    id: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    dimensions: {
      radius?: number;
      height: number;
      width?: number;
      depth?: number;
    };
    name: string;
    color?: string;
    cylindrical?: boolean;
  };
}

export default function Silo({ data }: SiloProps) {
  const meshRef = useRef<Mesh>(null);
  const { position, dimensions, name, color = '#AAAAAA' } = data;
  
  // Calculate radius from width/depth if not provided directly
  const radius = dimensions.radius || 
    (dimensions.width && dimensions.depth 
      ? Math.min(dimensions.width, dimensions.depth) / 2 
      : 1);
  
  return (
    <group position={[position.x, position.y, position.z]}>
      <Cylinder
        ref={meshRef}
        args={[radius, radius, dimensions.height, 32]}
        position={[0, dimensions.height / 2, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.3}
          roughness={0.5}
        />
      </Cylinder>
      
      {/* Optional: Add label for the silo */}
      <Html position={[0, dimensions.height + 1, 0]}>
        <div className="text-white bg-black bg-opacity-50 p-1 rounded text-xs">
          {name}
        </div>
      </Html>
    </group>
  );
} 