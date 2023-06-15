import React, { MouseEvent, useContext } from 'react';
import { Modal } from '@components/ui';
import { Search } from '@components/ui';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext } from '@services/types';
import { Address } from 'wagmi';
import Token from '@utils/classes/Token';

interface Props {
  isOpen: boolean;
  isVisible?: boolean;
  onChange: (token: Token) => void;
  onClose: () => void;
}

const SelectTokenModal = ({ isOpen, isVisible, onClose, onChange }: Props) => {
  const { tokensList, tokens } = useContext(WagmiContext) as IWagmiContext;
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isVisible={isVisible}>
      <Search onChange={handleSearch} />
      {tokensList.map((token) => {
        return (
          <div
            key={token.address}
            data-address={token.address}
            onClick={handleTokenChange}
          >
            {token.address}
          </div>
        );
      })}
    </Modal>
  );
};

export default SelectTokenModal;
