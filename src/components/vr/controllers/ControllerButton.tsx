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
}

export const ControllerButton: FC<ControllerButtonProps> = ({
  controller,
  buttonIndex,
  onTouched,
  onUntouched,
  onPressed,
  onReleased,
}) => {
  const wasTouched = useRef(false);
  const wasPressed = useRef(false);

  useFrame(() => {
    const button = controller?.inputSource.gamepad?.buttons[buttonIndex];
    if (!button) return;

    const { touched: isTouched = false, pressed: isPressed = false } = button;

    // touched
    if (isTouched && !wasTouched.current) {
      wasTouched.current = true;
      onTouched?.();
    }

    // untouch
    else if (!isTouched && wasTouched.current) {
      wasTouched.current = false;
      onUntouched?.();
    }

    // pressed
    else if (isPressed && !wasPressed.current) {
      wasPressed.current = true;
      onPressed?.();
    }

    // released
    else if (!isPressed && wasPressed.current) {
      wasPressed.current = false;
      onReleased?.();
    }
  });

  return null;
};
