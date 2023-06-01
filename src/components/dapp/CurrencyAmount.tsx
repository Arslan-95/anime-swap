import styled from 'styled-components';
import { AmountInput, CurrencySelect } from '.';
import { AmountInputProps, OnTokenChange, IToken } from './types';

interface CurrencyAmountProps extends AmountInputProps {
  token: IToken;
  onTokenChange: OnTokenChange;
}

const SCurrencyAmount = styled.div`
  display: flex;
  width: 100%;
`;

const CurrencyAmount = ({
  value,
  onChange,
  token = { symbol: 'USDT' },
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
