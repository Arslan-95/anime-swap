import { useContext, useEffect } from 'react';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext, WagmiProviderSwapParams } from '@services/types';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import * as actions from './swapSlice';
import Token from '@utils/classes/Token';
import { useAccount, useNetwork } from 'wagmi';
import { getSwapData } from '@services/1inch/api';
import { AxiosError } from 'axios';
import { formatEther, parseEther } from 'viem';

type HandleTokenChange = (token: Token | null) => void;
type HandleAmountChange = (amount: string) => void;

let transactionUpdateTimeout: NodeJS.Timeout;

const useSwap = () => {
  const dispatch = useAppDispatch();
  const { fromToken, fromAmount, toToken, toAmount, focus, error, allowance } =
    useAppSelector((state) => state.swap);
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();
  const { tokensList, getAllowance } = useContext(
    WagmiContext
  ) as IWagmiContext;

  const handleFromTokenChange: HandleTokenChange = (token) => {
    dispatch(actions.setFromToken(token));
  };
  const handleToTokenChange: HandleTokenChange = (token) => {
    dispatch(actions.setToToken(token));
  };

  const handleAmountChange: HandleAmountChange = async (amount) => {
    dispatch(actions.setFromAmount(amount));
  };

  const handleToAmountChange: HandleAmountChange = async (amount) => {
    dispatch(actions.setFromAmount(amount));
  };

  const handleFocusFrom = () => {
    dispatch(actions.setFocus('from'));
  };

  const handleFocusTo = () => {
    dispatch(actions.setFocus('to'));
  };

  const updateTransaction = async (params: WagmiProviderSwapParams) => {
    if (!accountAddress || !chain) return null;

    // Clear error.
    dispatch(actions.setError(null));

    try {
      if (!fromAmount) {
        handleToAmountChange('0');
        return;
      }

      // Update allowance.
      const newAllowance = await getAllowance(params.fromTokenAddress);
      dispatch(actions.setAllowance(newAllowance));

      const swapData = await getSwapData({
        ...params,
        chainId: chain.id,
        fromAddress: accountAddress,
      });

      const toTokenAmountInEther = formatEther(
        BigInt(swapData.toTokenAmount),
        'wei'
      );
      handleToAmountChange(toTokenAmountInEther);

      return swapData;
    } catch (error) {
      console.log('[updateSwapData]', error);

      handleToAmountChange('');

      // Update error message.
      if (!(error instanceof AxiosError)) return;

      const errorMessage = error.response?.data?.description;
      dispatch(actions.setError(errorMessage || ''));
    }
  };

  useEffect(() => {
    handleFromTokenChange(tokensList[0] || null);
    handleToTokenChange(tokensList[1] || null);
  }, [tokensList]);

  useEffect(() => {
    if (!fromToken || !toToken) return;

    clearTimeout(transactionUpdateTimeout);
    transactionUpdateTimeout = setTimeout(
      () =>
        updateTransaction({
          fromTokenAddress: fromToken.address,
          toTokenAddress: toToken.address,
          weiAmount: parseEther(`${Number(fromAmount)}`, 'wei').toString(),
          slippage: 1,
        }),
      1000
    );
  }, [fromToken, toToken, fromAmount]);

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    focus,
    handleAmountChange,
    handleFromTokenChange,
    handleToTokenChange,
    handleFocusFrom,
    handleFocusTo,
    error,
  };
};

export default useSwap;
