import { MACHINE_CONFIG } from '@/data/products';

export const Dispenser = ({ hasProduct }: { hasProduct: boolean }) => {
  const { width, height, depth, dispenserHeight, frameThickness } = MACHINE_CONFIG;

  return (
    <group position={[0, height / 2, 0]}>
      <mesh position={[0, -height / 2 + dispenserHeight / 2 + 0.2, depth / 2 + 0.12]}>
        <meshStandardMaterial
          color={'#00E676'}
          emissive={'#00E676'}
          emissiveIntensity={hasProduct ? 1.2 : 0.15}
          transparent
          opacity={0.35}
        />
        <boxGeometry args={[width - frameThickness * 4, 0.04, 0.02]} />
      </mesh>

      <mesh position={[0, -height / 2 + dispenserHeight * 0.55 + 0.1, depth / 2 - 0.5]}>
        <boxGeometry args={[width - frameThickness * 4.5, 0.08, depth - 0.6]} />
        <meshStandardMaterial color={'#1A1A2E'} metalness={0.5} roughness={0.6} />
      </mesh>
    </group>
  );
};
