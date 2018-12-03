<template>
  <div class="article__content markdown-body" v-html="markdownData" ref="post" v-highlight>
  </div>
</template>
<script>
import marked from "../../js/marked";
export default {
  name: "markdownFile",
  data() {
    return {
      markdownData: ''
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
     this.markdownData =  marked(val);
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
