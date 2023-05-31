import styled from 'styled-components';
import { AmountInput } from '.';
import { AmountInputProps } from './types';

interface CurrencyAmountProps extends AmountInputProps {
  currency: string;
}

const SCurrencyAmount = styled.div``;

const CurrencyAmount = ({ value, onChange }: CurrencyAmountProps) => {
  return (
    <SCurrencyAmount>
      <AmountInput value={value} onChange={onChange} />
    </SCurrencyAmount>
  );
};

export default CurrencyAmount;
