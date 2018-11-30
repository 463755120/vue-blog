<template>
  <div>
    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      content: "",
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    };
  },
  methods: {
    submit() {
      this.markdownShow(this.content);
    },
    ...mapMutations({
      markdownShow: "MARKDOWN",
    })
  },
  components: {
    markdownEditor
  },
  watch: {
    content(news) {
      
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