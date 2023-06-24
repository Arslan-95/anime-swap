import React from 'react';
import styled from 'styled-components';
import type { OnTokenChange } from './types';
import Token from '@utils/classes/Token';
import selectAngleIcon from '@assets/icons/select-angle.svg';
import { SelectTokenModal } from '.';
import { CustomButton } from '@components/ui';
import TokenIcon from './TokenIcon';

interface CurrencySelectProps {
  token: Token | null;
  onChange: OnTokenChange;
}

const SCurrencySelect = styled(CustomButton)`
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

const SSelectAngleIcon = styled.img`
  width: 13px;
  height: 13px;
`;

const CurrencySelect = ({ token, onChange }: CurrencySelectProps) => {
  const [isModal, setIsModal] = React.useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <SCurrencySelect onClick={() => setIsModal(true)}>
        {token ? (
          <>
            <TokenIcon src={token.logoURI} />
            <STokenSymbol>{token.symbol}</STokenSymbol>
          </>
        ) : (
          <>
            <TokenIcon />
            <STokenSymbol>Empty</STokenSymbol>
          </>
        )}

        <SSelectAngleIcon src={selectAngleIcon} alt="select" />
      </SCurrencySelect>
      <SelectTokenModal
        onChange={onChange}
        isOpen={isModal}
        onClose={closeModal}
        selectedToken={token}
      />
    </>
  );
};

export default CurrencySelect;
