import { useRef } from 'react';
import { Box, Html } from '@react-three/drei';
import { Mesh } from 'three';

interface EquipmentProps {
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
    type?: string;
    color?: string;
  };
}

export default function Equipment({ data }: EquipmentProps) {
  const meshRef = useRef<Mesh>(null);
  const { position, dimensions, name, color = '#4488AA' } = data;
  
  return (
    <group position={[position.x, position.y, position.z]}>
      <Box
        ref={meshRef}
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        position={[0, dimensions.height / 2, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.5}
          roughness={0.3}
        />
      </Box>
      
      {/* Add label for the equipment */}
      <Html position={[0, dimensions.height + 0.5, 0]}>
        <div className="text-white bg-black bg-opacity-50 p-1 rounded text-xs">
          {name}
        </div>
      </Html>
    </group>
  );
} 