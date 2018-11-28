import * as types from './mutation-types'
const mutations = {
  [types.SET_SHOWSIDE_STATE]:(state, flag)=> {
    state.showSide = flag
  },
  [types.GET_ALL_POSTS]: (state, { posts, allPage, curPage }) => {
    if (isNaN(+allPage)) {
      allPage = 0;
    }
    if (isNaN(+curPage)) {
      curPage = 0;
    }
    state.posts = posts;
    state.allPage = +allPage;
    state.curPage = +curPage;
  },
  [types.CREATE_TOKEN]:(state, token)=> {
    state.token = token
    sessionStorage.setItem('vue-blog-token', token);
  },
  [types.DELETE_TOKEN](state) {
    state.token = null;
    sessionStorage.setItem('vue-blog-token', '');
},
}
export default mutations