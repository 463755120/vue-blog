import axios from "axios";
export function get(url,params={}){
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
export function post(url,params={}){
  return new Promise((resolve,reject) => {
    var root = process.env.BASE_API
    axios.post(root+url,{
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