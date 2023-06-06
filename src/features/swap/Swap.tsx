import React from 'react';
import styled from 'styled-components';
import { Box } from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';

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

  const handleFirstAmountChange = (value: number | undefined) => {
    setFirstAmount(value);
  };

  return (
    <SwapBox>
      <h2>SWAP</h2>
      <CurrencyAmount
        value={fromAmount}
        onChange={handleFirstAmountChange}
        placeholder="0.00"
        token={{ symbol: 'USDT' }}
        onTokenChange={() => {
          // ...
        }}
      />
    </SwapBox>
  );
};

export default Swap;
