import { useController } from '@react-three/xr';
import React, { FC } from 'react';
import { Vector2 } from 'three';

import { ControllerAxes } from './ControllerAxes';
import { ControllerButton } from './ControllerButton';

export interface OculusTouchControllerProps {
  // triggers
  onLeftTriggerTouched?: () => void;
  onLeftTriggerUntouched?: () => void;
  onLeftTriggerPressed?: () => void;
  onLeftTriggerReleased?: () => void;
  onRightTriggerTouched?: () => void;
  onRightTriggerUntouched?: () => void;
  onRightTriggerPressed?: () => void;
  onRightTriggerReleased?: () => void;

  // grips
  onLeftGripTouched?: () => void;
  onLeftGripUntouched?: () => void;
  onLeftGripPressed?: () => void;
  onLeftGripReleased?: () => void;
  onRightGripTouched?: () => void;
  onRightGripUntouched?: () => void;
  onRightGripPressed?: () => void;
  onRightGripReleased?: () => void;

  // thumbsticks
  onLeftThumbstickTouched?: () => void;
  onLeftThumbstickUntouched?: () => void;
  onLeftThumbstickPressed?: () => void;
  onLeftThumbstickReleased?: () => void;
  onLeftThumbstickChanged?: (value: Vector2) => void;
  onLeftThumbstickLeft?: () => void;
  onLeftThumbstickRight?: () => void;
  onLeftThumbstickUp?: () => void;
  onLeftThumbstickDown?: () => void;
  onRightThumbstickTouched?: () => void;
  onRightThumbstickUntouched?: () => void;
  onRightThumbstickPressed?: () => void;
  onRightThumbstickReleased?: () => void;
  onRightThumbstickChanged?: (value: Vector2) => void;
  onRightThumbstickLeft?: () => void;
  onRightThumbstickRight?: () => void;
  onRightThumbstickUp?: () => void;
  onRightThumbstickDown?: () => void;

  // thumbrest
  onLeftThumbrestTouched?: () => void;
  onLeftThumbrestUntouched?: () => void;
  onRightThumbrestTouched?: () => void;
  onRightThumbrestUntouched?: () => void;

  // A button
  onATouched?: () => void;
  onAUntouch?: () => void;
  onAPressed?: () => void;
  onAReleased?: () => void;

  // B button
  onBTouched?: () => void;
  onBUntouch?: () => void;
  onBPressed?: () => void;
  onBReleased?: () => void;

  // X button
  onXTouched?: () => void;
  onXUntouch?: () => void;
  onXPressed?: () => void;
  onXReleased?: () => void;

  // Y button
  onYTouched?: () => void;
  onYUntouch?: () => void;
  onYPressed?: () => void;
  onYReleased?: () => void;

  debug?: boolean;
}

