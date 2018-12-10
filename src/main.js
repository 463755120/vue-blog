// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from './App.vue'
import router from './router'
import './style/test.css'
import elemenui from './js/elemenUi'
import {
  get,
  post
} from "./js/http.js"
import store from './store'

Vue.config.productionTip = false
elemenui()
// 代码块高亮
hljs.initHighlightingOnLoad()
Vue.prototype.$get = get;
Vue.prototype.$post = post;
// ue-router的问题，在路由改变时，页面将会重新渲染并且会移除事件，这里就把 highlight 的事件给移除了。
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
// vue 热更新
if (module.hot) {
  module.hot.accept();
}