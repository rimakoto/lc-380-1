import { useState, useCallback } from 'react';
import { PRODUCTS } from '@/data/products';
import { InventoryState } from '@/types';

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryState>(() => {
    const initial: InventoryState = {};
    PRODUCTS.forEach(p => { initial[p.id] = true; });
    return initial;
  });

  const removeProduct = useCallback((productId: string) => {
    setInventory(prev => ({ ...prev, [productId]: false }));
  }, []);

  const restock = useCallback(() => {
    const full: InventoryState = {};
    PRODUCTS.forEach(p => { full[p.id] = true; });
    setInventory(full);
  }, []);

  const isAvailable = useCallback((productId: string) => {
    return inventory[productId] ?? false;
  }, [inventory]);

  return { inventory, removeProduct, restock, isAvailable };
};
