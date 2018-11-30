import * as types from './mutation-types'
import {
  get,
  post
} from "../js/http"

export const getAllPosts = function ({
  commit,
  state
}, {
  page = 1,
  limit = 3
} = {}) {
  console.log(page, '页')
  return get('/api/publishArticles', {
      page,
      limit
    })
    .then(res => {
      commit('GET_ALL_POSTS', {
        posts: res.articleArr,
        allPage: res.allPage,
        curPage: page
      });
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
}
export const createToken = ({
  commit,
  state
}, userData) => {
  return post('/api/login', userData).then(res => {
    if (res.success) {
      console.log(res);
      commit(types.CREATE_TOKEN, res);
    } else {
      commit(types.DELETE_TOKEN);
    }
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  })
}