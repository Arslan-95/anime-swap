import React, { ChangeEvent, MouseEvent } from 'react';
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

interface SInputWrapperProps {
  focused: boolean;
}

const SInputWrapper = styled.div<SInputWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 17px;
  background: #282828;
  border-radius: 12px;
  box-shadow: ${({ focused, theme }) =>
    focused ? `0px 0px 0px 1px ${theme.colors.main}` : 'none'};

  transition: box-shadow 0.3s;
`;

const SInput = styled.input`
  flex: 1 1 auto;
  border: none;
  background: none;
  outline: none;

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

const SIndicatorWrapper = styled.div`
  pointer-events: all;
`;

const Input: React.FC<InputProps> = ({
  type = 'amount',
  placeholder,
  value,
  onChange,
  onFocus,
  className,
  indicator,
  locked,
}) => {
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const indicatorWrapper = React.useRef<HTMLDivElement>(null);

  let inputMode: InputMode = 'text';

  switch (type) {
    case 'amount':
    case 'number':
      inputMode = 'decimal';
      break;
    default:
      break;
  }

  const getFineValue = (value: InputValue) => {
    if (type === 'amount' && typeof value === 'string') {
      return formatCurrencyAmount(value);
    }

    return value;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = getFineValue(e.target.value);
    e.target.value = newValue;

    onChange && onChange(newValue);
  };

  const handleFocus = () => {
    setFocused(true);

    onFocus && onFocus();
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current) return;
    if (!indicatorWrapper.current) return;
    if (indicatorWrapper.current.contains(e.target as Node)) return;
    if (inputRef.current === document.activeElement) return;

    inputRef.current.focus();
  };

  return (
    <SInputWrapper focused={focused} onClick={handleWrapperClick}>
      <SInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode={inputMode}
        className={className}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        disabled={locked}
      />
      <SIndicatorWrapper ref={indicatorWrapper}>{indicator}</SIndicatorWrapper>
    </SInputWrapper>
  );
};

export default Input;
