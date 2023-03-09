import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: false,
    error: '',
    articles: [],
    totalArticles: 10
  },

  reducers: {
    setStatus: (state, action) => {
      // Set the loading state to the payload value.
      state.loading = action.payload;
    },

    setArticles: (state, action) => {
      // Set the success message and clear the error and loading states.
      const { payload } = action;
      state.articles = [...state.articles, ...payload.articles];
      if (payload?.totalCount) state.totalArticles = payload?.totalCount;
      state.error = '';
      state.loading = false;
    },

    setTotalArticles: (state, action) => {
      state.totalArticles = action.payload;
    },

    setError: (state, action) => {
      // Set the error message and clear the success and loading states.
      const { payload } = action;
      state.error = payload;
      state.loading = false;
    },
    toggleArticleFav: (state, action) => {
      const { payload } = action;
      state.articles = [...state.articles].map((article) => {
        if (article?.slug === payload) {
          let isfav = article?.favorited;
          if (isfav) {
            article.favorited = false;
            article.favoritesCount = article.favoritesCount - 1;
          } else {
            article.favorited = true;
            article.favoritesCount = article.favoritesCount + 1;
          }
        }
        return article;
      });
    }
  }
});

// Export the action creators.
export const { setStatus, setArticles, setError, setTotalArticles, toggleArticleFav } =
  articlesSlice.actions;

// Export the reducer.
export default articlesSlice.reducer;
