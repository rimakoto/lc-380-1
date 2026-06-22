import { PRODUCTS, MACHINE_CONFIG } from '@/data/products';
import { Product } from '@/types';
import { ProductItem } from './Product';

interface ProductsProps {
  inventory: Record<string, boolean>;
  onProductClick: (product: Product) => void;
}

export const Products = ({ inventory, onProductClick }: ProductsProps) => {
  const { rows, rowSpacing, colSpacing, depth, dispenserHeight } = MACHINE_CONFIG;

  return (
    <group position={[0, MACHINE_CONFIG.height / 2, 0]}>
      {Array.from({ length: rows }).map((_, rowIdx) => {
        const y = (rows - 1 - rowIdx) * rowSpacing - (rows - 1) * rowSpacing / 2 + dispenserHeight * 0.6 + 0.8;
        return (
          <mesh key={`shelf-${rowIdx}`} position={[0, y - 0.5, depth / 2 - 0.2]} receiveShadow>
            <boxGeometry args={[MACHINE_CONFIG.width - MACHINE_CONFIG.frameThickness * 5, 0.05, depth - 0.3]} />
            <meshStandardMaterial color={'#2D2D44'} metalness={0.6} roughness={0.5} />
          </mesh>
        );
      })}

      {PRODUCTS.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          available={inventory[product.id] ?? true}
          onClick={onProductClick}
        />
      ))}
    </group>
  );
};
