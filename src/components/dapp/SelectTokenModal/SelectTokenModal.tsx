import React, {
  MouseEventHandler,
  useContext,
  useDeferredValue,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { Modal, Search } from '@components/ui';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext } from '@services/types';
import { Address } from 'wagmi';
import { OnTokenChange } from '../types';
import Token from '@utils/classes/Token';
import CommonTokens from './CommonTokens';
import TokenList from './TokenList';
import { IModalProps } from '@components/ui/Modal';
import { useAppSelector } from '@hooks/index';

interface ISelectTokenProps {
  selectedToken?: Token | null;
  onChange?: OnTokenChange;
  onClose: IModalProps['onClose'];
}

type ISelectTokenModalProps = ISelectTokenProps & IModalProps;

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

const SelectToken = ({
  selectedToken,
  onChange,
  onClose,
}: ISelectTokenProps) => {
  const { tokensList, tokens } = useContext(WagmiContext) as IWagmiContext;
  const isDesktop = useAppSelector(({ adaptive }) => adaptive.isDesktop);

  const [searchParams, setSearchParams] = React.useState('');
  const defferedSearchParams = useDeferredValue(searchParams);

  const filteredTokens = useMemo(() => {
    if (!defferedSearchParams) return tokensList;

    return tokensList.filter((token) => {
      const searchRegex = new RegExp(defferedSearchParams, 'gi');
      const isAddress = token.address?.search(searchRegex) !== -1;
      const isSymbol = token.symbol?.search(searchRegex) !== -1;
      const isName = token.name?.search(searchRegex) !== -1;

      return isAddress || isSymbol || isName;
    });
  }, [defferedSearchParams, tokensList]);

  const handleSearch = (value: string) => {
    setSearchParams(value);
  };

  const handleTokenChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const address = e.currentTarget.getAttribute('data-address') as Address;
    const token = tokens[address] || null;

    if (token && onChange) {
      onChange(token);
    }

    onClose();
  };

  return (
    <SModalContent>
      <SSearch
        autoFocus={isDesktop}
        onChange={handleSearch}
        wrapperColor="light"
      />
      <SCommonTokens
        tokens={tokensList.slice(0, 5)}
        selectedToken={selectedToken}
        onChange={handleTokenChange}
      />
      <TokenList
        list={filteredTokens}
        onChange={handleTokenChange}
        selectedToken={selectedToken}
        maxHeight={340}
      />
    </SModalContent>
  );
};

const SelectTokenModal = ({
  isOpen,
  onClose,
  isVisible,
  ...selectTokenProps
}: ISelectTokenModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Select Token"
      onClose={onClose}
      isVisible={isVisible}
    >
      <SelectToken onClose={onClose} {...selectTokenProps} />
    </Modal>
  );
};

export default SelectTokenModal;
