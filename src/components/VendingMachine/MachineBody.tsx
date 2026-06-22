import { MACHINE_CONFIG } from '@/data/products';

export const MachineBody = () => {
  const { width, height, depth, frameThickness, dispenserHeight } = MACHINE_CONFIG;
  const bodyColor = '#D32F2F';
  const frameColor = '#FAFAFA';
  const innerColor = '#1A1A2E';

  return (
    <group position={[0, height / 2, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={bodyColor} metalness={0.3} roughness={0.5} />
      </mesh>

      <mesh position={[0, 0, depth / 2 + 0.01]} receiveShadow>
        <boxGeometry args={[width - frameThickness * 2, height - frameThickness * 2, 0.02]} />
        <meshStandardMaterial color={frameColor} metalness={0.2} roughness={0.4} />
      </mesh>

      <mesh position={[0, dispenserHeight / 2 + 0.1, depth / 2 + 0.02]}>
        <boxGeometry args={[width - frameThickness * 2.5, dispenserHeight * 0.7, 0.02]} />
        <meshStandardMaterial color={'#000000'} />
      </mesh>

      <mesh position={[0, dispenserHeight / 2 + 0.1, depth / 2 + 0.1]}>
        <boxGeometry args={[width - frameThickness * 3, dispenserHeight * 0.85, 0.15]} />
        <meshStandardMaterial color={innerColor} />
      </mesh>

      <mesh position={[0, (height - frameThickness * 2) / 2 - 0.45, depth / 2 + 0.02]} receiveShadow>
        <meshPhysicalMaterial
          color={'#FFFFFF'}
          transmission={0.95}
          thickness={0.1}
          roughness={0.05}
          metalness={0}
          ior={1.5}
          transparent
          opacity={0.3}
        />
        <boxGeometry args={[
          width - frameThickness * 3,
          height - dispenserHeight - frameThickness * 3.5,
          0.05
        ]} />
      </mesh>

      <mesh position={[0, height / 2 - 0.3, depth / 2 + 0.05]}>
        <boxGeometry args={[width - frameThickness * 4, 0.5, 0.1]} />
        <meshStandardMaterial color={'#1A237E'} emissive={'#3D5AFE'} emissiveIntensity={0.6} />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh key={`light-${side}`} position={[side * (width / 2 - 0.3), height / 2 - 1.5, -depth / 2 + 0.3]}>
          <boxGeometry args={[0.1, height - 3, 0.1]} />
          <meshStandardMaterial color={'#FFFFFF'} emissive={'#82B1FF'} emissiveIntensity={1.5} />
        </mesh>
      ))}

      <mesh position={[0, -height / 2 + 0.05, 0]} receiveShadow>
        <boxGeometry args={[width + 0.2, 0.1, depth + 0.2]} />
        <meshStandardMaterial color={'#212121'} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};
