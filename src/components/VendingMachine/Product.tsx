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
  isPreviewOpen: boolean;
}

export const ProductItem = ({ product, available, onClick, isPreviewOpen }: ProductItemProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { rows, colSpacing, depth, dispenserHeight, topSignHeight, displayAreaTopMargin, displayAreaBottomMargin } = MACHINE_CONFIG;

  const displayAreaTop = MACHINE_CONFIG.height / 2 - topSignHeight - displayAreaTopMargin;
  const displayAreaBottom = -MACHINE_CONFIG.height / 2 + dispenserHeight + displayAreaBottomMargin;

  const totalHeight = displayAreaTop - displayAreaBottom;
  const actualRowSpacing = totalHeight / (rows - 0.5);

  const x = (product.col - 1.5) * colSpacing;
  const y = displayAreaTop - product.row * actualRowSpacing - actualRowSpacing * 0.25;
  const z = depth / 2 - 0.05;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (available) onClick(product);
  };

  const scale = hovered && available ? 1.1 : 1;

  if (!available) {
    return (
      <group position={[x, y, z]}>
        <mesh>
          <boxGeometry args={[0.7, 0.15, 0.02]} />
          <meshStandardMaterial color={'#424242'} transparent opacity={0.5} />
        </mesh>
        {!isPreviewOpen && <Html
          position={[0, -0.3, 0.15]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
        >
          <div className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400 font-bold whitespace-nowrap">
            已售罄
          </div>
        </Html>}
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
      <mesh visible={false}>
        <boxGeometry args={[0.75, 0.85, 0.35]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {product.type === 'drink' ? (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.6, 32]} />
            <meshStandardMaterial
              color={product.color}
              metalness={0.3}
              roughness={0.4}
              emissive={product.color}
              emissiveIntensity={0.15}
            />
          </mesh>
          <mesh position={[0, 0.31, 0]}>
            <cylinderGeometry args={[0.26, 0.24, 0.04, 32]} />
            <meshStandardMaterial color={'#D0D0D0'} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.31, 0]}>
            <cylinderGeometry args={[0.24, 0.26, 0.04, 32]} />
            <meshStandardMaterial color={'#D0D0D0'} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <torusGeometry args={[0.1, 0.02, 12, 24]} />
            <meshStandardMaterial color={'#B0B0B0'} metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ) : (
        <group>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.65, 0.22]} />
            <meshStandardMaterial
              color={product.color}
              metalness={0.1}
              roughness={0.7}
              emissive={product.color}
              emissiveIntensity={0.12}
            />
          </mesh>
          {[-0.2, -0.1, 0, 0.1, 0.2].map((py, i) => (
            <mesh key={i} position={[0, py * 0.65, 0.115]} rotation={[0, 0, (i % 2 === 0 ? 0.12 : -0.12)]}>
              <boxGeometry args={[0.5, 0.012, 0.01]} />
              <meshStandardMaterial color={product.color} metalness={0.1} roughness={0.8} />
            </mesh>
          ))}
        </group>
      )}

      {!isPreviewOpen && <Html
        position={[0, -0.55, 0.15]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none', zIndex: -1 }}
      >
        <div
          className={`px-1.5 py-0.5 rounded-md font-bold text-xs whitespace-nowrap shadow-md transition-all duration-200 ${
            hovered ? 'scale-110 ring-2 ring-yellow-400' : ''
          }`}
          style={{ backgroundColor: product.labelColor, color: product.color }}
        >
          ¥{product.price.toFixed(1)}
        </div>
      </Html>}

      {!isPreviewOpen && hovered && (
        <Html
          position={[0, 0.65, 0.15]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none', zIndex: -1 }}
        >
          <div className="px-3 py-1 rounded-lg bg-black/80 text-white font-bold text-xs whitespace-nowrap backdrop-blur-sm">
            {product.name}
          </div>
        </Html>
      )}
    </group>
  );
};
