/* eslint-disable react-hooks/immutability -- useFrame mutates three.js objects by design */
import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Lightformer, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { mouseWorld, scrollState } from "../state/pointer";

// GPU-side vertex displacement injected into the physical material.
// Replaces the per-frame CPU vertex loop + computeVertexNormals().
function useDistortMaterial(reduced) {
  return useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#7c4dff"),
      emissive: new THREE.Color("#2a0a55"),
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.9,
      thickness: 2.2,
      ior: 1.55,
      envMapIntensity: 2.4,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    mat.userData.uTime = { value: 0 };
    mat.userData.uAmp = { value: reduced ? 0 : 0.14 };
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = mat.userData.uTime;
      shader.uniforms.uAmp = mat.userData.uAmp;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
           uniform float uTime;
           uniform float uAmp;
           float distort(vec3 p){
             return sin(p.x*1.5 + uTime*0.9) * cos(p.y*1.5 + uTime*0.7) * sin(p.z + uTime*0.5)
                  + 0.5 * sin(p.y*3.0 + uTime*1.3);
           }`
        )
        .replace(
          "#include <begin_vertex>",
          `vec3 transformed = position;
           float d = distort(position);
           transformed *= 1.0 + d * uAmp;`
        )
        .replace(
          "#include <beginnormal_vertex>",
          `vec3 objectNormal = normalize(normal + normal * distort(position) * uAmp * 1.5);`
        );
    };
    return mat;
  }, [reduced]);
}

function CrystalMesh({ isMobile, reduced }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const detail = isMobile ? 4 : 6;
  const material = useDistortMaterial(reduced);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    material.userData.uTime.value = state.clock.elapsedTime;
    const m = meshRef.current;
    const p = scrollState.progress;

    if (!reduced) {
      m.rotation.y += delta * 0.16;
      m.rotation.x += delta * 0.05;
    }
    // Mouse parallax (subtle z tilt; x/y rotation handled by auto-spin)
    m.rotation.z += (mouseWorld.x * 0.2 - m.rotation.z) * 0.02;

    // Scroll reactivity: the crystal drifts, tilts and shrinks as you descend.
    const tx = mouseWorld.x * 0.4 + p * 1.4;
    const ty = mouseWorld.y * 0.3 - p * 0.6;
    groupRef.current.position.x += (tx - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (ty - groupRef.current.position.y) * 0.05;
    const targetScale = 1 - p * 0.25;
    groupRef.current.scale.setScalar(
      groupRef.current.scale.x + (targetScale - groupRef.current.scale.x) * 0.05
    );
    // Emissive intensifies slightly with scroll for a "charging" feel
    material.emissiveIntensity = 0.35 + p * 0.5;
  });

  return (
    <group ref={groupRef}>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.3}>
        <mesh ref={meshRef} material={material}>
          <icosahedronGeometry args={[1.8, detail]} />
        </mesh>
      </Float>
    </group>
  );
}

function WireShell({ reduced }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y -= delta * 0.08;
    ref.current.rotation.x -= delta * 0.035;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.07} depthWrite={false} />
    </mesh>
  );
}

// Glowing wireframe torus knot — bloom turns this into a neon ribbon.
function NeonKnot({ reduced }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    if (!reduced) {
      ref.current.rotation.x += delta * 0.12;
      ref.current.rotation.y += delta * 0.08;
    }
    ref.current.position.z = -4 - scrollState.progress * 3;
  });
  return (
    <mesh ref={ref} position={[3.2, -1.4, -4]} scale={0.9}>
      <torusKnotGeometry args={[1, 0.28, 120, 16]} />
      <meshStandardMaterial
        color="#06B6D4"
        emissive="#06B6D4"
        emissiveIntensity={1.6}
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

// Small glowing accent gems scattered for depth; each catches the bloom pass.
function AccentGems({ isMobile, reduced }) {
  const gems = useMemo(() => {
    const colors = ["#8B5CF6", "#06B6D4", "#A78BFA", "#22D3EE", "#C4B5FD"];
    const n = isMobile ? 4 : 7;
    const rand = (x) => {
      const s = Math.sin(x * 127.1) * 43758.5453;
      return s - Math.floor(s);
    };
    return Array.from({ length: n }, (_, i) => ({
      pos: [(rand(i + 1) - 0.5) * 11, (rand(i + 40) - 0.5) * 7, -2 - rand(i + 80) * 4],
      scale: 0.12 + rand(i + 120) * 0.22,
      color: colors[i % colors.length],
      speed: 0.6 + rand(i + 200),
    }));
  }, [isMobile]);

  return (
    <group>
      {gems.map((g, i) => (
        <Float key={i} speed={reduced ? 0 : g.speed} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={g.pos} scale={g.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={g.color} emissive={g.color} emissiveIntensity={1.8} roughness={0.2} metalness={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Particles({ isMobile, reduced }) {
  const count = isMobile ? 220 : 550;
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rand = (n) => {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand(i + 1) - 0.5) * 20;
      pos[i * 3 + 1] = (rand(i + 101) - 0.5) * 14;
      pos[i * 3 + 2] = (rand(i + 201) - 0.5) * 10 - 3;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.rotation.x = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a78bfa" size={0.02} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

function CursorLight() {
  const lightRef = useRef();
  const { viewport } = useThree();
  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x += (mouseWorld.x * viewport.width * 0.5 - lightRef.current.position.x) * 0.08;
    lightRef.current.position.y += (mouseWorld.y * viewport.height * 0.5 - lightRef.current.position.y) * 0.08;
  });
  return <pointLight ref={lightRef} color="#06B6D4" intensity={14} distance={16} decay={2} position={[0, 0, 4]} />;
}

// Camera drifts with the cursor and slowly dollies/orbits as the page scrolls.
function CameraRig({ reduced }) {
  useFrame((state, delta) => {
    const cam = state.camera;
    const p = scrollState.progress;
    const tx = (reduced ? 0 : mouseWorld.x * 0.4) + Math.sin(p * Math.PI) * 0.6;
    const ty = (reduced ? 0 : mouseWorld.y * 0.3) + p * 0.4;
    const tz = 5.5 + p * 1.5;
    const k = Math.min(1, delta * 2);
    cam.position.x += (tx - cam.position.x) * k;
    cam.position.y += (ty - cam.position.y) * k;
    cam.position.z += (tz - cam.position.z) * k;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function Effects({ isMobile }) {
  if (isMobile) return null;
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom intensity={0.85} luminanceThreshold={0.18} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0006, 0.0006]} radialModulation modulationOffset={0.4} />
      <Vignette eskil={false} offset={0.2} darkness={0.75} />
    </EffectComposer>
  );
}

function Scene({ isMobile, reduced }) {
  return (
    <>
      <ambientLight color="#1a1040" intensity={1.8} />
      <directionalLight color="#B8C4FF" intensity={2.8} position={[5, 8, 6]} />
      <pointLight color="#8B5CF6" intensity={6} position={[-5, -3, 3]} distance={14} decay={2} />
      <CursorLight />

      <Environment resolution={isMobile ? 64 : 128} frames={1}>
        <color attach="background" args={["#05060d"]} />
        <Lightformer intensity={2.4} color="#8B5CF6" position={[-4, 3, -4]} scale={[6, 6, 1]} />
        <Lightformer intensity={2.0} color="#06B6D4" position={[4, -2, -4]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.2} color="#ffffff" position={[0, 5, 2]} scale={[8, 2, 1]} />
      </Environment>

      <CameraRig reduced={reduced} />
      <CrystalMesh isMobile={isMobile} reduced={reduced} />
      <WireShell reduced={reduced} />
      <NeonKnot reduced={reduced} />
      <AccentGems isMobile={isMobile} reduced={reduced} />
      <Particles isMobile={isMobile} reduced={reduced} />

      <Effects isMobile={isMobile} />
    </>
  );
}

export function ThreeDBackground({ isMobile, reduced = false }) {
  // Feed page scroll into the shared state read by useFrame (no re-renders).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.y = window.scrollY;
        scrollState.progress = h > 0 ? Math.min(1, window.scrollY / h) : 0;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.35;
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} reduced={reduced} />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
