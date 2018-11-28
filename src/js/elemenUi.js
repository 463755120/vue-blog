import Vue from "vue";
import { Button,Input,Message } from 'element-ui';
export default function elemenUI(){
  Vue.use(Button)
  Vue.use(Input)
  Vue.prototype.$Message=Message;
}