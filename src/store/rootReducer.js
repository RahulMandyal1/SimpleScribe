//root reducer
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import signUpReducer from '../features/signup/SignupSlice';
import articlesReducer from '../features/articles/articlesSlice';
import articleReducer from '../features/articles/articleSlice';
import detailedArticleReducer from '../features/articles/detailedArticleSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  articles: articlesReducer,
  article: articleReducer,
  detailedArticle: detailedArticleReducer
});

export default rootReducer;
