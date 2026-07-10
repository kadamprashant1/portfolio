import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Shuttle = ({ thrusting = false, boosting = false }) => {
  const shuttleRef = useRef();
  const flameRefs = useRef([]);
  const innerFlameRefs = useRef([]);
  const coreFlameRef = useRef();
  const glowRingsRef = useRef([]);
  const antennaLightRef = useRef();
  const runwayLightsRef = useRef([]);

  const accentColor = '#00f0ff';
  const hullWhite = '#e8ecf2';
  const hullDark = '#808086';
  const S = 2.4;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // --- MAIN ENGINE FLAMES (3 nozzles) ---
    flameRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const flicker = 0.75 + Math.sin(t * 35 + i * 2) * 0.15 + Math.sin(t * 53 + i) * 0.1;
      const base = thrusting ? (boosting ? 3.2 : 1.5) : 0.05;
      ref.scale.set(0.85 + Math.sin(t * 20 + i) * 0.15, base * flicker, 0.85 + Math.sin(t * 20 + i) * 0.15);
      ref.material.opacity = thrusting ? 0.6 * flicker : 0;
    });
    innerFlameRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const flicker2 = 0.7 + Math.sin(t * 48 + i * 1.5) * 0.2;
      const base2 = thrusting ? (boosting ? 2.2 : 0.9) : 0.03;
      ref.scale.y = base2 * flicker2;
      ref.material.opacity = thrusting ? 0.85 * flicker2 : 0;
    });
    if (coreFlameRef.current) {
      const f3 = 0.8 + Math.sin(t * 60) * 0.2;
      coreFlameRef.current.scale.y = (thrusting ? (boosting ? 1.8 : 0.6) : 0.01) * f3;
      coreFlameRef.current.material.opacity = thrusting ? 0.95 * f3 : 0;
    }

    // --- NOZZLE GLOW ---
    glowRingsRef.current.forEach((ref) => {
      if (!ref) return;
      ref.material.emissiveIntensity = thrusting ? 1.5 + Math.sin(t * 10) * 0.5 : 0.2;
    });

    // --- ANTENNA BLINK ---
    if (antennaLightRef.current) {
      antennaLightRef.current.material.emissiveIntensity = Math.sin(t * 3) > 0.4 ? 2.5 : 0.1;
    }

    // --- RUNWAY LIGHTS CHASE ---
    runwayLightsRef.current.forEach((ref, i) => {
      if (!ref) return;
      const phase = (t * 3 + i * 0.6) % 3.0;
      ref.material.emissiveIntensity = phase < 1.0 ? phase * 1.5 : Math.max(0, 1.5 - (phase - 1.0));
    });

    // --- IDLE HOVER ---
    if (shuttleRef.current) {
      shuttleRef.current.position.y = Math.sin(t * 1.8) * 0.012 * S;
      shuttleRef.current.rotation.z = Math.sin(t * 1.2) * 0.005;
    }
  });

  return (
    <group ref={shuttleRef} scale={[S, S, S]}>

      {/* ============================================================ */}
      {/*                     NOSE SECTION                             */}
      {/* ============================================================ */}

      {/* Nose Cone — rounded, shuttle-style blunt nose */}
      <mesh position={[0, -1.6, 0]}>
        <sphereGeometry args={[0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Nose Extension */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.4, 12]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Nose Black Heat Shield */}
      <mesh position={[0, -1.6, -0.01]} rotation={[0.15, 0, 0]}>
        <sphereGeometry args={[0.145, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* ============================================================ */}
      {/*                     COCKPIT WINDOWS                          */}
      {/* ============================================================ */}

      {/* Front Windshield (6 panes) */}
      {[-0.06, -0.02, 0.02, 0.06].map((xOff, i) => (
        <mesh key={`wind-${i}`} position={[xOff, -1.35, 0.12]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[0.035, 0.06]} />
          <meshStandardMaterial
            color="#66eeff"
            emissive="#00ccff"
            emissiveIntensity={1.0}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* Window Frame */}
      <mesh position={[0, -1.35, 0.125]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[0.18, 0.07]} />
        <meshStandardMaterial color="#444466" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* ============================================================ */}
      {/*                     MAIN FUSELAGE                            */}
      {/* ============================================================ */}

      {/* Upper Fuselage (white) */}
      <mesh position={[0, -0.5, 0.04]}>
        <boxGeometry args={[0.34, 1.4, 0.22]} />
        <meshStandardMaterial color={hullWhite} metalness={0.45} roughness={0.35} />
      </mesh>

      {/* Payload Bay Doors (top, slightly raised) */}
      <mesh position={[0, -0.3, 0.16]}>
        <boxGeometry args={[0.3, 0.9, 0.01]} />
        <meshStandardMaterial color="#ccd0d8" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Payload Bay Door Seam */}
      <mesh position={[0, -0.3, 0.165]}>
        <boxGeometry args={[0.005, 0.88, 0.005]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Black Thermal Tiles (belly) */}
      <mesh position={[0, -0.5, -0.1]}>
        <boxGeometry args={[0.35, 1.42, 0.06]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
      </mesh>

      {/* ============================================================ */}
      {/*                     ACCENT STRIPES                           */}
      {/* ============================================================ */}

      {/* NASA-style stripe along the side */}
      <mesh position={[0.172, -0.5, 0.04]}>
        <boxGeometry args={[0.005, 1.2, 0.1]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.172, -0.5, 0.04]}>
        <boxGeometry args={[0.005, 1.2, 0.1]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>

      {/* ============================================================ */}
      {/*                     DELTA WINGS                              */}
      {/* ============================================================ */}

      {/* Left Wing */}
      <mesh position={[-0.42, 0.15, -0.02]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.55, 0.5, 0.03]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Left Wing — black underside */}
      <mesh position={[-0.42, 0.15, -0.05]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.54, 0.49, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
      </mesh>
      {/* Left Wing Leading Edge */}
      <mesh position={[-0.42, -0.12, -0.02]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.55, 0.02, 0.04]} />
        <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Left Wing Tip Light */}
      <mesh position={[-0.7, 0.12, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Right Wing */}
      <mesh position={[0.42, 0.15, -0.02]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.55, 0.5, 0.03]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0.42, 0.15, -0.05]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.54, 0.49, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
      </mesh>
      <mesh position={[0.42, -0.12, -0.02]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.55, 0.02, 0.04]} />
        <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Right Wing Tip Light */}
      <mesh position={[0.7, 0.12, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1.5} />
      </mesh>

      {/* ============================================================ */}
      {/*                  WING EDGE GLOW STRIPS                       */}
      {/* ============================================================ */}
      <mesh position={[-0.7, 0.15, -0.02]}>
        <boxGeometry args={[0.008, 0.3, 0.035]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.7, 0.15, -0.02]}>
        <boxGeometry args={[0.008, 0.3, 0.035]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>

      {/* ============================================================ */}
      {/*                     VERTICAL TAIL FIN                        */}
      {/* ============================================================ */}

      <mesh position={[0, 0.25, 0.28]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.02, 0.45, 0.32]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Tail Fin Accent */}
      <mesh position={[0, 0.15, 0.42]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.025, 0.2, 0.04]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
      {/* Rudder */}
      <mesh position={[0, 0.42, 0.32]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.015, 0.12, 0.18]} />
        <meshStandardMaterial color="#ccccdd" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Tail Fin Antenna */}
      <mesh position={[0, 0.1, 0.46]}>
        <cylinderGeometry args={[0.004, 0.003, 0.08, 4]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={antennaLightRef} position={[0, 0.1, 0.5]}>
        <sphereGeometry args={[0.01, 6, 6]} />
        <meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={2} />
      </mesh>

      {/* ============================================================ */}
      {/*                 OMS PODS (Orbital Maneuvering)                */}
      {/* ============================================================ */}

      {/* Left OMS Pod */}
      <mesh position={[-0.12, 0.32, 0.08]}>
        <cylinderGeometry args={[0.05, 0.04, 0.25, 8]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Right OMS Pod */}
      <mesh position={[0.12, 0.32, 0.08]}>
        <cylinderGeometry args={[0.05, 0.04, 0.25, 8]} />
        <meshStandardMaterial color={hullWhite} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* ============================================================ */}
      {/*                  RUNWAY / CHASE LIGHTS                       */}
      {/* ============================================================ */}

      {[-0.8, -0.5, -0.2, 0.1].map((yOff, i) => (
        <mesh
          key={`rl-${i}`}
          ref={(el) => { runwayLightsRef.current[i] = el; }}
          position={[0, yOff, -0.13]}
        >
          <sphereGeometry args={[0.01, 6, 6]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* ============================================================ */}
      {/*                 ENGINE NOZZLES (3 SSMEs)                      */}
      {/* ============================================================ */}

      {/* Engine Bell Mount Plate */}
      <mesh position={[0, 0.42, 0.02]}>
        <boxGeometry args={[0.22, 0.04, 0.16]} />
        <meshStandardMaterial color={hullDark} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 3 Engine Nozzles */}
      {[[-0.06, 0.48, 0.02], [0.06, 0.48, 0.02], [0, 0.48, 0.09]].map((pos, i) => (
        <group key={`eng-${i}`}>
          {/* Nozzle Bell */}
          <mesh position={pos}>
            <cylinderGeometry args={[0.04, 0.025, 0.12, 10]} />
            <meshStandardMaterial color={hullDark} metalness={0.95} roughness={0.05} />
          </mesh>
          {/* Nozzle Glow Ring */}
          <mesh
            ref={(el) => { glowRingsRef.current[i] = el; }}
            position={[pos[0], pos[1] - 0.02, pos[2]]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.04, 0.005, 6, 16]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
          </mesh>
          {/* Outer Flame */}
          <mesh
            ref={(el) => { flameRefs.current[i] = el; }}
            position={[pos[0], pos[1] + 0.15, pos[2]]}
          >
            <coneGeometry args={[0.04, 0.6, 10]} />
            <meshBasicMaterial color="#ff4400" transparent opacity={0} blending={THREE.AdditiveBlending} />
          </mesh>
          {/* Inner Flame */}
          <mesh
            ref={(el) => { innerFlameRefs.current[i] = el; }}
            position={[pos[0], pos[1] + 0.12, pos[2]]}
          >
            <coneGeometry args={[0.025, 0.45, 8]} />
            <meshBasicMaterial color="#ffcc00" transparent opacity={0} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}

      {/* Central core flame (combined glow) */}
      <mesh ref={coreFlameRef} position={[0, 0.6, 0.04]}>
        <coneGeometry args={[0.06, 0.8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* ============================================================ */}
      {/*                     ENGINE GLOW LIGHTS                       */}
      {/* ============================================================ */}
      <pointLight position={[0, 0.7, 0.04]} color="#ff5500" intensity={thrusting ? (boosting ? 12 : 5) : 0} distance={8} />
      <pointLight position={[0, -1.5, 0.1]} color={accentColor} intensity={0.4} distance={3} />

    </group>
  );
};

export default Shuttle;
