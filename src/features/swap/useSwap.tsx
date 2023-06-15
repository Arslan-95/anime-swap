import { useContext, useEffect } from 'react';
import { WagmiContext } from '@services/web3/WagmiProvider';
import { IWagmiContext } from '@services/types';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import * as actions from './swapSlice';
import Token from '@utils/classes/Token';

type HandleTokenChange = (token: Token | null) => void;
type HandleAmountChange = (amount: number | undefined) => void;

const useSwap = () => {
  const dispatch = useAppDispatch();
  const { fromToken, fromAmount, toToken, toAmount, focus } = useAppSelector(
    (state) => state.swap
  );
  const { tokensList } = useContext(WagmiContext) as IWagmiContext;

  const handleFromTokenChange: HandleTokenChange = (token) => {
    dispatch(actions.setFromToken(token));
  };
  const handleToTokenChange: HandleTokenChange = (token) => {
    dispatch(actions.setToToken(token));
  };

  const handleAmountChange: HandleAmountChange = async (amount) => {
    dispatch(actions.setFromAmount(amount));
  };

  const handleFocusFrom = () => {
    dispatch(actions.setFocus('from'));
  };

  const handleFocusTo = () => {
    dispatch(actions.setFocus('to'));
  };

  useEffect(() => {
    handleFromTokenChange(tokensList[0] || null);
    handleToTokenChange(tokensList[1] || null);
  }, [tokensList]);

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
  };
};

export default useSwap;
