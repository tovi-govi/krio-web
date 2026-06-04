import { useMemo, useRef } from "react";
import { Center, Float, GLTF, HemisphereLight, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group, Material, Mesh, Texture } from "three";
import { MeshPhysicalMaterial } from "three";
import bottle200mlUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_200ml.glb?url";
import bottle500mlUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_500ml.glb?url";
import bottle1LUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_1litre.glb?url";
import bottle2LUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_2litre.glb?url";
import bottle20LUrl from "@/assets/krio_h2o_5_models_pack/krio_h2o_20litre.glb?url";
import label20Url from "@/assets/krio_h2o_5_models_pack/textures/label_20litre.png";

const BOTTLE_CENTER: [number, number, number] = [-0.5, -0.02, 0];
const BOTTLE_ROTATION: [number, number, number] = [-1.4, 0, 0.08];
const BOTTLE_ROTATION_SPEED = 0.28;
const LOCKED_POLAR_ANGLE = 1.45;
const PRESENTATION_BASE_SHADOW = "thin neutral presentation base shadow";

type TexturedMaterial = Material & { map?: Texture | null };

function flipMaterialText(material: Material) {
  const texturedMaterial = material as TexturedMaterial;

  if (!texturedMaterial.map) {
    return material;
  }

  const flippedMaterial = material.clone() as TexturedMaterial;
  flippedMaterial.map = texturedMaterial.map.clone();
  flippedMaterial.map.repeat.y *= -1;
  flippedMaterial.map.offset.y = 1 - flippedMaterial.map.offset.y;
  flippedMaterial.map.needsUpdate = true;
  flippedMaterial.needsUpdate = true;

  return flippedMaterial;
}

interface BottleModelProps {
  modelUrl: string;
  scale?: number;
  rotation?: [number, number, number];
}

export function BottleModel({
  modelUrl,
  scale = 0.45,
  rotation = BOTTLE_ROTATION,
}: BottleModelProps) {
  const gltf = useGLTF(modelUrl) as GLTF;
  const spinRef = useRef<Group>(null);
  const waterMaterialRef = useRef<MeshPhysicalMaterial | null>(null);
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((obj) => {
      if (obj.name === PRESENTATION_BASE_SHADOW) {
        obj.visible = false;
        return;
      }

      if (obj.type === "Mesh") {
        const mesh = obj as Mesh;
        obj.castShadow = true;
        obj.receiveShadow = true;

        // Apply improved material handling for a more premium plastic look
        const applyMaterial = (mat: Material) => {
          const lname = (mesh.name || "").toLowerCase();
          const isLabelMesh = lname.includes("label") || lname.includes("sticker") || lname.includes("wrap");
          const isWaterMesh = lname.includes("water");
          const m = flipMaterialText(mat);

          // If this is the 20L model, apply target materials for glass, cap, label and water volume
          if (modelUrl === bottle20LUrl) {
            if (isWaterMesh) {
              const waterMat = new MeshPhysicalMaterial({
                color: 0x84c7ff,
                transparent: true,
                opacity: 0.72,
                transmission: 0.92,
                roughness: 0.05,
                metalness: 0,
                clearcoat: 0.15,
                clearcoatRoughness: 0.1,
                ior: 1.33,
                reflectivity: 0.35,
              });
              waterMaterialRef.current = waterMat;
              return waterMat as unknown as Material;
            }

            if (lname.includes("bottle") || lname.includes("body") || lname.includes("jug") || lname.includes("container") || lname.includes("shell")) {
              const baseMap = (m as any).map || null;
              return new MeshPhysicalMaterial({
                transparent: true,
                transmission: 0.92,
                roughness: 0.12,
                metalness: 0,
                clearcoat: 0.18,
                ior: 1.333,
                envMapIntensity: 1.2,
                color: 0xffffff,
                map: baseMap,
              }) as unknown as Material;
            }

            if (lname.includes("cap") || lname.includes("neck") || lname.includes("lid")) {
              return new MeshPhysicalMaterial({
                color: 0x12a09b,
                roughness: 0.18,
                metalness: 0.05,
                clearcoat: 0.06,
              }) as unknown as Material;
            }

            if (isLabelMesh) {
              return m;
            }
          }

          return m;
        };

        const newMat = Array.isArray(mesh.material)
          ? mesh.material.map(applyMaterial)
          : applyMaterial(mesh.material);

        mesh.material = newMat;
      }
    });
    return clone;
  }, [gltf.scene]);

  // Load label texture (we'll only apply it for the 20L model)
  const labelTex = useTexture(label20Url);
  if (modelUrl === bottle20LUrl && labelTex) {
    clonedScene.traverse((obj) => {
      if (obj.type === "Mesh") {
        const mesh = obj as Mesh;
        const lname = (mesh.name || "").toLowerCase();
        if (lname.includes("label") || lname.includes("sticker") || lname.includes("wrap")) {
          const mat = mesh.material as any;
          try {
            mat.map = labelTex;
            mat.transparent = true;
            mat.needsUpdate = true;
          } catch (e) {
            // ignore if material can't be updated
          }
        }
      }
    });
  }

  useFrame((state, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * BOTTLE_ROTATION_SPEED;
    }

    if (waterMaterialRef.current) {
      const t = state.clock.getElapsedTime();
      waterMaterialRef.current.thickness = 0.14 + Math.sin(t * 1.3) * 0.015;
      waterMaterialRef.current.ior = 1.33 + Math.sin(t * 0.6) * 0.007;
      waterMaterialRef.current.clearcoatRoughness = 0.09 + Math.sin(t * 0.8) * 0.008;
    }
  });

  return (
    <group position={BOTTLE_CENTER} scale={scale}>
      <ambientLight intensity={0.55} />
      <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.28} />
      <directionalLight position={[4, 8, 5]} intensity={1.15} />
      <directionalLight position={[-3, 2, -2]} intensity={0.65} />

      <Float
        speed={1.05}
        floatIntensity={0.3}
        rotationIntensity={0}
        floatingRange={[0.07, 0.12]}
      >
        <group ref={spinRef}>
          <group rotation={rotation}>
            <Center>
              <primitive object={clonedScene} />
            </Center>
          </group>
        </group>
      </Float>

      <OrbitControls
        enableRotate={true}
        enablePan={false}
        enableZoom={false}
        target={BOTTLE_CENTER}
        rotateSpeed={10.5}
        minPolarAngle={LOCKED_POLAR_ANGLE}
        maxPolarAngle={LOCKED_POLAR_ANGLE}
        enableDamping
        dampingFactor={0.005}
      />
    </group>
  );
}

