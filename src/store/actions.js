import * as types from './mutation-types'
import {
  get,
  post
} from "../js/http"
const getArticle = (commit,url, paginDate) => {
  get(url, paginDate)
    .then(res => {
      commit('GET_ALL_POSTS', {
        posts: res.articleArr,
        allPage: res.allPage,
        curPage: paginDate.page
      });
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
}
export const getAllPosts = function ({
  commit,
  state
}, {
  page = 1,
  limit = 3,
  isPublish = true,
} = {}) {
  return getArticle(commit,'/api/getArticles', {page, limit,isPublish})
}
export const getAllArticel = function ({
  commit,
  state
}, {
  page = 1,
  limit = 3,
  isPublish = false,
} = {}) {
  return getArticle(commit,'/api/getArticles', {page, limit,isPublish})
}
export const createToken = ({
  commit,
  state
}, userData) => {
  return post('/api/login', userData).then(res => {
    if (res.success) {

      commit(types.CREATE_TOKEN, res);
    } else {
      commit(types.DELETE_TOKEN);
    }
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  })
}

export const ArticleDetails = ({
  commit,
  state
}, articleID) => {
  return get('/api/articleDetails', {articleID,}).then(res => {
    if (res.success) {
      commit(types.ARTICLE_EDTIAL, res.articleDetail);
    }
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  }).catch(err => {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  });
}