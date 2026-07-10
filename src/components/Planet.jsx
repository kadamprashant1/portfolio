import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const Planet = ({ position, size, color, wireframe = false, rings = false, speed = 0.005 }) => {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += speed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= speed * 0.5;
      ringRef.current.rotation.y += speed * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Core Planet */}
      <Sphere ref={planetRef} args={[size, 64, 64]}>
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe}
          emissive={new THREE.Color(color).multiplyScalar(0.2)}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {/* Optional Atmosphere Glow */}
      {!wireframe && (
        <Sphere args={[size * 1.1, 32, 32]}>
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      )}

      {/* Optional Rings */}
      {rings && (
        <group ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          {/* Inner Ring */}
          <mesh>
            <torusGeometry args={[size * 1.6, size * 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
          {/* Outer Ring */}
          <mesh>
            <torusGeometry args={[size * 1.9, size * 0.05, 16, 100]} />
            <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};
