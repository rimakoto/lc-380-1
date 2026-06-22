import { PRODUCTS, MACHINE_CONFIG } from '@/data/products';
import { Product } from '@/types';
import { ProductItem } from './Product';

interface ProductsProps {
  inventory: Record<string, boolean>;
  onProductClick: (product: Product) => void;
}

export const Products = ({ inventory, onProductClick }: ProductsProps) => {
  const { rows, depth, dispenserHeight, topSignHeight, displayAreaTopMargin, displayAreaBottomMargin } = MACHINE_CONFIG;

  const displayAreaTop = MACHINE_CONFIG.height / 2 - topSignHeight - displayAreaTopMargin;
  const displayAreaBottom = -MACHINE_CONFIG.height / 2 + dispenserHeight + displayAreaBottomMargin;

  const totalHeight = displayAreaTop - displayAreaBottom;
  const actualRowSpacing = totalHeight / (rows - 0.5);

  return (
    <group position={[0, MACHINE_CONFIG.height / 2, 0]}>
      {Array.from({ length: rows }).map((_, rowIdx) => {
        const shelfY = displayAreaTop - rowIdx * actualRowSpacing - actualRowSpacing * 0.5;
        return (
          <mesh key={`shelf-${rowIdx}`} position={[0, shelfY, depth / 2 - 0.6]} receiveShadow>
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
