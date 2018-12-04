import Vue from "vue";
import { Button,Input,Message,Switch,} from 'element-ui';
export default function elemenUI(){
  Vue.use(Button)
  Vue.use(Input)
  Vue.use(Switch)
  Vue.prototype.$Message=Message;
}