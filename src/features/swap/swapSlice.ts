import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Token from '@utils/classes/Token';

type Focus = 'from' | 'to';
interface ISwapState {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: number | undefined;
  toAmount: number | undefined;
  focus: Focus;
}

const initialState: ISwapState = {
  fromToken: null,
  toToken: null,
  fromAmount: undefined,
  toAmount: undefined,
  focus: 'from',
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
    setFromAmount: (state, action: PayloadAction<number | undefined>) => {
      state.fromAmount = action.payload;
    },
    setToAmount: (state, action: PayloadAction<number | undefined>) => {
      state.toAmount = action.payload;
    },
    setFocus: (state, action: PayloadAction<Focus>) => {
      state.focus = action.payload;
    },
  },
});

export const {
  setFromToken,
  setFromAmount,
  setToToken,
  setToAmount,
  setFocus,
} = swapSlice.actions;

export default swapSlice.reducer;
