import { createSlice } from '@reduxjs/toolkit';

const detailedArticleSlice = createSlice({
  name: 'detailed_Article',
  initialState: {
    loading: false,
    article: null,
    comments: null,
    error: null,
    commentStatus: false
  },

  reducers: {
    setStatus: (state, action) => {
      // Set the loading state to the payload value.
      state.loading = action.payload;
    },

    setArticle: (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.article = payload;
    },

    setComments: (state, action) => {
      const { payload } = action;
      state.commentStatus = false;
      state.comments = payload;
    },

    setCommentStatus: (state, action) => {
      state.commentStatus = action.payload;
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
export const { setStatus, setArticle, setError, setComments, setCommentStatus } =
  detailedArticleSlice.actions;

// Export the reducer.
export default detailedArticleSlice.reducer;
