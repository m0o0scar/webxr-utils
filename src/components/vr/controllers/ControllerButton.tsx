import { useFrame } from '@react-three/fiber';
import { XRController } from '@react-three/xr';
import { FC, useRef } from 'react';

export interface ControllerButtonProps {
  controller?: XRController;
  buttonIndex: number;
  onTouched?: () => void;
  onUntouched?: () => void;
  onPressed?: () => void;
  onReleased?: () => void;
  label?: string;
  debug?: boolean;
}

export const ControllerButton: FC<ControllerButtonProps> = ({
  controller,
  buttonIndex,
  onTouched,
  onUntouched,
  onPressed,
  onReleased,
  label,
  debug,
}) => {
  const wasTouched = useRef(false);
  const wasPressed = useRef(false);

  const name = label || `${controller?.inputSource.handedness || 'unknown'} controller button #${buttonIndex}`;

  useFrame(() => {
    const button = controller?.inputSource.gamepad?.buttons[buttonIndex];
    if (!button) return;

    const { touched: isTouched = false, pressed: isPressed = false } = button;

    // touched
    if (isTouched && !wasTouched.current) {
      if (debug) console.log(`[${name}] touched`);
      wasTouched.current = true;
      onTouched?.();
    }

    // untouch
    else if (!isTouched && wasTouched.current) {
      if (debug) console.log(`[${name}] untouched`);
      wasTouched.current = false;
      onUntouched?.();
    }

    // pressed
    else if (isPressed && !wasPressed.current) {
      if (debug) console.log(`[${name}] pressed`);
      wasPressed.current = true;
      onPressed?.();
    }

    // released
    else if (!isPressed && wasPressed.current) {
      if (debug) console.log(`[${name}] released`);
      wasPressed.current = false;
      onReleased?.();
    }
  });

  return null;
};
