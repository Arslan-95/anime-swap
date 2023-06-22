import React from 'react';
import styled from 'styled-components';
import { Box, Button } from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';
import useSwap from './useSwap';

type Props = {
  children?: React.ReactNode;
};

const SwapBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;

  h2 {
    text-align: center;
  }
`;

const ActionButton = styled(Button)`
  width: 180px;
  margin: 30px auto 0;
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
      {showApproveButton ? (
        <ActionButton onClick={approve}>Approve</ActionButton>
      ) : (
        <ActionButton disabled={!transaction} onClick={swap}>
          Swap
        </ActionButton>
      )}
    </SwapBox>
  );
};

export default Swap;
