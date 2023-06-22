import styled from 'styled-components';
import { AmountInput, CurrencySelect } from '.';
import type { OnTokenChange } from './types';
import type { InputProps } from '@components/ui/types';
import Token from '@utils/classes/Token';

interface CurrencyAmountProps extends InputProps {
  token: Token | null;
  onTokenChange: OnTokenChange;
  inputLocked?: boolean;
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
  onFocus,
  inputLocked,
}: CurrencyAmountProps) => {
  return (
    <SCurrencyAmount>
      <AmountInput
        value={value}
        onChange={onChange}
        indicator={<CurrencySelect token={token} onChange={onTokenChange} />}
        onFocus={onFocus}
        locked={inputLocked}
      />
    </SCurrencyAmount>
  );
};

export default CurrencyAmount;
