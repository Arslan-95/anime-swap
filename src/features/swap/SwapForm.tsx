import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  Box,
  Button,
  CustomButton,
  UnderlinedButton,
  NumberFormat,
  Form,
} from '@components/ui';
import CurrencyAmount from '@components/dapp/CurrencyAmount';
import useSwap from './useSwap';
import { ReactComponent as SwitchIcon } from '@assets/icons/switch-kunai.svg';
import { LOADING_STATUS } from '@utils/types';
import _ from 'lodash';
import { ConnectWalletButton } from '@components/dapp';
import { useAppSelector } from '@hooks/index';

type ISwapFormProps = {
  className?: string;
  children?: ReactNode;
};

const actionButtonCss = css`
  width: 180px;
  margin: 30px auto 0;
`;

const SwapBox = styled(Box)`
  width: auto;
  max-width: 500px;

  h2 {
    margin-bottom: 38px;
    text-align: center;
  }
`;

const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  ${actionButtonCss}
`;
const SConnectWalletButton = styled(ConnectWalletButton)`
  ${actionButtonCss}
`;

const SwapForm = ({ className }: ISwapFormProps) => {
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

  const fromTokenBalance = fromToken?.balance;
  const balanceIsGreater = Number(fromTokenBalance) >= Number(fromAmount);

  const showApproveButton = !isApproved && fromAmount;
  const isLoading = loading === LOADING_STATUS.LOADING;
  const swapDisabled = !balanceIsGreater || !transaction || isLoading;

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
          buttonType="submit"
        />
      );
    }

    if (showApproveButton) {
      return (
        <ActionButton
          onClick={approve}
          disabled={isLoading}
          buttonType="submit"
        >
          Approve
        </ActionButton>
      );
    }

    return (
      <ActionButton disabled={swapDisabled} onClick={swap} buttonType="submit">
        Swap
      </ActionButton>
    );
  };

  return (
    <SwapBox className={className}>
      <SForm>
        <h2>SWAP</h2>
        {_.isString(fromTokenBalance) && (
          <SUnderlinedButton size="xsmall" onClick={handleBalanceClick}>
            Balance:&nbsp;
            <NumberFormat
              number={fromTokenBalance}
              symbol={fromToken?.symbol}
            />
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
          <NumberFormat number={swapRate} symbol={fromToken?.symbol} />
          &nbsp;per&nbsp;
          {toToken?.symbol}
        </STokenPrice>
        {actionButtonRender()}
      </SForm>
    </SwapBox>
  );
};

export default SwapForm;
