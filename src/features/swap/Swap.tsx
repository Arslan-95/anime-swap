import React from 'react';
import { AmountInput } from '@components/dapp';
import { Box } from '@components/ui';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
};

const SwapBox = styled(Box)`
  width: 100%;
  max-width: 500px;

  h2 {
    text-align: center;
  }
`;

const Swap: React.FC<Props> = () => {
  const [fromAmount, setFirstAmount] = React.useState<number>();

  const handleFirstAmountChange = (value: number) => {
    setFirstAmount(value);
  };

  return (
    <SwapBox>
      <h2>SWAP</h2>
      <AmountInput
        value={fromAmount}
        onChange={handleFirstAmountChange}
        placeholder="0.00"
      />
    </SwapBox>
  );
};

export default Swap;
