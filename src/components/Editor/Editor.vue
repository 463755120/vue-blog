<template>
  <div class="editor-content">
    <div class="editor-title editor-input">
      <span>文章标题</span>
      <el-input class="el-input" v-model="editorData.title" placeholder="请输入标题"></el-input>
    </div>
    <div class="editor-describe editor-input">
      <span>文章摘要</span>
      <el-input
        class="el-input"
        type="textarea"
        autosize
        placeholder="请输入摘要"
        v-model="editorData.abstract"
      ></el-input>
    </div>
    <markdown-editor v-model="editorData.content" ref="markdownEditor"></markdown-editor>
    <div class="submit-button">
      <el-button type="primary" @click="update" v-if="editorData.articleId">更新</el-button>
      <el-button type="primary" @click="submit" v-else>保存</el-button>
      <div class="isPublish">
        <span>发布</span>
        <el-switch v-model="editorData.publish" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="delete">
        <el-button type="warning" @click="deleteArticle">删除</el-button>
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
        title: "",
        abstract: "",
        publish: false,
        articleId: null
      },
      isComplete: false,
      isEditor: false,
      showWaring:false,
      configs: {
        spellChecker: false // 禁用拼写检查
      }
    };
  },
  created() {},
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
    update() {
      this.checkVal(this.editorData);
      if (this.isComplete) {
        const updataSrticle = {
          title: this.editorData.title,
          content: this.editorData.content,
          abstract: this.editorData.abstract,
          articleId: this.editorData.articleId,
          lastEditTime: new Date()
        };
        this.$post("/api/changeArticle", updataSrticle).then(res => {
          this.result(res, "更新成功", "更新失败");
        });
      } else {
        this.$Message({
          message: "请完善博客后再更新"
        });
      }
    },
    submitMarkFile() {
      this.$post("/api/saveArticle", { article: this.editorData }).then(res => {
        this.result(res, "保存成功", "保存失败");
      });
    },
    // 新建文件的删除和已有博客的删除
    deleteArticle() {
      // 判断是否编辑中
      this.isEditorData();
      if (this.isEditor) {
        if (this.editorData.articleId === null) {
          // 这是新建的
          this.confirm(this.clearEditor);
        } else {
          // 这是之前的
          this.confirm(this.deletHttp);
          // this.clearArticle();
        }
      }
    },
    deletHttp() {
      this.$post("/api/deletaArticle", {
        articleId: this.editorData.articleId
      }).then(res => {
        if (res.success) {
          // 删除编辑状态
          this.clearArticle();
          this.showWaring = true;
        }
        this.result(res, "删除成功", "删除失败");
      });

    },
    clearEditor() {
      this.editorData.title = "";
      this.editorData.content = "";
      this.editorData.abstract = "";
      this.editorData.publish = false;
      this.$Message({
        type: "success",
        message: "清除成功!"
      });
    },
    result(res, successMesg, faileMesg) {
      if (res.success) {
        this.$Message({
          message: successMesg,
          type: "success"
        });
        this.getAllArticel();
      } else {
        this.$Message({
          message: faileMesg
        });
      }
    },
    checkVal(editorData) {
      let editorDataVal = Object.values(editorData);
      this.isComplete = editorDataVal.every((item, index, arr) => {
        return item !== "";
      });
    },
    isEditorData() {
      const editorData = {
        title: this.editorData.title,
        content: this.editorData.content,
        abstract: this.editorData.abstract
      };
      let editorDataVal = Object.values(editorData);
      this.isEditor = editorDataVal.some((item, index, arr) => {
        return item !== "";
      });
    },

    articleDetialChage(values) {
      // values可能是null
      if (values) {
        this.editorData = values;
        this.editorData.articleId = values.id;
      } else {
        // 表示正在编辑的新建文件被替换
        this.clearEditor();
      }
    },
    confirm(confirmfn, value) {
      this.$Confirm("此操作将不保存博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          confirmfn(value);
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapMutations({
      markdownShow: "MARKDOWN",
      clearArticle: "CLEARN_ARTICLE"
    }),
    ...mapActions(["getAllArticel"])
  },
  computed: {
    ...mapGetters(["articleDetial"])
  },
  components: {
    markdownEditor
  },
  watch: {
    articleDetial(newValues, oldValues) {
      // 以前的博客被删除
      if(oldValues === null || this.showWaring){
        this.showWaring = false
        this.articleDetialChage(newValues)
        return
      }
        this.confirm(this.articleDetialChage, newValues);
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
    & .isPublish {
      display: flex;
      align-items: center;
      font-size: 20px;
      margin-left: 50px;
      & span {
        margin-right: 20px;
      }
    }
    & .delete {
      margin-left: 416px;
    }
  }
}

.markdown-editor .CodeMirror {
  height: 500px;
  width: 800px;
}
</style>