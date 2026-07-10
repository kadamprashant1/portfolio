import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Html, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './Planet';
import Shuttle from './Rocket';

const STATIONS = [
  { id: 'bio', name: 'Bio Station', position: [0, 0, -50], color: '#00f0ff' },
  { id: 'experience', name: 'Experience Log', position: [40, 10, -80], color: '#ff00f0' },
  { id: 'education', name: 'Academy Archive', position: [-30, -20, -100], color: '#00ff00' },
  { id: 'skills', name: 'Weapons Rack', position: [20, -30, -130], color: '#f0ff00' },
  { id: 'research', name: 'Research Lab', position: [-50, 20, -160], color: '#0055ff' },
  { id: 'projects', name: 'Mission Archive', position: [0, 0, -200], color: '#ff5500' },
];

const Spaceship = ({ setPosition, setVelocity, setNearestStation, onDock }) => {
  const { camera } = useThree();
  const rocketGroupRef = useRef();
  
  // Physics state
  const velocity = useRef(new THREE.Vector3());
  const speed = useRef(0);
  const lastUpdateTime = useRef(0);
  const [thrusting, setThrusting] = useState(false);
  const [boosting, setBoosting] = useState(false);
  
  // Input state
  const keys = useRef({ w: false, a: false, s: false, d: false, space: false, shift: false, e: false, r: false });

  // Setup input listeners
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) keys.current[key] = true;
      if (e.code === 'Space') keys.current.space = true;
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) keys.current[key] = false;
      if (e.code === 'Space') keys.current.space = false;
      
      // Reset
      if (key === 'r') {
        camera.position.set(0, 0, 0);
        camera.rotation.set(0, 0, 0);
        velocity.current.set(0,0,0);
        speed.current = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [camera]);

  useFrame((state, delta) => {
    // Rotation (Pitch and Yaw)
    if (keys.current.w) camera.rotateX(delta * 1.5);
    if (keys.current.s) camera.rotateX(-delta * 1.5);
    if (keys.current.a) camera.rotateY(delta * 1.5);
    if (keys.current.d) camera.rotateY(-delta * 1.5);

    // Thrust
    const isThrusting = keys.current.space;
    const isBoosting = keys.current.space && keys.current.shift;
    const targetSpeed = isThrusting ? (isBoosting ? 40 : 15) : 0;
    speed.current = THREE.MathUtils.lerp(speed.current, targetSpeed, 0.1);
    
    // Update flame state (throttled to avoid excessive re-renders)
    if (state.clock.elapsedTime - lastUpdateTime.current > 0.1) {
      setThrusting(isThrusting);
      setBoosting(isBoosting);
    }
    
    // Apply movement forward relative to camera rotation
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    velocity.current.copy(direction).multiplyScalar(speed.current * delta);
    camera.position.add(velocity.current);

    // Position the rocket in front of the camera
    if (rocketGroupRef.current) {
      // Place it just below and in front of the camera
      const rocketOffset = new THREE.Vector3(0, -1.2, -4.5);
      rocketOffset.applyQuaternion(camera.quaternion);
      rocketGroupRef.current.position.copy(camera.position).add(rocketOffset);
      rocketGroupRef.current.quaternion.copy(camera.quaternion);
      // Rotate the rocket so its nose points forward (along -Z in camera space)
      rocketGroupRef.current.rotateX(Math.PI / 2);
      
      // Subtle tilt on turning
      if (keys.current.a) rocketGroupRef.current.rotateY(0.15);
      if (keys.current.d) rocketGroupRef.current.rotateY(-0.15);
    }

    // Update HUD stats at 10 FPS to prevent React state overload
    if (state.clock.elapsedTime - lastUpdateTime.current > 0.1) {
      setPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
      setVelocity(speed.current);
      lastUpdateTime.current = state.clock.elapsedTime;
    }

    // Check proximity to stations
    let nearest = null;
    let minDistance = Infinity;

    STATIONS.forEach(station => {
      const dist = camera.position.distanceTo(new THREE.Vector3(...station.position));
      if (dist < minDistance) {
        minDistance = dist;
        nearest = station;
      }
    });

    if (minDistance < 15) {
      setNearestStation(nearest);
      if (keys.current.e) {
        keys.current.e = false;
        speed.current = 0;
        onDock(nearest.id);
      }
    } else {
      setNearestStation(null);
    }
  });

  return (
    <group ref={rocketGroupRef}>
      <Shuttle thrusting={thrusting} boosting={boosting} />
    </group>
  );
};

const StationMarker = ({ position, color, name, id }) => {
  // Assign different visual styles based on the station ID
  const hasRings = id === 'projects' || id === 'bio';
  const isWireframe = id === 'skills' || id === 'education';

  return (
    <group position={position}>
      {/* Render the planet as the station marker */}
      <Planet position={[0, 0, 0]} size={3} color={color} wireframe={isWireframe} rings={hasRings} speed={0.005} />
      
      {/* Label */}
      <Html position={[0, -5, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="px-2 py-1 bg-black/50 border border-[rgba(255,255,255,0.2)] rounded text-xs font-mono text-white whitespace-nowrap text-center">
          <div className="font-bold mb-0.5" style={{ color: color }}>{name.toUpperCase()}</div>
          <div className="opacity-70 text-[10px]">[{position[0]}, {position[1]}, {position[2]}]</div>
        </div>
      </Html>
    </group>
  );
};

const FlightScene = ({ onHUDUpdate, onDock }) => {
  return (
    <div className="w-full h-screen bg-black absolute inset-0">
      <Canvas camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 1000 }}>
        <color attach="background" args={['#02040a']} />
        
        <ambientLight intensity={0.5} />
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Stations (Now represented by Planets) */}
        {STATIONS.map((station) => (
          <StationMarker key={station.id} {...station} />
        ))}

        <Spaceship 
          setPosition={(pos) => onHUDUpdate('position', pos)}
          setVelocity={(vel) => onHUDUpdate('velocity', vel)}
          setNearestStation={(station) => onHUDUpdate('nearestStation', station)}
          onDock={onDock}
        />
      </Canvas>
    </div>
  );
};

export default FlightScene;
