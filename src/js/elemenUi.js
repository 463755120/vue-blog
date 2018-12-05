import Vue from "vue";
import { Button,Input,Message,Switch,MessageBox } from 'element-ui';
export default function elemenUI(){
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Switch)
  Vue.prototype.$Message=Message;
  Vue.prototype.$Confirm= MessageBox.confirm;
}