const state = {
  showSide: false,
  posts: [],
  allPage: 0,
  curPage: 0,
  token:sessionStorage.getItem('vue-blog-token'),
  userInfo:sessionStorage.getItem('vue-blog-userName'),
  markdownData:"",
  articleDetial:null,
  publicArticleDetial:null
}
// 教训 把展示的文章和编辑的文章还是用不同的state分开好。不然一堆bug
export default state