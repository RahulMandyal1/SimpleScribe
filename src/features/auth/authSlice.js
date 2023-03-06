import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: '',
    successMessage: ''
  },
  reducers: {
    setLoading: (state, action) => {
      // Set the loading state to the payload value.
      state.loading = action.payload;
    },

    setSuccessMessage: (state, action) => {
      // Set the success message and clear the error and loading states.
      const { payload } = action;
      state.successMessage = payload;
      state.error = '';
      state.loading = false;
    },

    setError: (state, action) => {
      // Set the error message and clear the success and loading states.
      const { payload } = action;
      state.error = payload;
      state.successMessage = '';
      state.loading = false;
    }
  },
  extraReducers: {}
});

// Export the action creators.
export const { setLoading, setSuccessMessage, setError } = authSlice.actions;

// Export the reducer.
export default authSlice.reducer;
