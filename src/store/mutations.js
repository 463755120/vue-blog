import * as types from './mutation-types'
const mutations = {
  [types.SET_SHOWSIDE_STATE]: (state, flag) => {
    state.showSide = flag
  },
  [types.GET_ALL_POSTS]: (state, {
    posts,
    allPage,
    curPage
  }) => {
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
  [types.CREATE_TOKEN]: (state, res) => {
    state.token = res.token
    state.userInfo = res.name
    sessionStorage.setItem('vue-blog-token', res.token);
    sessionStorage.setItem('vue-blog-userName', res.name);
  },
  [types.DELETE_TOKEN]:(state)=> {
    state.token = null;
    state.userInfo = null;
    sessionStorage.setItem('vue-blog-token', '');
    sessionStorage.setItem('vue-blog-userName', '');
  },
  [types.MARKDOWN]: (state, markdownData) => {
    state.markdownData = markdownData
  },
  [types.ARTICLE_EDTIAL]: (state, articleDetial) => {
    state.articleDetial = articleDetial
  },
}
export default mutations