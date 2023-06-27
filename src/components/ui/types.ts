import { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from 'react';
import { IColors } from '@features/theme/types.ts';

export type Sizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type InputValue = string;

export interface InputProps {
  type?: 'number' | 'amount' | 'text';
  placeholder?: string;
  value?: InputValue;
  onChange?: (value: InputValue) => void;
  className?: string;
  indicator?: ReactNode;
  onFocus?: () => void;
  locked?: boolean;
  wrapperColor?: keyof IColors;
}

export type { IModalProps } from './Modal.tsx';

export interface IButton {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: Sizes;
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
