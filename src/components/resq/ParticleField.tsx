import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Rain() {
  const ref = useRef<THREE.Points>(null);
  const { positions, count } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return { positions, count };
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const geom = ref.current.geometry;
    const arr = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= dt * (2 + (i % 5));
      if (arr[i * 3 + 1] < -8) arr[i * 3 + 1] = 12;
    }
    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00F5FF" size={0.04} transparent opacity={0.55} />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
      <Rain />
    </Canvas>
  );
}
