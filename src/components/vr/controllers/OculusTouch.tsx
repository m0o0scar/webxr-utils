import { useController } from '@react-three/xr';
import React, { FC } from 'react';

import { ControllerAxes } from './ControllerAxes';
import { ControllerButton } from './ControllerButton';

export interface OculusTouchControllerProps {
  onATouched?: () => void;
  onAUntouch?: () => void;
  onAPressed?: () => void;
  onAReleased?: () => void;
  onBTouched?: () => void;
  onBUntouch?: () => void;
  onBPressed?: () => void;
  onBReleased?: () => void;
}

export const OculusTouchController: FC<OculusTouchControllerProps> = props => {
  const rightController = useController('right');

  const isMatchingController = rightController?.inputSource.profiles[0] === 'oculus-touch-v3';

  if (!isMatchingController) return null;

  return (
    <>
      {/* A button */}
      <ControllerButton
        controller={rightController}
        buttonIndex={4}
        onTouched={props.onATouched || (() => console.log('A touched'))}
        onUntouched={props.onAUntouch || (() => console.log('A untouch'))}
        onPressed={props.onAPressed || (() => console.log('A pressed'))}
        onReleased={props.onAReleased || (() => console.log('A released'))}
      />

      {/* B button */}
      <ControllerButton
        controller={rightController}
        buttonIndex={5}
        onTouched={props.onBTouched || (() => console.log('B touched'))}
        onUntouched={props.onBUntouch || (() => console.log('B untouch'))}
        onPressed={props.onBPressed || (() => console.log('B pressed'))}
        onReleased={props.onBReleased || (() => console.log('B released'))}
      />

      {/* Trigger */}
      <ControllerButton
        controller={rightController}
        buttonIndex={0}
        onTouched={() => console.log('trigger touched')}
        onUntouched={() => console.log('trigger untouch')}
        onPressed={() => console.log('trigger pressed')}
        onReleased={() => console.log('trigger released')}
      />

      {/* Thumbstick */}
      <ControllerAxes
        controller={rightController}
        xAxesIndex={2}
        yAxesIndex={3}
        // onChanged={console.log}
        onLeft={() => console.log('left')}
        onRight={() => console.log('right')}
        onUp={() => console.log('up')}
        onDown={() => console.log('down')}
      />
    </>
  );
};
