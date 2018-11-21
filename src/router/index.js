import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Zhigang = () => import('../components/zhigang.vue');
//const Zhigang = resolve => require(['../components/zhigang.vue'], resolve);
const HelloWorld = () => import('../components/HelloWorld.vue');
//const HelloWorld = resolve => require(['../components/HelloWorld.vue'], resolve);
const HomePage = () => import('../components/HomePage/HomePage.vue');
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '*',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/zhigang',
      name: 'Zhigang',
      component: Zhigang
    }
  ],
  mode: 'history',
})