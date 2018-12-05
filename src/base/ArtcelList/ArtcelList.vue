<template>
  <div>
    <ul class="article-ul">
      <li
        class="item"
        :key="index"
        @click="handleClick(article.id)"
        v-for="(article, index) in articles"
      >
        <div class="content">
          <h1 class="title">{{article.title}}</h1>
          <p class="time">{{article.lastEditTime}}</p>
          <p class="describe">{{article.abstract}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    articles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick(articleID) {
      this.$emit("handleArticle", articleID);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.article-ul {
  & .item {
    margin: 0 auto;
    padding: 0 10px 10px;
    margin-bottom: 15px;
    cursor: pointer;
    & .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      & .title {
        font-size: 24px;
        word-break: break-all;
      }
      & .time {
        color: #7f8c8d;
        font-weight: 400;
        margin-bottom: 10px;
        margin-top: 10px;
      }
      & .describe {
      }
    }
  }
}
</style>
