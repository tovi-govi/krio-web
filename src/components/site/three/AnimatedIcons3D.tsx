import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Eye icon (Vision) ────────────────────────────────────────────────────────
export function EyeIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.4;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[0.35, 0.06, 12, 32]} />
        <meshPhysicalMaterial color="#005CB9" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <circleGeometry args={[0.2, 24]} />
        <meshPhysicalMaterial color="#1a7fca" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.16]}>
        <circleGeometry args={[0.1, 24]} />
        <meshPhysicalMaterial color="#003B8F" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0.06, 0.05, 0.22]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0} metalness={0} emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// ── Target icon (Mission) ─────────────────────────────────────────────────────
export function TargetIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.5;
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.05;
    if (innerRef.current) innerRef.current.rotation.z = -t * 1.5;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[0.38, 0.055, 12, 32]} />
        <meshPhysicalMaterial color="#67B346" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.26, 0.045, 12, 32]} />
        <meshPhysicalMaterial color="#005CB9" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshPhysicalMaterial color="#003B8F" roughness={0.1} metalness={0.6} emissive="#005CB9" emissiveIntensity={0.4} />
      </mesh>
      {[
        { pos: [0, 0.28, 0] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [0.025, 0.1, 0.025] as [number,number,number] },
        { pos: [0, -0.28, 0] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [0.025, 0.1, 0.025] as [number,number,number] },
        { pos: [0.28, 0, 0] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [0.1, 0.025, 0.025] as [number,number,number] },
        { pos: [-0.28, 0, 0] as [number,number,number], rot: [0,0,0] as [number,number,number], size: [0.1, 0.025, 0.025] as [number,number,number] },
      ].map((c, i) => (
        <mesh key={i} position={c.pos}>
          <boxGeometry args={c.size} />
          <meshPhysicalMaterial color="#67B346" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ── Earth / Leaf icon (Sustainability) ────────────────────────────────────────
export function EarthLeafIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  const leafRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.6;
    groupRef.current.position.y = Math.sin(t * 1.1) * 0.06;
    if (leafRef.current) leafRef.current.rotation.z = Math.sin(t * 1.3) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshPhysicalMaterial color="#1a7fca" roughness={0.15} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.31, 0.015, 8, 32]} />
        <meshPhysicalMaterial color="#67B346" roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.015, 8, 32]} />
        <meshPhysicalMaterial color="#67B346" roughness={0.3} />
      </mesh>
      <group ref={leafRef} position={[0.15, 0.25, 0.2]}>
        <mesh rotation={[0, 0, Math.PI / 5]}>
          <coneGeometry args={[0.11, 0.22, 3]} />
          <meshPhysicalMaterial color="#67B346" roughness={0.3} metalness={0.1} emissive="#3a8a28" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// ── Droplet icon (Pure & Mineral) ─────────────────────────────────────────────
export function DropletIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.5;
    groupRef.current.position.y = Math.sin(t * 1.3) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhysicalMaterial color="#6ec6ff" roughness={0.02} metalness={0} transmission={0.7} thickness={1} ior={1.4} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.1, 0.22, 16]} />
        <meshPhysicalMaterial color="#6ec6ff" roughness={0.02} transmission={0.7} thickness={0.5} ior={1.4} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.06, 0.02, 0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0} metalness={0} emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

// ── Shield icon (Hygienic) ────────────────────────────────────────────────────
export function ShieldIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.45;
    groupRef.current.position.y = Math.sin(t * 1.1) * 0.06;
  });

  // Pre-build shape outside render
  const shieldShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.42);
    s.lineTo(0.33, 0.28);
    s.lineTo(0.33, -0.1);
    s.quadraticCurveTo(0.33, -0.48, 0, -0.55);
    s.quadraticCurveTo(-0.33, -0.48, -0.33, -0.1);
    s.lineTo(-0.33, 0.28);
    s.closePath();
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.1,
    bevelEnabled: true,
    bevelSize: 0.03,
    bevelThickness: 0.03,
    bevelSegments: 3,
  }), []);

  return (
    <group ref={groupRef}>
      <mesh>
        <extrudeGeometry args={[shieldShape, extrudeSettings]} />
        <meshPhysicalMaterial color="#005CB9" roughness={0.2} metalness={0.5} />
      </mesh>
      {/* checkmark left stroke */}
      <mesh position={[-0.07, -0.06, 0.12]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.16, 0.055, 0.055]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {/* checkmark right stroke */}
      <mesh position={[0.07, 0.02, 0.12]} rotation={[0, 0, 0.85]}>
        <boxGeometry args={[0.055, 0.26, 0.055]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// ── Truck icon (Consistent Quality) ──────────────────────────────────────────
export function TruckIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.x = Math.sin(t * 1.5) * 0.12;
    groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.3;
    groupRef.current.position.y = Math.abs(Math.sin(t * 2.5)) * 0.02;
  });

  return (
    <group ref={groupRef} scale={[0.9, 0.9, 0.9]}>
      <mesh position={[-0.1, 0.08, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.22]} />
        <meshPhysicalMaterial color="#003B8F" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0.18, 0, 0]}>
        <boxGeometry args={[0.34, 0.22, 0.24]} />
        <meshPhysicalMaterial color="#005CB9" roughness={0.3} metalness={0.3} />
      </mesh>
      {([-0.18, 0.22] as number[]).map((x, i) => (
        <mesh key={i} position={[x, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.09, 0.035, 8, 16]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[-0.25, 0.06, 0.05]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshPhysicalMaterial color="#ffff99" emissive="#ffff88" emissiveIntensity={2} roughness={0} />
      </mesh>
    </group>
  );
}

// ── Headphones icon (Reliable Service) ───────────────────────────────────────
export function HeadphonesIcon3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.5;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.28, 0.04, 12, 24, Math.PI]} />
        <meshPhysicalMaterial color="#67B346" roughness={0.2} metalness={0.5} />
      </mesh>
      {([-1, 1] as number[]).map((side, i) => (
        <mesh key={i} position={[side * 0.28, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
          <meshPhysicalMaterial color="#005CB9" roughness={0.3} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
