import { IColors } from '@features/theme/types.ts';
import { ReactNode } from 'react';

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
