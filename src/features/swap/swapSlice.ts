import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { I1InchQuote } from '@services/types';
import Token from '@utils/classes/Token';
import { LOADING_STATUS } from '@utils/types';

type Focus = 'from' | 'to';
interface ISwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  allowance?: string;
  focus: Focus;
  transaction: I1InchQuote | null;
  loading: LOADING_STATUS;
  error?: string | null;
}

const initialState: ISwapState = {
  fromToken: null,
  toToken: null,
  fromAmount: '',
  toAmount: '',
  allowance: undefined,
  focus: 'from',
  transaction: null,
  loading: LOADING_STATUS.IDLE,
  error: null,
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setFromToken: (state, action: PayloadAction<Token | null>) => {
      state.fromToken = action.payload;
    },
    setToToken: (state, action: PayloadAction<Token | null>) => {
      state.toToken = action.payload;
    },
    setFromAmount: (state, action: PayloadAction<string>) => {
      state.fromAmount = action.payload;
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.toAmount = action.payload;
    },
    setAllowance: (state, action: PayloadAction<string | undefined>) => {
      state.allowance = action.payload;
    },
    setFocus: (state, action: PayloadAction<Focus>) => {
      state.focus = action.payload;
    },
    setTransaction: (state, action: PayloadAction<I1InchQuote | null>) => {
      state.transaction = action.payload;
    },
    setLoading: (state, action: PayloadAction<LOADING_STATUS>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFromToken,
  setFromAmount,
  setToToken,
  setToAmount,
  setAllowance,
  setFocus,
  setTransaction,
  setLoading,
  setError,
} = swapSlice.actions;

export default swapSlice.reducer;
