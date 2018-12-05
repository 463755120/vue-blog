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
    <div class="submit-button">
      <el-button type="primary" @click="submit">保存</el-button>
      <div class="isPublish">
        <span>发布</span>
        <el-switch v-model="editorData.isPublish" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      editorData: {
        content: "",
        editorTitle: "",
        editorDescribe: "",
        isPublish: false
      },
      isComplete: false,
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    };
  },
  created() {
    console.log(this.articleDetial);
  },
  methods: {
    submit() {
      this.checkVal(this.editorData);
      if (this.isComplete) {
        this.submitMarkFile();
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
    submitMarkFile() {
      this.$post("/api/saveArticle", { article: this.editorData }).then(res => {
        if (res.success) {
          this.$Message({
            message: "保持成功",
            type: "success"
          });
          this.getAllPosts();
        } else {
          this.$Message({
            message: "保存异常"
          });
        }
      });
    },
    confirm() {
      this.$Confirm("此操作将不保存博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$Message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapMutations({
      markdownShow: "MARKDOWN"
    }),
    ...mapActions(["getAllPosts"])
  },
  computed: {
    ...mapGetters(["articleDetial"])
  },
  components: {
    markdownEditor
  },
  watch: {
    articleDetial(values) {
     // this.confirm()
      console.log(values);
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
.editor-content {
  margin-left: 120px;
  & .editor-input {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    & span {
      margin-right: 24px;
      font-size: 14px;
      color: #0084ff;
      font-weight: bold;
    }
    & .el-input {
      width: 706px;
    }
  }
  & .submit-button {
    display: flex;
    justify-content: space-between;
    & .isPublish {
      display: flex;
      align-items: center;
      font-size: 20px;
      & span {
        margin-right: 30px;
      }
    }
  }
}

.markdown-editor .CodeMirror {
  height: 500px;
  width: 800px;
}
</style>