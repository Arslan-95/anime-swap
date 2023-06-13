import React from 'react';
import styled from 'styled-components';
import type { OnTokenChange } from './types';
import Token from '@utils/classes/Token';
import selectAngleIcon from '@assets/icons/select-angle.svg';
import SelectTokenModal from './SelectTokenModal';

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
  border-radius: 50%;
`;

const SSelectAngleIcon = styled.img`
  width: 13px;
  height: 13px;
`;

const CurrencySelect = ({ token }: CurrencySelectProps) => {
  const [isModal, setIsModal] = React.useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <SCurrencySelect onClick={() => setIsModal(true)}>
        <STokenIcon src={token.logoURI} alt={token.symbol} />
        <STokenSymbol>{token.symbol}</STokenSymbol>
        <SSelectAngleIcon src={selectAngleIcon} alt="select" />
      </SCurrencySelect>
      <SelectTokenModal isOpen={isModal} onClose={closeModal} />
    </>
  );
};

export default CurrencySelect;
