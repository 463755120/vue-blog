<template>
  <div class="ArticlePage">
    <Top></Top>
    <Side></Side>
    <div class="articleData">
      <p>{{articleDetial.title}}</p>
      <p>{{articleDetial.lastEditTime}}</p>
      <markdownShow :markdownfile="articleDetial.content"></markdownShow>
    </div>
  </div>
</template>

<script>
import Top from "../Top/Top";
import Side from "../Side/Side";
import markdownShow from "../../base/markdownFile/markdownFile";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ArticlDetial",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
    console.log(this.articleDetial);
  },
  computed: {
    ...mapGetters(["articleDetial"])
  },
  methods: {},
  components: {
    Top,
    Side,
    markdownShow
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
