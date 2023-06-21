import { useContext, useEffect, useMemo } from 'react';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext, WagmiProviderSwapParams } from '@services/types';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import * as actions from './swapSlice';
import Token from '@utils/classes/Token';
import { useAccount, useNetwork } from 'wagmi';
import { getSwapData } from '@services/1inch/api';
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
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();
  const context = useContext(WagmiContext) as IWagmiContext;
  const { tokensList } = context;

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

  const updateAllowance = async () => {
    if (!fromToken) {
      dispatch(actions.setAllowance('0'));
      return '0';
    }

    const newAllowance = await context.getAllowance(fromToken.address);
    dispatch(actions.setAllowance(newAllowance));

    return newAllowance;
  };

  const updateTransaction = async (params: WagmiProviderSwapParams) => {
    if (!accountAddress || !chain) return null;

    // Clear error.
    dispatch(actions.setError(null));
    dispatch(actions.setTransaction(null));
    dispatch(actions.setLoading(LOADING_STATUS.LOADING));

    try {
      if (!fromAmount) {
        handleToAmountChange('0');
        return;
      }

      // Update allowance.
      const newAllowance = await updateAllowance();
      if (Number(newAllowance) < Number(fromAmountWei)) return;

      const swapData = await getSwapData({
        ...params,
        chainId: chain.id,
        fromAddress: accountAddress,
      });

      const toTokenAmountInEther = formatEther(
        BigInt(swapData.toTokenAmount),
        'wei'
      );

      // Update amount and transaction.
      handleToAmountChange(toTokenAmountInEther);
      dispatch(actions.setTransaction(swapData));
      dispatch(actions.setLoading(LOADING_STATUS.SUCCESSED));
    } catch (error) {
      console.log('[updateSwapData]', error);

      handleToAmountChange('');

      // Update error message.
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.description;
        dispatch(actions.setError(errorMessage || ''));
      }

      dispatch(actions.setLoading(LOADING_STATUS.FAILED));
    }
  };

  const swap = async () => {
    if (!transaction) return;

    await context.swap(transaction);
  };

  const approve = async () => {
    if (!fromToken) return;

    await context.approveToken(fromToken.address, fromAmountWei);
    await updateAllowance();
  };

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
    error,
  };
};

export default useSwap;
