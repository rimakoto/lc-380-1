export interface Product {
  id: string;
  name: string;
  price: number;
  type: 'drink' | 'snack';
  color: string;
  labelColor: string;
  row: number;
  col: number;
}

export type InventoryState = Record<string, boolean>;

export interface FallingState {
  productId: string | null;
  isAnimating: boolean;
}

export interface PreviewState {
  product: Product | null;
  isOpen: boolean;
}
