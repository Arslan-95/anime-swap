import React from 'react';
import styled from 'styled-components';
import { Box } from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';
import useSwap from './useSwap';

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
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    handleAmountChange,
    handleFocusFrom,
    handleFromTokenChange,
    handleToTokenChange,
  } = useSwap();

  return (
    <SwapBox>
      <h2>SWAP</h2>
      <CurrencyAmount
        value={fromAmount}
        onChange={handleAmountChange}
        placeholder="0.00"
        token={fromToken}
        onTokenChange={handleFromTokenChange}
        onFocus={handleFocusFrom}
      />
      <br />
      <CurrencyAmount
        value={toAmount}
        placeholder="0.00"
        token={toToken}
        onTokenChange={handleToTokenChange}
        inputLocked
      />
    </SwapBox>
  );
};

export default Swap;
