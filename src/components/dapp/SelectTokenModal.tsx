import React from 'react';
import { Modal } from '@components/ui';
import { Search } from '@components/ui';

interface Props {
  isOpen: boolean;
  isVisible?: boolean;
  onClose: () => void;
}

const SelectTokenModal = ({ isOpen, isVisible, onClose }: Props) => {
  const [, setSearchParams] = React.useState('');
  const [, startTransition] = React.useTransition();

  const handleSearch = (value: string) => {
    startTransition(() => {
      setSearchParams(value);
    });
  };

  // React.useEffect(() => {
  // }, [searchParams]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isVisible={isVisible}>
      <Search onChange={handleSearch} />
    </Modal>
  );
};

export default SelectTokenModal;
