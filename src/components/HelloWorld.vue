<template>

</template>

<script>
import axios from "axios";
import {get} from "../js/http.js"
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
   // this.getdata();
  },
  methods: {
    getdata() {
      this.$get('/api/test')
      .then(res=>{
        console.log("请求成功")
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
