import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TUserInfo = {
  name: string;
  email: string;
};

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCreddentials: (state, action: PayloadAction<TUserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify({ name: action.payload.name, email: action.payload.email }));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCreddentials, logout } = authSlice.actions;
export default authSlice.reducer;
