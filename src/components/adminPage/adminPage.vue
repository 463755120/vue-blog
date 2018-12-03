<template>
  <div class="homePage">
    <Top></Top>
    <Side></Side>
    <Article></Article>
    <markdownEditor></markdownEditor>
    <!-- <markdownShow :markdownfile='markdownData' ></markdownShow> -->
  </div>
</template>

<script>
import axios from "axios";
import Side from "../Side/Side";
import Article from "../Article/Article";
import Top from "../Top/Top";
import markdownEditor from "../Editor/Editor";
import markdownShow from "../../base/markdownFile/markdownFile";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["markdownData"])
  },
  components: {
    Side,
    Article,
    Top,
    markdownEditor,
    markdownShow
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
