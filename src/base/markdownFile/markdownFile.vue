<template>
  <div class="article__content markdown-body" v-html="markdownData" ref="post">
<div class="test_mark"></div>
  </div>
</template>
<script src="https://cdn.bootcss.com/highlight.js/9.13.1/highlight.min.js"></script>
<script>
import marked from "../../js/marked";
export default {
  name: "markdownFile",
  data() {
    return {
      markdownData: ""
    };
  },
  props: {
    markdownfile: {
      type: String,
      required: true
    }
  },
  created() {
   this.markdownData =  marked(this.markdownfile);
  },
  methods: {},
  watch:{
   markdownfile(val){
     console.log(val,'****')
     this.markdownData =  marked(val);
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
