import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletAddress: localStorage.getItem('walletAddress') || '',
  referCode: localStorage.getItem('referCode') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { walletAddress, referCode } = action.payload;
      state.walletAddress = walletAddress;
      state.referCode = referCode;

      console.log(walletAddress)
      console.log(referCode)

      // Persist to localStorage
      localStorage.setItem('walletAddress', walletAddress);
      localStorage.setItem('referCode', referCode);
    },
    disconnect: (state) => {
      state.walletAddress = '';
      state.referCode = '';

      // Clear from localStorage
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('referCode');
    },
  },
});

export const { login, disconnect } = authSlice.actions;
export default authSlice.reducer;
