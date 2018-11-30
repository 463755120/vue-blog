<template>
  <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";

export default {
  data() {
    return {
      content: "",
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    };
  },
  components: {
    markdownEditor
  },
  watch:{
    content(news,){
      console.log(news)
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
.markdown-editor .CodeMirror {
  height: 500px;
  width: 800px;
}
</style>