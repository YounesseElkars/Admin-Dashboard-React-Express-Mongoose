import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import { apiSlice } from './features/apiSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
