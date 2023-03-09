import { comment } from 'postcss';
import { getRootUrl } from '../../utils/globalFun';
import {
  setStatus,
  setError,
  setArticle,
  setComments,
  setCommentStatus
} from './detailedArticleSlice';
import axios from 'axios';

const ROOT_URL = getRootUrl();
const BASE_URL = `${ROOT_URL}/articles`;

//Login the existing user get token and other required data
export const getDetailedArticle = (slug) => async (dispatch) => {
  try {
    dispatch(setStatus(true));
    dispatch(setComments([]));
    const response = await axios.get(`${BASE_URL}/${slug}`);
    const article = response.data?.article;
    dispatch(setArticle(article));
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};

//Get all comments of a article
export const getArticleAllComments = (slug, token) => async (dispatch) => {
  try {
    dispatch(setCommentStatus(true));
    const response = await axios(`${BASE_URL}/${slug}/comments`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const comments = response.data?.comments;
    dispatch(setComments(comments));
  } catch (error) {
    dispatch(setCommentStatus(false));
  }
};

//Create a new comment
export const createComment = (slug, commentText, token) => async (dispatch) => {
  try {
    dispatch(setCommentStatus(true));
    const newComment = { comment: { body: commentText } };
    await axios.post(`${BASE_URL}/${slug}/comments`, newComment, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(setCommentStatus(false));
    dispatch(getArticleAllComments(slug, token));
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};

export const deleteComment = (slug, commentId, token) => async (dispatch) => {
  try {
    dispatch(setCommentStatus(true));
    await axios.delete(`${BASE_URL}/${slug}/comments/${commentId}`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(setCommentStatus(false));
    dispatch(getArticleAllComments(slug, token));
  } catch (error) {
    dispatch(setError(error?.response?.data?.errors));
  }
};
