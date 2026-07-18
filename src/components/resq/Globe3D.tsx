import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

// Deterministic risk zones on the globe (lat/lng in degrees)
const RISK_ZONES = [
  { lat: 34.05, lng: -118.24, level: 0.9, name: "Los Angeles" },
  { lat: 19.43, lng: -99.13, level: 0.7, name: "Mexico City" },
  { lat: -23.55, lng: -46.63, level: 0.6, name: "São Paulo" },
  { lat: 35.68, lng: 139.69, level: 0.95, name: "Tokyo" },
  { lat: 28.61, lng: 77.21, level: 0.85, name: "Delhi" },
  { lat: 41.01, lng: 28.98, level: 0.75, name: "Istanbul" },
  { lat: 1.29, lng: 103.85, level: 0.55, name: "Singapore" },
  { lat: -33.87, lng: 151.21, level: 0.5, name: "Sydney" },
  { lat: 55.75, lng: 37.62, level: 0.65, name: "Moscow" },
  { lat: 6.52, lng: 3.38, level: 0.7, name: "Lagos" },
  { lat: 40.71, lng: -74.0, level: 0.6, name: "New York" },
  { lat: 51.51, lng: -0.13, level: 0.45, name: "London" },
];

function latLngToVec3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.08;
  });

  // Continent dots
  const dots = useMemo(() => {
    const positions: number[] = [];
    const rand = mulberry32(1337);
    for (let i = 0; i < 1400; i++) {
      const u = rand();
      const v = rand();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 2.02;
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
    }
    return new Float32Array(positions);
  }, []);

  const zoneMeshes = useMemo(
    () =>
      RISK_ZONES.map((z) => ({
        pos: latLngToVec3(z.lat, z.lng, 2.05),
        level: z.level,
      })),
    [],
  );

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0A1428"
          emissive="#0a1e3a"
          emissiveIntensity={0.4}
          roughness={0.6}
          metalness={0.3}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.12} />
      </Sphere>

      {/* Continent dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dots, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#00F5FF" size={0.025} transparent opacity={0.85} />
      </points>

      {/* Risk zones */}
      {zoneMeshes.map((z, i) => {
        const color = z.level > 0.75 ? "#FF3B30" : z.level > 0.55 ? "#FFA500" : "#00D4A5";
        return (
          <group key={i} position={z.pos}>
            <mesh>
              <sphereGeometry args={[0.045 + z.level * 0.03, 12, 12]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <PulseRing color={color} />
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.1 + z.level * 0.05, 16, 16]} />
              <meshBasicMaterial color={color} transparent opacity={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* Atmosphere */}
      <Sphere args={[2.25, 48, 48]}>
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.06} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
}

function PulseRing({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(Math.random() * 2);
  useFrame((_, dt) => {
    t.current += dt;
    if (ref.current) {
      const s = 1 + ((t.current * 0.8) % 1.6);
      ref.current.scale.setScalar(s);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        0.6 - ((t.current * 0.5) % 1),
      );
    }
  });
  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.06, 0.09, 32]} />
      <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={1.1} color="#00F5FF" />
        <pointLight position={[-5, -3, -5]} intensity={0.6} color="#FF3B30" />
        <Stars radius={80} depth={40} count={3000} factor={3} fade speed={0.5} />
        <GlobeMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.4}
        />
      </Suspense>
    </Canvas>
  );
}
