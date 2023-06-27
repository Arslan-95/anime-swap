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
import { LOADING_STATUS } from '@utils/types';
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
  const [balancesLoading, setBalancesLoading] = useState<LOADING_STATUS>(
    LOADING_STATUS.IDLE
  );
  const tokensList = useMemo(() => Object.values(tokens), [tokens]);

  const updateBalances = async (entryTokens: Address[]) => {
    if (!isConnected) return;

    const updatedBalances: { [address: string]: string } = {};
    const updatedTokens: I1InchTokensData = {};

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
        setTokens((prev) => {
          for (const [key, balance] of Object.entries(updatedBalances)) {
            updatedTokens[key] = {
              ...prev[key],
              balance,
            };
          }

          return { ...prev, ...updatedTokens };
        });
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

      setBalancesLoading(LOADING_STATUS.LOADING);
      await updateBalances(Object.keys(updatedTokens) as Address[]);
      setBalancesLoading(LOADING_STATUS.LOADED);
    } catch (error) {
      console.log('[updateTokens]', error);
    }
  };

  // Clear tokens and balances
  useEffect(() => {
    setBalancesLoading(LOADING_STATUS.IDLE);
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
        balancesLoading,
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
