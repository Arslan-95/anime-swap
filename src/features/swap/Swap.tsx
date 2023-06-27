import React from 'react';
import styled, { css } from 'styled-components';
import {
  Box,
  Button,
  CustomButton,
  UnderlinedButton,
  Number,
} from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';
import useSwap from './useSwap';
import { ReactComponent as SwitchIcon } from '@assets/icons/switch-kunai.svg';
import { LOADING_STATUS } from '@utils/types';
import _ from 'lodash';
import { ConnectWalletButton } from '@components/dapp';
import { useAppSelector } from '@hooks/index';

type Props = {
  children?: React.ReactNode;
};

const SwapBox = styled(Box)`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  h2 {
    margin-bottom: 38px;
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

const actionButtonCss = css`
  width: 180px;
  margin: 30px auto 0;
`;

const ActionButton = styled(Button)`
  ${actionButtonCss}
`;
const SConnectWalletButton = styled(ConnectWalletButton)`
  ${actionButtonCss}
`;

const Swap: React.FC<Props> = () => {
  const isDesktop = useAppSelector(({ adaptive }) => adaptive.isDesktop);
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
    context,
  } = useSwap();

  const showApproveButton = !isApproved && fromAmount;
  const fromTokenBalance = fromToken?.balance;

  const handleBalanceClick = () => {
    if (!fromTokenBalance) return;

    handleAmountChange(fromTokenBalance);
  };

  const actionButtonRender = () => {
    if (!context.isConnected) {
      return (
        <SConnectWalletButton
          title="Connect to wallet"
          connectorId={isDesktop ? 'metaMask' : 'walletConnect'}
        />
      );
    }

    if (showApproveButton) {
      return (
        <ActionButton
          onClick={approve}
          disabled={loading === LOADING_STATUS.LOADING}
        >
          Approve
        </ActionButton>
      );
    }

    return (
      <ActionButton
        disabled={!transaction || loading === LOADING_STATUS.LOADING}
        onClick={swap}
      >
        Swap
      </ActionButton>
    );
  };

  return (
    <SwapBox>
      <h2>SWAP</h2>
      {_.isString(fromTokenBalance) && (
        <SUnderlinedButton size="xsmall" onClick={handleBalanceClick}>
          Balance:&nbsp;
          <Number number={fromTokenBalance} symbol={fromToken?.symbol} />
        </SUnderlinedButton>
      )}
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
        <Number number={swapRate} symbol={fromToken?.symbol} />
        &nbsp;per&nbsp;
        {toToken?.symbol}
      </STokenPrice>
      {actionButtonRender()}
    </SwapBox>
  );
};

export default Swap;
