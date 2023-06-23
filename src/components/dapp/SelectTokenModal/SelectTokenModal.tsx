import React, { MouseEvent, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Search } from '@components/ui';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext } from '@services/types';
import { Address } from 'wagmi';
import { OnTokenChange } from '../types';
import Token from '@utils/classes/Token';
import CommonTokens from './CommonTokens';

interface ISelectTokenModalProps {
  selectedToken?: Token | null;
  isOpen: boolean;
  isVisible?: boolean;
  onChange: OnTokenChange;
  onClose: () => void;
}

const SModalContent = styled.div`
  max-width: 100%;
`;

const SSearch = styled(Search)`
  border: 1px solid ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.light};
`;

const SCommonTokens = styled(CommonTokens)`
  margin: 16px 0;
`;

const SelectTokenModal = ({
  selectedToken,
  isOpen,
  isVisible,
  onClose,
  onChange,
}: ISelectTokenModalProps) => {
  const {
    tokensList,
    tokens,
    accountAddress,
    chainId,
    // updateBalances,
    balances,
  } = useContext(WagmiContext) as IWagmiContext;
  const [, setSearchParams] = React.useState('');
  const [, startTransition] = React.useTransition();

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchParams(value);
    });
  };

  // React.useEffect(() => {
  // }, [searchParams]);

  const handleTokenChange = (e: MouseEvent<HTMLDivElement>) => {
    const address = e.currentTarget.getAttribute('data-address') as Address;
    const token = tokens[address] || null;

    if (token) {
      onChange(token);
    }

    onClose();
  };

  useEffect(() => {
    // updateBalances(Object.keys(tokens) as Address[]);
  }, [accountAddress, chainId]);

  return (
    <Modal
      isOpen={isOpen}
      title="Select Token"
      onClose={onClose}
      isVisible={isVisible}
    >
      <SModalContent>
        <SSearch onChange={handleSearch} wrapperColor="light" />
        <SCommonTokens
          tokens={tokensList.slice(0, 5)}
          selectedToken={selectedToken}
        />
        {tokensList.map((token) => {
          return (
            <div
              key={token.address}
              data-address={token.address}
              onClick={handleTokenChange}
            >
              <h2>{balances[token.address] || 0}</h2>
              {token.address}
            </div>
          );
        })}
      </SModalContent>
    </Modal>
  );
};

export default SelectTokenModal;
