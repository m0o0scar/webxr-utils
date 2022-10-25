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
  label?: string;
  debug?: boolean;
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
  label,
  debug,
}) => {
  const previousValue = useRef(new Vector2(0, 0));

  const name =
    label || `${controller?.inputSource.handedness || 'unknown'} controller axes [${xAxesIndex}, #${yAxesIndex}]`;

  useFrame(() => {
    const x = controller?.inputSource.gamepad?.axes[xAxesIndex];
    const y = controller?.inputSource.gamepad?.axes[yAxesIndex];
    if (x === undefined || y === undefined) return;

    const { x: previousX, y: previousY } = previousValue.current;

    // x axes
    if (previousX < threshold && x >= threshold) {
      if (debug) console.log(`[${name}] right`);
      onRight?.();
    } else if (previousX > -threshold && x <= -threshold) {
      if (debug) console.log(`[${name}] left`);
      onLeft?.();
    }

    // y axes
    if (previousY < threshold && y >= threshold) {
      if (debug) console.log(`[${name}] down`);
      onDown?.();
    } else if (previousY > -threshold && y <= -threshold) {
      if (debug) console.log(`[${name}] up`);
      onUp?.();
    }

    // value changed
    if (x !== previousX || y !== previousY) {
      if (debug) console.log(`[${name}] changed to [${x.toFixed(4)}, ${y.toFixed(4)}]`);
      previousValue.current.set(x, y);
      onChanged?.(new Vector2(x, y));
    }
  });

  return null;
};
