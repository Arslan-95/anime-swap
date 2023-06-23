import React, { useState, useEffect, useMemo } from 'react';
import { useAccount, useNetwork, WagmiConfig, Address } from 'wagmi';
import * as inchApi from '@services/1inch/api';
import wagmiConfig from './wagmiConfig';
import { sendTransaction, fetchBalance } from '@wagmi/core';
import {
  ApproveToken,
  GetAllowance,
  I1InchTokensData,
  IWagmiContext,
  Swap,
} from '@services/types';
import { DEFAULT_CHAIN, DEFAULT_TOKEN_ADDRESS } from '@services/config';
import _ from 'lodash';

interface IWagmiProviderProps {
  children?: React.ReactNode;
}

interface IWagmiProviderWrapperProps {
  children?: React.ReactNode;
}

export const WagmiContext = React.createContext<IWagmiContext | null>(null);

const WagmiProvider = ({ children }: IWagmiProviderProps) => {
  const { address: accountAddress, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [tokens, setTokens] = useState<I1InchTokensData>({});
  const [balances, setBalances] = useState<{
    [address: string]: string;
  }>({});
  const tokensList = useMemo(() => Object.values(tokens), [tokens]);

  const updateBalances = async (entryTokens: Address[]) => {
    const updatedBalances: { [address: string]: string } = {
      ...balances,
    };

    try {
      const chunks = _.chunk(entryTokens, 20);
      for (const addresses of chunks) {
        for (const address of addresses) {
          const balance = await fetchBalance({
            address: accountAddress as Address,
            token:
              address === DEFAULT_TOKEN_ADDRESS
                ? undefined
                : (address as Address),
          });

          updatedBalances[address] = balance.formatted;
        }
        setBalances((prev) => ({ ...prev, ...updatedBalances }));
      }
    } catch (error) {
      console.log('[updateBalances]', error);
    }
  };

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

      setTokens(updatedTokens);
    } catch (error) {
      console.log('[updateTokens]', error);
    }
  };

  // Clear tokens and balances
  useEffect(() => {
    setBalances({});
  }, [accountAddress, chain]);

  useEffect(() => {
    updateTokens();
  }, [chain]);

  return (
    <WagmiContext.Provider
      value={{
        approveToken,
        getAllowance,
        swap,
        isConnected,
        accountAddress,
        chainId: chain?.id,
        tokens,
        tokensList,
        updateBalances,
        balances,
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
