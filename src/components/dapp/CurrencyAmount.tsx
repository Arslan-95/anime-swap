import styled from 'styled-components';
import { AmountInput, CurrencySelect } from '.';
import { AmountInputProps, OnTokenChange } from './types';
import Token from '@utils/classes/Token';

interface CurrencyAmountProps extends AmountInputProps {
  token: Token;
  onTokenChange: OnTokenChange;
}

const SCurrencyAmount = styled.div`
  display: flex;
  width: 100%;
`;

const CurrencyAmount = ({
  value,
  onChange,
  token,
  onTokenChange,
}: CurrencyAmountProps) => {
  return (
    <SCurrencyAmount>
      <AmountInput
        value={value}
        onChange={onChange}
        indicator={<CurrencySelect token={token} onChange={onTokenChange} />}
      />
    </SCurrencyAmount>
  );
};

export default CurrencyAmount;
