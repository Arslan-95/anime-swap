import { configureStore } from '@reduxjs/toolkit';
import adaptiveSlice from '@features/adaptive/adaptiveSlice';
import swapSlice from '@features/swap/swapSlice';

export const store = configureStore({
  reducer: {
    swap: swapSlice,
    adaptive: adaptiveSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
