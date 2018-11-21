// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from './App.vue'
import router from './router'
import './style/test.css'
import http from './js/http'
import rourrou from './js/rourou'
import { Button } from 'element-ui';
import {get,post} from "./js/http.js"


Vue.config.productionTip = false
Vue.use(Button)
Vue.prototype.$get=get;
Vue.prototype.$post=post;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// vue 热更新
if(module.hot){
  module.hot.accept();
}