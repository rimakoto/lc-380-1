import { useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Product } from '@/types';
import { MACHINE_CONFIG } from '@/data/products';
import { Html } from '@react-three/drei';

interface ProductItemProps {
  product: Product;
  available: boolean;
  onClick: (product: Product) => void;
}

export const ProductItem = ({ product, available, onClick }: ProductItemProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { rows, rowSpacing, colSpacing, depth, dispenserHeight, topSignHeight, displayAreaTopMargin, displayAreaBottomMargin } = MACHINE_CONFIG;

  const displayAreaTop = MACHINE_CONFIG.height / 2 - topSignHeight - displayAreaTopMargin;
  const displayAreaBottom = -MACHINE_CONFIG.height / 2 + dispenserHeight + displayAreaBottomMargin;

  const totalHeight = displayAreaTop - displayAreaBottom;
  const actualRowSpacing = totalHeight / (rows - 0.5);

  const x = (product.col - 1.5) * colSpacing;
  const y = displayAreaTop - product.row * actualRowSpacing - actualRowSpacing * 0.25;
  const z = depth / 2 - 0.35;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (available) onClick(product);
  };

  const scale = hovered && available ? 1.12 : 1;

  if (!available) {
    return (
      <group position={[x, y, z]}>
        <mesh>
          <boxGeometry args={[0.7, 0.15, 0.02]} />
          <meshStandardMaterial color={'#424242'} transparent opacity={0.5} />
        </mesh>
        <Html
          position={[0, -0.3, 0.02]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
        >
          <div className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400 font-bold whitespace-nowrap">
            已售罄
          </div>
        </Html>
      </group>
    );
  }

  return (
    <group
      ref={meshRef}
      position={[x, y, z]}
      scale={scale}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
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
          <mesh position={[0, 0.36, 0]}>
            <torusGeometry args={[0.12, 0.025, 16, 32]} />
            <meshStandardMaterial color={'#A0A0A0'} metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ) : (
        <group>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.7, 0.25]} />
            <meshStandardMaterial color={product.color} metalness={0.1} roughness={0.75} />
          </mesh>
          {[-0.22, -0.11, 0, 0.11, 0.22].map((py, i) => (
            <mesh key={i} position={[0, py * 0.7, 0.13]} rotation={[0, 0, (i % 2 === 0 ? 0.15 : -0.15)]}>
              <boxGeometry args={[0.55, 0.015, 0.01]} />
              <meshStandardMaterial color={product.color} metalness={0.1} roughness={0.8} />
            </mesh>
          ))}
        </group>
      )}

      <Html
        position={[0, -0.55, 0.15]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none', zIndex: 1 }}
      >
        <div
          className={`px-2 py-0.5 rounded-md font-bold text-sm whitespace-nowrap shadow-lg transition-all duration-200 ${
            hovered ? 'scale-110 ring-2 ring-yellow-400' : ''
          }`}
          style={{ backgroundColor: product.labelColor, color: product.color }}
        >
          ¥{product.price.toFixed(1)}
        </div>
      </Html>

      {hovered && (
        <Html
          position={[0, 0.7, 0.15]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none', zIndex: 2 }}
        >
          <div className="px-3 py-1 rounded-lg bg-black/80 text-white font-bold text-xs whitespace-nowrap backdrop-blur-sm">
            {product.name}
          </div>
        </Html>
      )}
    </group>
  );
};
