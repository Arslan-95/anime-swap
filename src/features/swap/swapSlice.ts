import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { I1InchQuote } from '@services/types';
import Token from '@utils/classes/Token';
import { numberIsFine } from '@utils/numbers';
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
  swapRate: number;
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
  swapRate: 0,
  error: null,
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setFromToken: (state, action: PayloadAction<Token | null>) => {
      if (state.toToken?.address === action.payload?.address) {
        state.toToken = state.fromToken;
      }

      state.fromToken = action.payload;
    },
    setToToken: (state, action: PayloadAction<Token | null>) => {
      if (state.fromToken?.address === action.payload?.address) {
        state.fromToken = state.toToken;
      }

      state.toToken = action.payload;
    },
    setFromAmount: (state, action: PayloadAction<string>) => {
      state.fromAmount = action.payload;

      if (state.focus === 'to') {
        const newSwapRate = Number(state.fromAmount) / Number(state.toAmount);

        state.swapRate = numberIsFine(newSwapRate) ? newSwapRate : 0;
      }
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.toAmount = action.payload;

      if (state.focus === 'from') {
        const newSwapRate = Number(state.fromAmount) / Number(state.toAmount);

        state.swapRate = numberIsFine(newSwapRate) ? newSwapRate : 0;
      }
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
