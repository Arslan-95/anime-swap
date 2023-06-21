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
    isApproved,
    handleAmountChange,
    handleFocusFrom,
    handleFromTokenChange,
    handleToTokenChange,
    transaction,
    swap,
    approve,
  } = useSwap();

  const showApproveButton = !isApproved && fromAmount;

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
      {showApproveButton && <button onClick={approve}>Approve</button>}
      {!showApproveButton && (
        <button disabled={!transaction} onClick={swap}>
          Swap
        </button>
      )}
    </SwapBox>
  );
};

export default Swap;
