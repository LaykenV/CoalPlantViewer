import { useRef } from 'react';
import { Sphere, Html } from '@react-three/drei';
import { Mesh } from 'three';

interface MarkerProps {
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
    color?: string;
  };
}

export default function Marker({ data }: MarkerProps) {
  const meshRef = useRef<Mesh>(null);
  const { position, name, color = '#FF4444' } = data;
  
  // Use a small sphere for markers
  const radius = 0.5;
  
  return (
    <group position={[position.x, position.y, position.z]}>
      <Sphere
        ref={meshRef}
        args={[radius, 16, 16]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Add label for the marker */}
      <Html position={[0, radius + 0.5, 0]}>
        <div className="text-white bg-black bg-opacity-50 p-1 rounded text-xs">
          {name}
        </div>
      </Html>
    </group>
  );
} 