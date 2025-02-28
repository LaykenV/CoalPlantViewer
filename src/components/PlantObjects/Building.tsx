import { useRef } from 'react';
import { Box, Html } from '@react-three/drei';
import { Mesh } from 'three';

interface BuildingProps {
  data: {
    id: string;
    position: {
      x: number;
      y: number;
      z: number;
    };
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    name: string;
  };
}

export default function Building({ data }: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const { position, dimensions, name } = data;
  
  return (
    <group position={[position.x, position.y, position.z]}>
      <Box
        ref={meshRef}
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color="#888888" 
          metalness={0.1}
          roughness={0.7}
        />
      </Box>
      
      {/* Optional: Add label for the building */}
      <Html position={[0, dimensions.height / 2 + 1, 0]}>
        <div className="text-white bg-black bg-opacity-50 p-1 rounded text-xs">
          {name}
        </div>
      </Html>
    </group>
  );
} 