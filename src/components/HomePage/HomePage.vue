<template>
<div class="homePage">
  <Side></Side>
  <Article></Article>
</div>
</template>

<script>
import axios from "axios";
import Side from "../Side/Side";
import Article from "../Article/Article";
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
  components: {
    Side,
    Article
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.homePage {
  padding: 10px;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 85px;
  display: flex;
  
}
</style>
