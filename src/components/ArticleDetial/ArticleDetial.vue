<template>
  <div class="ArticlePage">
    <Top></Top>
    <Anchor :category="categoryData"></Anchor>
    <div class="articleDate">
      <p class="title">{{publicArticleDetial.title}}</p>
      <p class="time">
        <span>编辑于</span>
        {{publicArticleDetial.lastEditTime}}
      </p>
      <div class="abstract">{{publicArticleDetial.abstract}}</div>
      <div class="content">
        <markdownShow :markdownfile="publicArticleDetial.content" @getCategory="getCategory"></markdownShow>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../Top/Top";
import Anchor from "../../base/Anchor/Anchor";
import markdownShow from "../../base/markdownFile/markdownFile";
import { mapGetters, mapMutations, mapActions } from "vuex";
import '../../style/markdown.css'
export default {
  name: "ArticlDetial",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      articleID: "",
      categoryData:[],
    };
  },
  created() {
    // const articleID =this.$router.params.id
    // 这里有问题
    if (this.publicArticleDetial === null) {
      this.articleID = this.$router.history.current.query.id;
      // true是为了写入不同的state中
      this.ArticleDetails({
        articleID:this.articleID,
        isPublish: true
      });
    }
  },
  beforeDestroy(){
    this.categoryData = [];
  },
  computed: {
    ...mapGetters(["publicArticleDetial"])
  },
  methods: {
    getCategory(category){
      this.categoryData = category
    },
    ...mapActions(["ArticleDetails"])
  },
  components: {
    Top,
    Anchor,
    markdownShow
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style >
.ArticlePage {
  padding: 10px;
  margin: 0 auto;
  padding-top: 85px;
  display: flex;
  padding-left: 0;
  & .articleDate {
    width: 700px;
    margin-left:360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .title {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 24px;
    }
    & .time {
      margin-bottom: 16px;
      margin-left: 300px;
      color: #909090;
      font-size: 14px;
    }
    & .abstract {
      width: 500px;
      text-align: center;
      height: auto;
      line-height: 20px;
      margin-bottom: 16px;
    }
    & .content {
      width: 100%;
      text-align: center;
      height: auto;
      line-height: 20px;
    }
  }
}
</style>
