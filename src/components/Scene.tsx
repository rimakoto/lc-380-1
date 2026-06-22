import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ReactNode } from 'react';

interface SceneProps {
  children: ReactNode;
}

export const Scene = ({ children }: SceneProps) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 9], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#1a1a2e']} />

      <fog attach="fog" args={['#1a1a2e', 15, 35]} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 3, -3]} intensity={0.6} color={'#82B1FF'} />
      <pointLight position={[4, 2, -4]} intensity={0.4} color={'#FF8A65'} />
      <rectAreaLight
        width={8}
        height={6}
        intensity={1.5}
        position={[0, 4, 3]}
        color={'#FFFFFF'}
      />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={'#0f0f1a'} metalness={0.6} roughness={0.5} />
      </mesh>

      <mesh position={[0, 5, -5]} receiveShadow>
        <planeGeometry args={[30, 15]} />
        <meshStandardMaterial color={'#1a1a2e'} />
      </mesh>

      {children}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={15}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.2}
        enableDamping
        dampingFactor={0.08}
      />

      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
};
