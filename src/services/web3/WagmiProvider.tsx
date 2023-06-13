import React from 'react';
import { useAccount, useNetwork, WagmiConfig } from 'wagmi';
import * as inchApi from '@services/1inch/api';
import wagmiConfig from './wagmiConfig';
import { sendTransaction } from '@wagmi/core';
import {
  ApproveToken,
  GetAllowance,
  IWagmiContext,
  Swap,
} from '@services/types';

interface IWagmiProviderProps {
  children?: React.ReactNode;
}

interface IWagmiProviderWrapperProps {
  children?: React.ReactNode;
}

const WagmiContext = React.createContext<IWagmiContext | null>(null);
const WagmiProvider = ({ children }: IWagmiProviderProps) => {
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();

  const approveToken: ApproveToken = async (tokenAddress, weiAmount) => {
    if (!accountAddress || !chain) return;

    const transaction = await inchApi.buildTxForApproveTradeWithRouter(
      tokenAddress,
      weiAmount,
      chain.id
    );

    const tx = await sendTransaction(transaction);
    return tx;
  };

  const getAllowance: GetAllowance = async (tokenAddress) => {
    if (!accountAddress || !chain) return;

    const allowance = await inchApi.checkAllowance(
      tokenAddress,
      accountAddress,
      chain.id
    );

    return allowance;
  };

  const swap: Swap = async (params) => {
    if (!accountAddress || !chain) return;

    const transaction = await inchApi.getSwapData({
      ...params,
      chainId: chain.id,
      fromAddress: accountAddress,
    });

    const tx = await sendTransaction(transaction.tx);
    return tx;
  };

  return (
    <WagmiContext.Provider
      value={{
        approveToken,
        getAllowance,
        swap,
        accountAddress,
        chainId: chain?.id,
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
