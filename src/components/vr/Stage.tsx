import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import React from 'react';

import { OculusTouchController } from './controllers/OculusTouch';

const StageContent = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OculusTouchController />
    </>
  );
};

export const Stage = () => {
  return (
    <>
      <VRButton />
      <Canvas className="fixed left-0 right-0 top-0 bottom-0">
        <XR>
          <Controllers rayMaterial={{ opacity: 0 }} />
          <Hands />
          <StageContent />
        </XR>
      </Canvas>
    </>
  );
};
