import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

function LeafParticles() {
  const count = 20;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        theta: Math.random() * Math.PI * 2,
        phi: Math.random() * Math.PI,
        r: 0.9 + Math.random() * 0.5,
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      p.theta += p.speed * 0.008;
      const x = p.r * Math.sin(p.phi) * Math.cos(p.theta);
      const y = p.r * Math.cos(p.phi) + Math.sin(t + p.offset) * 0.1;
      const z = p.r * Math.sin(p.phi) * Math.sin(p.theta);
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.06 + Math.sin(t + p.offset) * 0.02);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <coneGeometry args={[1, 2, 3]} />
      <meshPhysicalMaterial color="#67B346" roughness={0.3} metalness={0.1} emissive="#3a8a28" emissiveIntensity={0.4} />
    </instancedMesh>
  );
}

export function Globe3D() {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    if (ringsRef.current) {
      ringsRef.current.rotation.z = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#a8ffcc" />
      <pointLight position={[-3, 0, 3]} intensity={1.5} color="#005CB9" />

      <Float speed={0.8} floatIntensity={0.3}>
        <group>
          {/* globe */}
          <mesh ref={globeRef}>
            <sphereGeometry args={[0.85, 32, 32]} />
            <meshPhysicalMaterial
              color="#1a7fca"
              roughness={0.2}
              metalness={0.15}
              transmission={0.25}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* continent-like patches */}
          {[
            { pos: [0.4, 0.3, 0.65] as [number, number, number], s: 0.22 },
            { pos: [-0.5, 0.1, 0.6] as [number, number, number], s: 0.18 },
            { pos: [0.1, -0.5, 0.68] as [number, number, number], s: 0.15 },
            { pos: [0.65, -0.2, 0.45] as [number, number, number], s: 0.13 },
          ].map((c, i) => (
            <mesh key={i} position={c.pos}>
              <sphereGeometry args={[c.s, 8, 8]} />
              <meshPhysicalMaterial color="#67B346" roughness={0.5} metalness={0.1} emissive="#3a8a28" emissiveIntensity={0.2} />
            </mesh>
          ))}

          {/* orbit rings */}
          <group ref={ringsRef}>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[1.2, 0.015, 8, 64]} />
              <meshPhysicalMaterial color="#67B346" roughness={0.3} transparent opacity={0.6} />
            </mesh>
            <mesh rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
              <torusGeometry args={[1.4, 0.01, 8, 64]} />
              <meshPhysicalMaterial color="#005CB9" roughness={0.3} transparent opacity={0.4} />
            </mesh>
          </group>

          <LeafParticles />
        </group>
      </Float>
    </>
  );
}
