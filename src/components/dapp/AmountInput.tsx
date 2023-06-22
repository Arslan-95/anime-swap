import { Input } from '@components/ui';
import { InputProps } from '@components/ui/types';

const AmountInput = ({ value, onChange, ...otherProps }: InputProps) => {
  return (
    <Input type="amount" value={value} onChange={onChange} {...otherProps} />
  );
};

export default AmountInput;
