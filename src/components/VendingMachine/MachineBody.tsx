import { MACHINE_CONFIG } from '@/data/products';

export const MachineBody = () => {
  const { width, height, depth, frameThickness, dispenserHeight, topSignHeight } = MACHINE_CONFIG;
  const bodyColor = '#D32F2F';
  const frameColor = '#FAFAFA';
  const innerColor = '#1A1A2E';

  const displayTop = height / 2 - topSignHeight - frameThickness;
  const displayBottom = -height / 2 + dispenserHeight + frameThickness;
  const displayHeight = displayTop - displayBottom;
  const displayCenterY = displayBottom + displayHeight / 2;

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

      <mesh
        position={[0, displayCenterY, depth / 2 + 0.04]}
        raycast={() => null}
      >
        <boxGeometry args={[
          width - frameThickness * 3,
          displayHeight - frameThickness * 0.5,
          0.02
        ]} />
        <meshPhysicalMaterial
          color={'#E8F0FE'}
          transmission={0.98}
          thickness={0.02}
          roughness={0.08}
          metalness={0}
          ior={1.2}
          transparent
          opacity={0.1}
          clearcoat={0.1}
          clearcoatRoughness={0.3}
        />
      </mesh>

      <mesh position={[0, height / 2 - topSignHeight / 2 - frameThickness * 0.5, depth / 2 + 0.05]}>
        <boxGeometry args={[width - frameThickness * 4, topSignHeight * 0.7, 0.1]} />
        <meshStandardMaterial color={'#1A237E'} emissive={'#3D5AFE'} emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0, -height / 2 + dispenserHeight / 2, depth / 2 + 0.02]}>
        <boxGeometry args={[width - frameThickness * 2.5, dispenserHeight * 0.85, 0.02]} />
        <meshStandardMaterial color={'#000000'} />
      </mesh>

      <mesh position={[0, -height / 2 + dispenserHeight / 2, depth / 2 + 0.1]}>
        <boxGeometry args={[width - frameThickness * 3, dispenserHeight * 0.75, 0.15]} />
        <meshStandardMaterial color={innerColor} />
      </mesh>

      <pointLight position={[0, displayCenterY, depth / 2 - 0.15]} intensity={1.0} color={'#FFF8E1'} distance={6} />
      {[-1.3, 1.3].map((px) => (
        <pointLight key={`inner-${px}`} position={[px, displayCenterY + 0.3, depth / 2 - 0.2]} intensity={0.6} color={'#FFFFFF'} distance={5} />
      ))}

      {[-1, 1].map((side) => (
        <mesh key={`light-${side}`} position={[side * (width / 2 - 0.3), 0, -depth / 2 + 0.3]}>
          <boxGeometry args={[0.1, height - 3, 0.1]} />
          <meshStandardMaterial color={'#FFFFFF'} emissive={'#82B1FF'} emissiveIntensity={1.0} />
        </mesh>
      ))}

      <mesh position={[0, -height / 2 + 0.05, 0]} receiveShadow>
        <boxGeometry args={[width + 0.2, 0.1, depth + 0.2]} />
        <meshStandardMaterial color={'#212121'} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};
