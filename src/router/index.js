import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)
const Zhigang = () => import('../components/zhigang.vue');
//const Zhigang = resolve => require(['../components/zhigang.vue'], resolve);
const HelloWorld = () => import('../components/HelloWorld.vue');
//const HelloWorld = resolve => require(['../components/HelloWorld.vue'], resolve);
const HomePage = () => import('../components/HomePage/HomePage.vue');
const Login = () => import('../components/Login/Login.vue');
const adminPage = () => import('../components/adminPage/adminPage.vue');
const router = new Router({
  routes: [{
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        authPage: false
      }
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: adminPage,
      meta: {
        authPage: true
      }
    },
  ],
  // 如果使用 history，打包回白屏.
  mode: 'history',
})
router.beforeEach((to, from, next) => {
  if (to.meta.authPage) {
    if (store.state.token) {
      next();
    } else {
      next({
        name: "Login"
      });
    }
  } else {
    next();
  }
})
export default router