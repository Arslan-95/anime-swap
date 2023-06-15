import React from 'react';
import { Input } from '@components/ui';
import { InputValue } from '@components/ui/types';
import { AmountInputProps } from './types';
import _ from 'lodash';

const AmountInput = ({ value, onChange, ...otherProps }: AmountInputProps) => {
  const valueInString = _.isNumber(value) ? String(value) : '';
  const [inputValue, setInputValue] = React.useState<InputValue>(valueInString);

  React.useEffect(() => {
    if (valueInString === inputValue) return;

    onChange && onChange(inputValue ? Number(inputValue) : undefined);
  }, [inputValue]);

  React.useEffect(() => {
    if (valueInString === inputValue) return;

    setInputValue(valueInString);
  }, [value]);

  return (
    <Input
      type="amount"
      value={inputValue}
      onChange={setInputValue}
      {...otherProps}
    />
  );
};

export default AmountInput;
