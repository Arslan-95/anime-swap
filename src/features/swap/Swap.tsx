import React from 'react';
import styled from 'styled-components';
import { Box, Button, CustomButton, UnderlinedButton } from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';
import useSwap from './useSwap';
import { ReactComponent as SwitchIcon } from '@assets/icons/switch-kunai.svg';
import { LOADING_STATUS } from '@utils/types';

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

const SwitchButton = styled(CustomButton)`
  margin: 32px auto;
`;

const SUnderlinedButton = styled(UnderlinedButton)`
  margin: 0 0 10px auto;
`;

const STokenPrice = styled.span`
  margin: 18px 0 0 auto;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: 500;
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
    loading,
    approve,
    switchTokens,
    swapRate,
  } = useSwap();

  const showApproveButton = !isApproved && fromAmount;

  return (
    <SwapBox>
      <h2>SWAP</h2>
      <SUnderlinedButton size="xsmall">Balance: 200 USDT</SUnderlinedButton>
      <CurrencyAmount
        value={fromAmount}
        onChange={handleAmountChange}
        placeholder="0.00"
        token={fromToken}
        onTokenChange={handleFromTokenChange}
        onFocus={handleFocusFrom}
      />
      <SwitchButton onClick={switchTokens} commonEffects>
        <SwitchIcon />
      </SwitchButton>
      <CurrencyAmount
        value={toAmount}
        placeholder="0.00"
        token={toToken}
        onTokenChange={handleToTokenChange}
        inputLocked
      />
      <STokenPrice>
        {Number(swapRate.toFixed(5))} {fromToken?.symbol} per {toToken?.symbol}
      </STokenPrice>
      {showApproveButton ? (
        <ActionButton
          onClick={approve}
          disabled={loading === LOADING_STATUS.LOADING}
        >
          Approve
        </ActionButton>
      ) : (
        <ActionButton
          disabled={!transaction || loading === LOADING_STATUS.LOADING}
          onClick={swap}
        >
          Swap
        </ActionButton>
      )}
    </SwapBox>
  );
};

export default Swap;
