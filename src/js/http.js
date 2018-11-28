import axios from "axios";
import store from '../store'
const createToken = ()=>{
  console.log(store,'store.state.token')
  if(store.state.token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token; // 全局设定header的token验证，注意Bearer后有个空格
  }
}
// axios拦截返回，拦截token过期
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.data.error.indexOf('token') !== -1) {
      store.commit('DELETE_TOKEN');
  }
  return Promise.reject(error);
});
export function get(url,params={}){
  createToken()
  return new Promise((resolve,reject) => {
    var root = process.env.BASE_API
    axios.get(root+url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
export function post(url,params){
   createToken()
  return new Promise((resolve,reject) => {
    var root = process.env.BASE_API
    axios.post(root+url,params)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}