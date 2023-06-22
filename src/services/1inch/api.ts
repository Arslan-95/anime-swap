import type { QueryParams } from '@utils/types';
import { Address } from 'wagmi';
import axios from 'axios';
import {
  I1InchSwapDataParams,
  I1InchSwapData,
  I1InchTokensData,
} from '../types';

export const broadcastApiUrl = (chainId: number) =>
  'https://tx-gateway.1inch.io/v1.1/' + chainId + '/broadcast';

export const apiBaseUrl = (chainId: number) =>
  `https://api.1inch.io/v5.0/${chainId}`;

// Construct full API request URL
export const apiRequestUrl = (
  methodName: string,
  queryParams: QueryParams,
  chainId: number
) => {
  return (
    apiBaseUrl(chainId) +
    methodName +
    '?' +
    new URLSearchParams(queryParams).toString()
  );
};

export const checkAllowance = async (
  tokenAddress: Address,
  walletAddress: Address,
  chainId: number
) => {
  const allowance = await axios(
    apiRequestUrl(
      '/approve/allowance',
      { tokenAddress, walletAddress },
      chainId
    )
  ).then((res) => res.data.allowance);

  return allowance;
};

export const buildTxForApproveTradeWithRouter = async (
  tokenAddress: Address,
  amount: string | undefined,
  chainId: number
) => {
  const url = apiRequestUrl(
    '/approve/transaction',
    amount ? { tokenAddress, amount } : { tokenAddress },
    chainId
  );

  const transaction = await axios(url).then((res) => res.data);

  return transaction;
};

// export const getQuote = async ({
//   fromTokenAddress,
//   toTokenAddress,
//   fromAddress,
//   weiAmount,
//   chainId,
// }) => {
//   const quoteParams = {
//     fromTokenAddress,
//     toTokenAddress,
//     amount: weiAmount,
//   };

//   const quote = await axios(apiRequestUrl('/quote', quoteParams, chainId)).then(
//     (res) => res.data
//   );

//   console.log(quote)
// };

export const getSwapData = async ({
  fromTokenAddress,
  toTokenAddress,
  fromAddress,
  weiAmount,
  slippage = 1,
  disableEstimate = false,
  allowPartialFill = false,
  chainId,
}: I1InchSwapDataParams): Promise<I1InchSwapData> => {
  const swapParams = {
    fromTokenAddress,
    toTokenAddress,
    amount: weiAmount,
    fromAddress,
    slippage: slippage.toString(),
    disableEstimate: disableEstimate.toString(),
    allowPartialFill: allowPartialFill.toString(),
  };

  const swapData: I1InchSwapData = await axios(
    apiRequestUrl('/swap', swapParams, chainId)
  ).then((res) => res.data);

  return swapData;
};

export const getTokens = async (chainId: number): Promise<I1InchTokensData> => {
  const tokens = await axios(apiRequestUrl('/tokens', {}, chainId)).then(
    (res) => res.data.tokens
  );

  return tokens;
};
