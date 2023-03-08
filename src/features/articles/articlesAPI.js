import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import { getRootUrl } from '../../utils/globalFun';
import {
  setStatus,
  setError,
  setArticles,
  setTotalArticles,
  toggleArticleFav
} from './articlesSlice';
import axios from 'axios';

const ROOT_URL = getRootUrl();
const BASE_URL = `${ROOT_URL}/articles`;

//Login the existing user get token and other required data
export const getArticles =
  (offset = 0, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch(setStatus(true));
      const response = await axios.get(`${BASE_URL}?offset=${offset}&limit=${limit}`);
      const articles = response.data?.articles;
      dispatch(setTotalArticles(response.data?.articlesCount));
      dispatch(setArticles(articles));
    } catch (error) {
      dispatch(setError(error?.response?.data?.errors));
    }
  };

export const favouriteArticle = (slug, token) => async (dispatch) => {
  try {
    dispatch(toggleArticleFav(slug));
    const response = await axios.post(
      `${BASE_URL}/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response?.data?.article;
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};

export const unFavouriteArticle = (slug, token) => async (dispatch) => {
  try {
    dispatch(toggleArticleFav(slug));
    const response = await axios.delete(`${BASE_URL}/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response?.data?.article;
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};
