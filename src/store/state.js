const state = {
  showSide: false,
  posts: [],
  allPage: 0,
  curPage: 0,
  token:sessionStorage.getItem('vue-blog-token'),
  userInfo:sessionStorage.getItem('vue-blog-userName'),
  markdownData:"",
  articleDetial:null
}
export default state