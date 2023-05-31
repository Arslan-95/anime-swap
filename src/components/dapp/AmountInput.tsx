import React from 'react';
import { Input } from '@components/ui';
import { InputProps, InputValue } from '@components/ui/types';
import _ from 'lodash';

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
};

const AmountInput = ({
  value,
  onChange,
  ...otherProps
}: Props | InputProps) => {
  const valueInString = _.isNumber(value) ? String(value) : '';
  const [inputValue, setInputValue] = React.useState<InputValue>(valueInString);

  React.useEffect(() => {
    if (valueInString === inputValue) return;

    onChange(inputValue ? Number(inputValue) : undefined);
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
