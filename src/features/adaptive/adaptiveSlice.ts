import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sizes } from './breakpoints';

type TAdaptiveStates = Record<'isDesktop' | 'isTablet' | 'isMobile', boolean>;
interface IAdaptiveState extends TAdaptiveStates {
  windowWidth: number;
}

const initialState: IAdaptiveState = {
  isDesktop: true,
  isTablet: false,
  isMobile: false,
  windowWidth: 0,
};

const chooseBreakpoint = (
  state: IAdaptiveState,
  target: keyof TAdaptiveStates
) => {
  state.isDesktop = false;
  state.isTablet = false;
  state.isMobile = false;
  state[target] = true;
};

const adaptiveSlice = createSlice({
  name: 'adaptive',
  initialState,
  reducers: {
    setAdaptive: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload;

      if (action.payload <= sizes.mobileL) {
        chooseBreakpoint(state, 'isMobile');
        return;
      }

      if (action.payload <= sizes.tablet) {
        chooseBreakpoint(state, 'isTablet');
        return;
      }

      chooseBreakpoint(state, 'isDesktop');
    },
  },
});

export const { setAdaptive } = adaptiveSlice.actions;

export default adaptiveSlice.reducer;
