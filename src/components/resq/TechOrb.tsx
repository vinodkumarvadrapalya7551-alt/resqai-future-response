import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Text, Icosahedron } from "@react-three/drei";

const NODES = [
  "TensorFlow", "PyTorch", "React", "Three.js", "Node.js",
  "Python", "GPT-4", "MongoDB", "Redis", "Kafka",
  "Docker", "K8s",
];

function OrbScene() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) {
      g.current.rotation.y += dt * 0.15;
      g.current.rotation.x += dt * 0.05;
    }
  });

  const nodes = useMemo(() => {
    return NODES.map((name, i) => {
      const phi = Math.acos(-1 + (2 * i) / NODES.length);
      const theta = Math.sqrt(NODES.length * Math.PI) * phi;
      const r = 2.3;
      return {
        name,
        pos: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ),
      };
    });
  }, []);

  return (
    <group ref={g}>
      <Icosahedron args={[1.3, 1]}>
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.5}
          wireframe
        />
      </Icosahedron>
      <Icosahedron args={[0.9, 0]}>
        <meshStandardMaterial
          color="#0A1428"
          emissive="#00D4A5"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Icosahedron>

      {nodes.map((n, i) => (
        <group key={i} position={n.pos}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00F5FF" />
          </mesh>
          <Text
            position={[0, 0.22, 0]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {n.name}
          </Text>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, -n.pos.x, -n.pos.y, -n.pos.z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00F5FF" transparent opacity={0.25} />
          </line>
        </group>
      ))}
    </group>
  );
}

export default function TechOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00F5FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#00D4A5" />
        <OrbScene />
      </Suspense>
    </Canvas>
  );
}
