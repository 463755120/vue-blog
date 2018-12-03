<template>
  <div class="editor-content">
    <div class="editor-title editor-input">
      <span>文章标题</span>
      <el-input class="el-input" v-model="editorData.editorTitle" placeholder="请输入标题"></el-input>
    </div>
    <div class="editor-describe editor-input">
      <span>文章摘要</span>
      <el-input
        class="el-input"
        type="textarea"
        autosize
        placeholder="请输入摘要"
        v-model="editorData.editorDescribe"
      ></el-input>
    </div>
    <markdown-editor v-model="editorData.content" ref="markdownEditor"></markdown-editor>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      editorData: {
        content: "",
        editorTitle: "",
        editorDescribe: ""
      },
      isComplete: false,
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    };
  },
  methods: {
    submit() {
      this.checkVal(this.editorData);
      console.log(this.isComplete);
      if (this.isComplete) {
        // this.markdownShow(this.editorData.content);
      } else {
        this.$Message({
          message: "请完善博客后再提交"
        });
      }
    },
    checkVal(editorData) {
      let editorDataVal = Object.values(editorData);
      this.isComplete = editorDataVal.every((item, index, arr) => {
        return item !== "";
      });
    },
    ...mapMutations({
      markdownShow: "MARKDOWN"
    })
  },
  components: {
    markdownEditor
  },
  watch: {
    content(news) {}
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
.editor-content {
  margin-left: 120px;
  & .editor-input{
    display: flex;
    align-items:center;
    margin-bottom:10px;
    & span{
      margin-right: 24px;
      font-size: 14px;
      color: #0084ff;
      font-weight: bold;
    }
    & .el-input {
      width: 706px;
    }
  }
}

.markdown-editor .CodeMirror {
  height: 500px;
  width: 800px;
}
</style>