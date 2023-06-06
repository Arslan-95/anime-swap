import { ReactNode } from 'react';

export type InputValue = string | number | undefined;

export interface InputProps {
  type?: 'number' | 'amount' | 'text';
  placeholder?: string;
  value: InputValue;
  onChange: (value: InputValue) => void;
  className?: string;
  indicator?: ReactNode;
}

export type { IModalProps } from './Modal.tsx';
