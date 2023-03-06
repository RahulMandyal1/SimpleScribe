import { getRootUrl } from '../../utils/globalFun';
import { setStatus, setError, setSuccessMessage } from './SignupSlice';
import axios from 'axios';

const ROOT_URL = getRootUrl();
const BASE_URL = `${ROOT_URL}/users`;

//To Create a new user account
export const createUser = (data) => async (dispatch) => {
  const userData = {
    user: {
      ...data
    }
  };

  try {
    dispatch(setStatus(true));
    const response = await axios.post(BASE_URL, userData);
    if (response.data.user) {
      dispatch(setSuccessMessage('Created Successfully'));
    }
  } catch (error) {
    console.log(error, 'axios response');
    dispatch(setError(error.response.data.message));
  }
};
