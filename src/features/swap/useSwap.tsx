import { useContext, useEffect, useMemo } from 'react';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext, WagmiProviderSwapParams } from '@services/types';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import * as actions from './swapSlice';
import Token from '@utils/classes/Token';
import { useNetwork } from 'wagmi';
import { getQuote, getSwapData } from '@services/1inch/api';
import { AxiosError } from 'axios';
import { formatEther, parseEther } from 'viem';
import { LOADING_STATUS } from '@utils/types';

type HandleTokenChange = (token: Token | null) => void;
type HandleAmountChange = (amount: string) => void;

let transactionUpdateTimeout: NodeJS.Timeout;

const useSwap = () => {
  const dispatch = useAppDispatch();
  const {
    fromToken,
    fromAmount,
    toToken,
    toAmount,
    focus,
    allowance,
    transaction,
    loading,
    error,
  } = useAppSelector((state) => state.swap);
  const context = useContext(WagmiContext) as IWagmiContext;
  const { tokensList } = context;
  const { chain } = useNetwork();

  const fromAmountWei = useMemo(() => {
    return parseEther(`${Number(fromAmount)}`, 'wei').toString();
  }, [fromAmount]);

  const isApproved = allowance && Number(allowance) >= Number(fromAmountWei);

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
    dispatch(actions.setToAmount(amount));
  };

  const handleFocusFrom = () => {
    dispatch(actions.setFocus('from'));
  };
  const handleFocusTo = () => {
    dispatch(actions.setFocus('to'));
  };

  const handleLoadingStatus = (status: LOADING_STATUS) => {
    dispatch(actions.setLoading(status));
  };

  const updateAllowance = async () => {
    if (!fromToken) {
      dispatch(actions.setAllowance('999999999'));
      return;
    }

    const newAllowance = await context.getAllowance(fromToken.address);
    dispatch(actions.setAllowance(newAllowance));
  };

  const updateTransaction = async (params: WagmiProviderSwapParams) => {
    if (!context.accountAddress || !chain) return null;

    // Clear error.
    dispatch(actions.setError(null));
    dispatch(actions.setTransaction(null));
    handleLoadingStatus(LOADING_STATUS.LOADING);

    try {
      if (!fromAmount) {
        handleToAmountChange('0');
        return;
      }

      const quote = await getQuote({
        ...params,
        chainId: chain.id,
      });

      const toTokenAmountInEther = formatEther(
        BigInt(quote.toTokenAmount),
        'wei'
      );

      // Update amount and transaction.
      handleToAmountChange(toTokenAmountInEther);
      dispatch(actions.setTransaction(quote));
      handleLoadingStatus(LOADING_STATUS.SUCCESSED);
    } catch (error) {
      console.log('[updateSwapData]', error);

      handleToAmountChange('');

      // Update error message.
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.description;
        dispatch(actions.setError(errorMessage || ''));
      }

      handleLoadingStatus(LOADING_STATUS.FAILED);
    }
  };

  const switchTokens = () => {
    handleToTokenChange(fromToken);
    handleFromTokenChange(toToken);
    handleAmountChange(toAmount);
  };

  const swap = async () => {
    if (!fromToken || !toToken || !chain || !context.accountAddress) return;

    try {
      dispatch(actions.setLoading(LOADING_STATUS.LOADING));

      // Get Transaction data
      const swapData = await getSwapData({
        fromTokenAddress: fromToken.address,
        toTokenAddress: toToken.address,
        weiAmount: fromAmountWei,
        slippage: 1,
        chainId: chain.id,
        fromAddress: context.accountAddress,
      });

      // Swap
      await context.swap(swapData);
      dispatch(actions.setLoading(LOADING_STATUS.SUCCESSED));
    } catch (error) {
      console.log('[swap]', error);
      dispatch(actions.setLoading(LOADING_STATUS.FAILED));
    }
  };

  const approve = async () => {
    if (!fromToken) return;

    await context.approveToken(fromToken.address, fromAmountWei);
    await updateAllowance();
  };

  useEffect(() => {
    // Update allowance.
    updateAllowance();
  }, [fromToken]);

  useEffect(() => {
    handleFromTokenChange(tokensList[0] || null);
    handleToTokenChange(tokensList[1] || null);
  }, [tokensList]);

  useEffect(() => {
    if (!fromToken || !toToken) return;

    clearTimeout(transactionUpdateTimeout);
    transactionUpdateTimeout = setTimeout(() => {
      updateTransaction({
        fromTokenAddress: fromToken.address,
        toTokenAddress: toToken.address,
        weiAmount: fromAmountWei,
        slippage: 1,
      });
    }, 1000);
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
    isApproved,
    transaction,
    swap,
    approve,
    loading,
    switchTokens,
    error,
  };
};

export default useSwap;
