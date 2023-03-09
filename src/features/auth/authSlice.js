import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: '',
    user: JSON.parse(localStorage.getItem('simplescribe_user'))
  },

  reducers: {
    setStatus: (state, action) => {
      // Set the loading state to the payload value.
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      // Set the success message and clear the error and loading states.
      const { payload } = action;
      state.user = payload;
      state.error = '';
      state.loading = false;
    },

    setError: (state, action) => {
      // Set the error message and clear the success and loading states.
      const { payload } = action;
      state.error = payload;
      state.user = null;
      state.loading = false;
    },

    logoutUser: (state, action) => {
      state.user = null;
    }
  }
});

// Export the action creators.
export const { setStatus, setUser, setError, logoutUser } = authSlice.actions;

// Export the reducer.
export default authSlice.reducer;
