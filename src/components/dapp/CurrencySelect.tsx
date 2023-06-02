import { OnTokenChange } from './types';
import usdtIcon from '@assets/usdt.svg';
import selectAngleIcon from '@assets/icons/select-angle.svg';
import styled from 'styled-components';
import Token from '@utils/classes/Token';

interface CurrencySelectProps {
  token: Token;
  onChange: OnTokenChange;
}

const SCurrencySelect = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  img {
    pointer-events: none;
  }

  &:not(:active):hover {
    opacity: 0.85;
  }
`;

const STokenSymbol = styled.span`
  margin: 0 4px 0 10px;
`;

const STokenIcon = styled.img`
  object-fit: contain;
  height: 37px;
  width: 37px;
`;

const SSelectAngleIcon = styled.img`
  width: 13px;
  height: 13px;
`;

const CurrencySelect = ({ token, onChange }: CurrencySelectProps) => {
  return (
    <SCurrencySelect>
      <STokenIcon src={usdtIcon} alt={token.symbol} />
      <STokenSymbol>{token.symbol}</STokenSymbol>
      <SSelectAngleIcon src={selectAngleIcon} alt="select" />
    </SCurrencySelect>
  );
};

export default CurrencySelect;
