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
}

export type { IModalProps } from './Modal.tsx';
