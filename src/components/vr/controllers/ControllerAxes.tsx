import { useFrame } from '@react-three/fiber';
import { XRController } from '@react-three/xr';
import { FC, useRef } from 'react';
import { Vector2 } from 'three';

const threshold = 0.9;

export interface ControllerAxesProps {
  controller?: XRController;
  xAxesIndex: number;
  yAxesIndex: number;
  onChanged?: (value: Vector2) => void;
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

export const ControllerAxes: FC<ControllerAxesProps> = ({
  controller,
  xAxesIndex,
  yAxesIndex,
  onChanged,
  onLeft,
  onRight,
  onUp,
  onDown,
}) => {
  const previousValue = useRef(new Vector2(0, 0));

  useFrame(() => {
    const x = controller?.inputSource.gamepad?.axes[xAxesIndex];
    const y = controller?.inputSource.gamepad?.axes[yAxesIndex];
    if (x === undefined || y === undefined) return;

    const { x: previousX, y: previousY } = previousValue.current;

    if (previousX < threshold && x >= threshold) onRight?.();
    else if (previousX > -threshold && x <= -threshold) onLeft?.();
    if (previousY < threshold && y >= threshold) onDown?.();
    else if (previousY > -threshold && y <= -threshold) onUp?.();

    if (x !== previousX || y !== previousY) {
      previousValue.current.set(x, y);
      onChanged?.(new Vector2(x, y));
    }
  });

  return null;
};
