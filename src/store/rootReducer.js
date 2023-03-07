//root reducer
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import signUpReducer from '../features/signup/SignupSlice';
export const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer
});

export default rootReducer;
