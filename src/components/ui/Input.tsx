import React, { ChangeEvent } from 'react';
import { formatCurrencyAmount } from '@utils/formatCurrencyAmount';
import styled from 'styled-components';
import { InputProps, InputValue } from './types';

type InputMode =
  | 'text'
  | 'decimal'
  | 'search'
  | 'email'
  | 'tel'
  | 'url'
  | 'none'
  | 'numeric'
  | undefined;

const SInput = styled.input`
  width: auto;
  background: none;
  border: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

const Input: React.FC<InputProps> = ({
  type = 'amount',
  placeholder,
  value,
  onChange,
  className,
}) => {
  let inputType = 'text';
  let inputMode: InputMode = 'text';

  switch (type) {
    case 'amount':
      inputMode = 'decimal';
      break;
    case 'number':
      inputType = 'number';
      break;
  }

  const getFineValue = (value: InputValue) => {
    if (type === 'amount' && typeof value === 'string') {
      return formatCurrencyAmount(value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = getFineValue(e.target.value);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <SInput
      type={inputType}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      inputMode={inputMode}
      className={className}
    />
  );
};

export default Input;
