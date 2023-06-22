import React, { useState, useEffect } from 'react';
import { useAccount, useNetwork, WagmiConfig } from 'wagmi';
import * as inchApi from '@services/1inch/api';
import wagmiConfig from './wagmiConfig';
import { sendTransaction } from '@wagmi/core';
import {
  ApproveToken,
  GetAllowance,
  I1InchTokensData,
  IWagmiContext,
  Swap,
} from '@services/types';
import Token from '@utils/classes/Token';
import { DEFAULT_CHAIN } from '@services/config';

interface IWagmiProviderProps {
  children?: React.ReactNode;
}

interface IWagmiProviderWrapperProps {
  children?: React.ReactNode;
}

export const WagmiContext = React.createContext<IWagmiContext | null>(null);

const WagmiProvider = ({ children }: IWagmiProviderProps) => {
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();
  const [tokens, setTokens] = useState<I1InchTokensData>({});
  const [tokensList, setTokensList] = useState<Token[]>([]);

  const approveToken: ApproveToken = async (tokenAddress, weiAmount) => {
    if (!accountAddress || !chain) return;

    try {
      const transaction = await inchApi.buildTxForApproveTradeWithRouter(
        tokenAddress,
        weiAmount,
        chain.id
      );

      const tx = await sendTransaction(transaction);
      return tx;
    } catch (error) {
      console.log('[approveToken]', error);
    }
  };

  const getAllowance: GetAllowance = async (tokenAddress) => {
    if (!accountAddress || !chain) return '0';

    try {
      const allowance = await inchApi.checkAllowance(
        tokenAddress,
        accountAddress,
        chain.id
      );

      return allowance;
    } catch (error) {
      console.log('[getAllowance]', error);

      return '0';
    }
  };

  const swap: Swap = async (transaction) => {
    if (!accountAddress || !chain) return;

    try {
      const tx = await sendTransaction(transaction.tx);

      return tx;
    } catch (error) {
      console.log('[swap]', error);
    }
  };

  const updateTokens = async () => {
    try {
      const updatedTokens = await inchApi.getTokens(chain?.id || DEFAULT_CHAIN);
      const updatedTokensList = Object.values(updatedTokens);

      setTokens(updatedTokens);
      setTokensList(updatedTokensList);
    } catch (error) {
      console.log('[updateTokens]', error);
    }
  };

  useEffect(() => {
    updateTokens();
  }, [chain]);

  return (
    <WagmiContext.Provider
      value={{
        approveToken,
        getAllowance,
        swap,
        accountAddress,
        chainId: chain?.id,
        tokens,
        tokensList,
      }}
    >
      {children}
    </WagmiContext.Provider>
  );
};

const WagmiProviderWrapper = ({ children }: IWagmiProviderWrapperProps) => (
  <WagmiConfig config={wagmiConfig}>
    <WagmiProvider>{children}</WagmiProvider>
  </WagmiConfig>
);

export default WagmiProviderWrapper;
