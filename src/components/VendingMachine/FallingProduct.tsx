import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Product } from '@/types';
import { MACHINE_CONFIG } from '@/data/products';

interface FallingProductProps {
  product: Product | null;
  onComplete: () => void;
}

export const FallingProduct = ({ product, onComplete }: FallingProductProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const phaseRef = useRef<'idle' | 'falling' | 'rolling' | 'bounce' | 'done'>('idle');

  useEffect(() => {
    if (product) {
      progressRef.current = 0;
      phaseRef.current = 'falling';
    }
  }, [product]);

  useFrame((_, delta) => {
    if (!groupRef.current || !product) return;
    const phase = phaseRef.current;
    if (phase === 'idle' || phase === 'done') return;

    const { rows, rowSpacing, colSpacing, depth, dispenserHeight, height } = MACHINE_CONFIG;

    const startX = (product.col - 1.5) * colSpacing;
    const startY = height / 2 + ((rows - 1 - product.row) * rowSpacing - (rows - 1) * rowSpacing / 2 + dispenserHeight * 0.6 + 0.8);
    const startZ = depth / 2 - 0.35;

    const midZ = 0;
    const endX = 0;
    const endY = dispenserHeight / 2 + 0.1 + 0.15;
    const endZ = depth / 2 - 0.6;

    const speed = 1.4;
    progressRef.current += delta * speed;
    const t = Math.min(progressRef.current, 1);

    if (t < 0.35) {
      const t1 = t / 0.35;
      const ease = 1 - Math.pow(1 - t1, 2);
      groupRef.current.position.x = startX;
      groupRef.current.position.y = startY - (startY - endY - 0.6) * ease;
      groupRef.current.position.z = startZ + (midZ - startZ) * ease;
      groupRef.current.rotation.x = -Math.PI * 1.5 * ease;
    } else if (t < 0.65) {
      const t2 = (t - 0.35) / 0.3;
      const ease = t2 * t2 * (3 - 2 * t2);
      const y0 = endY - 0.6;
      groupRef.current.position.x = startX + (endX + (product.col - 1.5) * 0.2 - startX) * ease;
      groupRef.current.position.y = y0 + Math.sin(t2 * Math.PI) * 0.4;
      groupRef.current.position.z = midZ + (endZ - midZ) * ease;
      groupRef.current.rotation.x = -Math.PI * 1.5 + Math.PI * 2 * ease;
      groupRef.current.rotation.z = (product.col - 1.5) * 0.3 * ease;
    } else if (t < 0.85) {
      const t3 = (t - 0.65) / 0.2;
      const bounceHeight = 0.2 * (1 - t3);
      groupRef.current.position.x = endX + (product.col - 1.5) * 0.2 - (product.col - 1.5) * 0.2 * t3;
      groupRef.current.position.y = endY + bounceHeight;
      groupRef.current.position.z = endZ;
      groupRef.current.rotation.x = Math.PI * 0.5 * (1 - t3);
      groupRef.current.rotation.z = (product.col - 1.5) * 0.3 * (1 - t3);
    } else {
      const t4 = (t - 0.85) / 0.15;
      groupRef.current.position.x = endX;
      groupRef.current.position.y = endY + 0.03 * Math.sin(t4 * Math.PI * 4) * (1 - t4);
      groupRef.current.position.z = endZ;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }

    if (t >= 1 && (phaseRef.current as string) !== 'done') {
      phaseRef.current = 'done';
      setTimeout(onComplete, 300);
    }
  });

  if (!product) return null;

  return (
    <group ref={groupRef} position={[100, 100, 100]}>
      {product.type === 'drink' ? (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.65, 32]} />
            <meshStandardMaterial color={product.color} metalness={0.4} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.33, 0]}>
            <cylinderGeometry args={[0.28, 0.26, 0.05, 32]} />
            <meshStandardMaterial color={'#C0C0C0'} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.33, 0]}>
            <cylinderGeometry args={[0.26, 0.28, 0.05, 32]} />
            <meshStandardMaterial color={'#C0C0C0'} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ) : (
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.7, 0.25]} />
          <meshStandardMaterial color={product.color} metalness={0.1} roughness={0.75} />
        </mesh>
      )}
    </group>
  );
};
