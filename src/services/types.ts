import Token from '@utils/classes/Token';
import { Address } from 'wagmi';

export interface I1InchTx {
  data: Address;
  from: Address;
  to: Address;
  gas: bigint;
  value: bigint;
}

export interface I1InchSwapDataParams {
  fromTokenAddress: Address; // The address of the token you want to swap from
  toTokenAddress: Address; // The address of the token you want to swap to
  weiAmount: string; // The amount of the fromToken you want to swap
  slippage: number; // The maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
  disableEstimate?: boolean; // Whether to disable estimation of swap details
  allowPartialFill?: boolean; // Whether to allow partial filling of the swap order
  fromAddress: Address;
  chainId: number;
}

export interface I1InchSwapData {
  fromToken: Token;
  fromTokenAmount: string;
  toToken: Token;
  toTokenAmount: string;
  tx: I1InchTx;
}

export interface I1InchTokensData {
  [key: string]: Token;
}

export type WagmiProviderSwapParams = Omit<
  I1InchSwapDataParams,
  'chainId' | 'fromAddress'
>;

export type ApproveToken = (tokenAddress: Address, weiAmount: string) => void;
export type GetAllowance = (tokenAddress: Address) => void;
export type Swap = (params: WagmiProviderSwapParams) => void;

export interface IWagmiContext {
  approveToken: ApproveToken;
  getAllowance: GetAllowance;
  swap: Swap;
  accountAddress: Address | undefined;
  chainId: number | undefined;
  tokens: I1InchTokensData;
  tokensList: Token[];
}