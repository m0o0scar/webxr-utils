import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import React, { useEffect } from 'react';

import { Console, useLogs } from './Console';

const StageContent = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <group position={[0, 1.5, -1]}>
        <Console />

        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
    </>
  );
};

export const Stage = () => {
  const { info, warn } = useLogs();

  useEffect(() => {
    info('Stage', 'Stage component mounted');
    warn('Stage', 'This is a test warning');
  }, []);

  return (
    <>
      <VRButton />
      <Canvas className="fixed left-0 right-0 top-0 bottom-0">
        <color attach="background" args={[0.2, 0.2, 0.2]} />
        <XR>
          <Controllers rayMaterial={{ opacity: 0 }} />
          <Hands />
          <StageContent />
        </XR>
      </Canvas>
    </>
  );
};
