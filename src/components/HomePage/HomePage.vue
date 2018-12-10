<template>
<div class="homePage">
  <Top></Top>
  <Side></Side>
  <Article :isPublish="true"></Article>
</div>
</template>

<script>
import axios from "axios";
import Side from "../Side/Side";
import Article from "../Article/Article";
import Top from "../Top/Top"
export default {
  name: "HomePage",
  data() {
    return {};
  },
  created() {
    // this.getdata();
  },
  methods: {
    getdata() {
      this.$get("/api/test").then(res => {
        console.log("请求成功");
      });
    }
  },
  
  watch: {
    // '$route': function (to,from) {
    //   console.log(to,from)
    //   if (to.path == '/ecolo/a') {
    //   }
    // }
  },
  components: {
    Side,
    Article,
    Top
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.homePage {
  padding: 10px;
  margin: 0 auto;
  padding-top: 85px;
  display: flex;
  padding-left: 0;
}
</style>
