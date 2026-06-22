import { useCallback } from 'react';
import { Product } from '@/types';
import { MachineBody } from './MachineBody';
import { Products } from './Products';
import { FallingProduct } from './FallingProduct';
import { Dispenser } from './Dispenser';
import { useSound } from '@/hooks/useSound';
import { InventoryState } from '@/types';

interface VendingMachineProps {
  inventory: InventoryState;
  onPreview: (product: Product) => void;
  isPurchasing: boolean;
  fallingProduct: Product | null;
  onFallingComplete: () => void;
  showDispenserGlow: boolean;
}

export const VendingMachine = ({
  inventory,
  onPreview,
  isPurchasing,
  fallingProduct,
  onFallingComplete,
  showDispenserGlow,
}: VendingMachineProps) => {
  const { playButtonClick, playDropSound } = useSound();

  const handleProductClick = useCallback((product: Product) => {
    if (isPurchasing || fallingProduct) return;
    playButtonClick();
    onPreview(product);
  }, [isPurchasing, fallingProduct, playButtonClick, onPreview]);

  const handleFallingComplete = useCallback(() => {
    playDropSound();
    onFallingComplete();
  }, [playDropSound, onFallingComplete]);

  return (
    <group>
      <MachineBody />
      <Products inventory={inventory} onProductClick={handleProductClick} />
      <Dispenser hasProduct={showDispenserGlow} />
      <FallingProduct product={fallingProduct} onComplete={handleFallingComplete} />
    </group>
  );
};