export const OculusTouchController: FC<OculusTouchControllerProps> = ({ debug, ...props }) => {
  const leftController = useController('left');
  const rightController = useController('right');

  const profile = leftController?.inputSource.profiles[0] || rightController?.inputSource.profiles[0] || '';
  const isMatchingProfile = ['oculus-touch-v3', 'oculus-touch-v2', 'oculus-touch'].includes(profile);
  if (!isMatchingProfile) return null;

  return (
    <>
      {/* triggers */}
      <ControllerButton
        controller={leftController}
        buttonIndex={0}
        label="Left Trigger"
        debug={debug}
        onTouched={props.onLeftTriggerTouched}
        onUntouched={props.onLeftTriggerUntouched}
        onPressed={props.onLeftTriggerPressed}
        onReleased={props.onLeftTriggerReleased}
      />
      <ControllerButton
        controller={rightController}
        buttonIndex={0}
        label="Right Trigger"
        debug={debug}
        onTouched={props.onRightTriggerTouched}
        onUntouched={props.onRightTriggerUntouched}
        onPressed={props.onRightTriggerPressed}
        onReleased={props.onRightTriggerReleased}
      />

      {/* grips */}
      <ControllerButton
        controller={leftController}
        buttonIndex={1}
        label="Left Grip"
        debug={debug}
        onTouched={props.onLeftGripTouched}
        onUntouched={props.onLeftGripUntouched}
        onPressed={props.onLeftGripPressed}
        onReleased={props.onLeftGripReleased}
      />
      <ControllerButton
        controller={rightController}
        buttonIndex={1}
        label="Right Grip"
        debug={debug}
        onTouched={props.onRightGripTouched}
        onUntouched={props.onRightGripUntouched}
        onPressed={props.onRightGripPressed}
        onReleased={props.onRightGripReleased}
      />

      {/* thumbsticks */}
      <ControllerButton
        controller={leftController}
        buttonIndex={3}
        label="Left Thumbstick"
        debug={debug}
        onTouched={props.onLeftThumbstickTouched}
        onUntouched={props.onLeftThumbstickUntouched}
        onPressed={props.onLeftThumbstickPressed}
        onReleased={props.onLeftThumbstickReleased}
      />
      <ControllerButton
        controller={rightController}
        buttonIndex={3}
        label="Right Thumbstick"
        debug={debug}
        onTouched={props.onRightThumbstickTouched}
        onUntouched={props.onRightThumbstickUntouched}
        onPressed={props.onRightThumbstickPressed}
        onReleased={props.onRightThumbstickReleased}
      />
      <ControllerAxes
        controller={leftController}
        xAxesIndex={2}
        yAxesIndex={3}
        label="Left Thumbstick"
        debug={debug}
        onChanged={props.onLeftThumbstickChanged}
        onLeft={props.onLeftThumbstickLeft}
        onRight={props.onLeftThumbstickRight}
        onUp={props.onLeftThumbstickUp}
        onDown={props.onLeftThumbstickDown}
      />
      <ControllerAxes
        controller={rightController}
        xAxesIndex={2}
        yAxesIndex={3}
        label="Right Thumbstick"
        debug={debug}
        onChanged={props.onRightThumbstickChanged}
        onLeft={props.onRightThumbstickLeft}
        onRight={props.onRightThumbstickRight}
        onUp={props.onRightThumbstickUp}
        onDown={props.onRightThumbstickDown}
      />

      {/* thumbrest */}
      <ControllerButton
        controller={leftController}
        buttonIndex={6}
        label="Left Thumbrest"
        debug={debug}
        onTouched={props.onLeftThumbrestTouched}
        onUntouched={props.onLeftThumbrestUntouched}
      />
      <ControllerButton
        controller={rightController}
        buttonIndex={6}
        label="Right Thumbrest"
        debug={debug}
        onTouched={props.onRightThumbrestTouched}
        onUntouched={props.onRightThumbrestUntouched}
      />

      {/* A button */}
      <ControllerButton
        controller={rightController}
        buttonIndex={4}
        label="A"
        debug={debug}
        onTouched={props.onATouched}
        onUntouched={props.onAUntouch}
        onPressed={props.onAPressed}
        onReleased={props.onAReleased}
      />

      {/* B button */}
      <ControllerButton
        controller={rightController}
        buttonIndex={5}
        label="B"
        debug={debug}
        onTouched={props.onBTouched}
        onUntouched={props.onBUntouch}
        onPressed={props.onBPressed}
        onReleased={props.onBReleased}
      />

      {/* X button */}
      <ControllerButton
        controller={leftController}
        buttonIndex={4}
        label="X"
        debug={debug}
        onTouched={props.onXTouched}
        onUntouched={props.onXUntouch}
        onPressed={props.onXPressed}
        onReleased={props.onXReleased}
      />

      {/* Y button */}
      <ControllerButton
        controller={leftController}
        buttonIndex={5}
        label="Y"
        debug={debug}
        onTouched={props.onYTouched}
        onUntouched={props.onYUntouch}
        onPressed={props.onYPressed}
        onReleased={props.onYReleased}
      />
    </>
  );
};
