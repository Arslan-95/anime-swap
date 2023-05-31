import React from 'react';
import { Input } from '@components/ui';
import { InputProps, InputValue } from '@components/ui/types';

type Props = {
  value: number | undefined;
  onChange: (value: number) => void;
};

const AmountInput = ({
  value,
  onChange,
  ...otherProps
}: Props | InputProps) => {
  const [inputValue, setInputValue] = React.useState<InputValue>(
    String(value || '')
  );

  React.useEffect(() => {
    onChange(Number(inputValue));
  }, [inputValue]);

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
