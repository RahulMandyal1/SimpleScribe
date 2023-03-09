import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    loading: false,
    error: ''
  },

  reducers: {
    setStatus: (state, action) => {
      // Set the loading state to the payload value.
      state.loading = action.payload;
    },

    setError: (state, action) => {
      // Set the error message and clear the success and loading states.
      const { payload } = action;
      state.error = payload;
      state.loading = false;
    }
  }
});

// Export the action creators.
export const { setStatus, setArticles, setError } = articleSlice.actions;

// Export the reducer.
export default articleSlice.reducer;
