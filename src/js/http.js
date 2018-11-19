import axios from "axios";
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    var root = process.env.BASE_API
    console.log(root,'这是请求路径')
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