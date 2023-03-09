import { getRootUrl } from '../../utils/globalFun';
import { setStatus, setError } from './articleSlice';
import axios from 'axios';

const ROOT_URL = getRootUrl();
const BASE_URL = `${ROOT_URL}/articles`;

//create a new article
export const createNewArticle = (data, token, navigate) => async (dispatch) => {
  try {
    dispatch(setStatus(true));
    const body = {
      article: {
        title: data?.title,
        body: data?.body,
        description: data?.description,
        tagList: data?.tagList
      }
    };

    await axios.post(BASE_URL, body, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    dispatch(setStatus(false));
    return navigate('/');
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};
