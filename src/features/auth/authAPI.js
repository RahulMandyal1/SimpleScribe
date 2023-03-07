import { getRootUrl } from '../../utils/globalFun';
import { setStatus, setError, setUser } from './authSlice';
import axios from 'axios';

const ROOT_URL = getRootUrl();
const BASE_URL = `${ROOT_URL}/users/login`;
const CURRENT_USER_API_URL = `${ROOT_URL}/user`;

//Login the existing user get token and other required data
export const loginUser = (data) => async (dispatch) => {
  const userData = {
    user: {
      ...data
    }
  };
  try {
    dispatch(setStatus(true));
    const response = await axios.post(BASE_URL, userData);
    const user = response.data?.user;
    dispatch(setUser(user));
    localStorage.setItem('simplescribe_user', JSON.stringify(user));
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};

// validate current user token to check that user is valid or not
export const validateCurrentUser = (token) => async (dispatch) => {
  //no token is inside user data then logout user
  if (!token) {
    dispatch(setUser(null));
    return localStorage.setItem('simplescribe_user', null);
  }
  try {
    await axios({
      method: 'get',
      url: CURRENT_USER_API_URL,
      headers: {
        Authorization: `Token ${token}`
      }
    });
  } catch (error) {
    dispatch(setUser(null));
    localStorage.setItem('simplescribe_user', null);
  }
};
