import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)
const Zhigang = resolve => require(['../components/zhigang.vue'], resolve);
const HelloWorld = resolve => require(['../components/HelloWorld.vue'], resolve);
const HomePage = resolve => require(['../components/HomePage/HomePage.vue'], resolve);
const Login = resolve => require(['../components/Login/Login.vue'], resolve);
// const adminPage = resolve => require(['../components/AdminPage/AdminPage.vue'], resolve);
const ArticlDetial = resolve => require(['../components/ArticleDetial/ArticleDetial.vue'], resolve);
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
    // {
    //   path: '/admin',
    //   name: 'adminPage',
    //   component: adminPage,
    //   meta: {
    //     authPage: true
    //   }
    // },
    {
      path: '/articledetial',
      name: 'ArticlDetial',
      component: ArticlDetial,
    },
  ],
  // 如果使用 history，打包回白屏.
  //mode: 'history',
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