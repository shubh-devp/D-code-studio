import React, { useRef, useMemo, Suspense, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export const mouseWorld = { x: 0, y: 0 };

// Pre-allocate a single vector to avoid per-frame allocations
const _vec3 = new THREE.Vector3();

function CrystalMesh({ isMobile }) {
  const meshRef = useRef();
  // Reduced detail levels: mobile=2, tablet=3, desktop=4 (was 3/5)
  const detail = isMobile ? 2 : 4;
  const positionsRef = useRef(null);
  const clock = useRef(0);

  useEffect(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    positionsRef.current = Float32Array.from(geo.attributes.position.array);
  }, [detail]);

  useFrame((_, delta) => {
    if (!meshRef.current || !positionsRef.current) return;
    clock.current += delta;
    const t = clock.current;

    // Smooth mouse tracking without overriding rotation on mobile
    if (!isMobile) {
      meshRef.current.rotation.x += (mouseWorld.y * 0.4 - meshRef.current.rotation.x) * 0.04;
      meshRef.current.rotation.y += (mouseWorld.x * 0.4 - meshRef.current.rotation.y) * 0.02;
    } else {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x += delta * 0.06;
    }
    meshRef.current.rotation.z += delta * 0.04;

    const pos = meshRef.current.geometry.attributes.position;
    const orig = positionsRef.current;
    const count = pos.count;

    // Only deform on desktop/tablet; skip on mobile for perf
    if (!isMobile) {
      for (let i = 0; i < count; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
        const ox = orig[ix], oy = orig[iy], oz = orig[iz];
        const noise =
          Math.sin(ox * 1.5 + t * 0.9) *
          Math.cos(oy * 1.5 + t * 0.7) *
          Math.sin(oz + t * 0.5);
        const scale = 1 + noise * 0.12;
        pos.setXYZ(i, ox * scale, oy * scale, oz * scale);
      }
      pos.needsUpdate = true;
      // computeVertexNormals is expensive — only call every ~6 frames
      if (Math.round(t * 60) % 6 === 0) {
        meshRef.current.geometry.computeVertexNormals();
      }
    }
  });

  return (
    <Float
  speed={isMobile ? 0.8 : 1.2}
  rotationIntensity={isMobile ? 0.05 : 0.1}
  floatIntensity={isMobile ? 0.15 : 0.3}
>
      <mesh
  ref={meshRef}
  scale={isMobile ? 0.85 : 1}
>
        <icosahedronGeometry
  args={[isMobile ? 1.2 : 1.8, detail]}
/>
        <meshPhysicalMaterial
          color="#7c4dff"
          emissive="#1a0038"
          emissiveIntensity={0.15}
          metalness={0.05}
          roughness={0.0}
          transmission={isMobile ? 0.7 : 0.88}
          thickness={2.4}
          ior={1.6}
          envMapIntensity={1.8}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function WireShell({ isMobile }) {
  const ref = useRef();
  const detail = isMobile ? 1 : 2;
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.09;
    ref.current.rotation.x -= delta * 0.04;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry
  args={[isMobile ? 1.6 : 2.3, detail]}
/>
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function Particles({ isMobile }) {
  // Reduced particle counts: mobile=120, desktop=400 (was 250/600)
  const count = isMobile ? 120 : 400;
  const ref = useRef();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      sz[i] = Math.random() * 0.025 + 0.008;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    // Use elapsedTime directly (read-only); avoid multiplying by delta unnecessarily
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.rotation.x = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function CursorLight({ isMobile }) {
  const lightRef = useRef();
  const { viewport } = useThree();
  useFrame(() => {
    if (!lightRef.current || isMobile) return;
    lightRef.current.position.x +=
      (mouseWorld.x * viewport.width * 0.5 - lightRef.current.position.x) * 0.08;
    lightRef.current.position.y +=
      (mouseWorld.y * viewport.height * 0.5 - lightRef.current.position.y) * 0.08;
  });
  return (
    <pointLight
      ref={lightRef}
      color="#06B6D4"
      intensity={isMobile ? 6 : 12}
      distance={14}
      decay={2}
      position={[0, 0, 4]}
    />
  );
}

export function ThreeDBackground({ isMobile }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
<Canvas
  camera={{
    position: [0, 0, isMobile ? 8 : 5.5],
    fov: isMobile ? 75 : 55,
  }}
  gl={{
    antialias: !isMobile,
    alpha: true,
    powerPreference: isMobile ? "low-power" : "high-performance",
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.4,
  }}
  dpr={isMobile ? [1, 1.5] : [1, 2]}
  frameloop="always"
  performance={{ min: 0.5 }}
  style={{ background: "transparent" }}
>
        <Suspense fallback={null}>
          <ambientLight color="#1a1040" intensity={2.5} />
          <directionalLight color="#9FAEF8" intensity={3.5} position={[5, 8, 6]} />
          <pointLight
  color="#8B5CF6"
  intensity={isMobile ? 5 : 8}
  position={[-5, -3, 3]}
  distance={isMobile ? 9 : 12}
/>
          <CursorLight isMobile={isMobile} />
          <CrystalMesh isMobile={isMobile} />
          <WireShell isMobile={isMobile} />
          <Particles isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
