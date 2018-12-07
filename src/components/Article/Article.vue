<template>
  <div>
    <ArticleList :articles="posts" @handleArticle="handleArticle"></ArticleList>
    <Pagination :curPage="curPage" :allPage="allPage" @changePage="changePage"></Pagination>
  </div>
</template>

<script>
import ArticleList from "../../base/ArtcelList/ArtcelList";
import Pagination from "../../base/Pagination/Pagination";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Article",
  data() {
    return {};
  },
  props: {
    isPublish: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // this.getdata();
    this.getArticleData();
  },
  methods: {
    changePage(page) {
      this.getArticleData(page);
    },
    handleArticle(articleID) {
      this.ArticleDetails(articleID);
      if (this.isPublish) {
        this.$router.push("/article");
      }
    },
    getArticleData(page) {
      if (this.isPublish) {
        this.getAllPosts({ page });
      } else {
        this.getAllArticel({ page });
      }
    },
    ...mapActions(["getAllPosts", "getAllArticel", "ArticleDetails"])
  },
  computed: {
    ...mapGetters(["curPage", "allPage", "showSide", "posts"])
  },
  components: {
    ArticleList,
    Pagination
  },
  watch: {
    showSide(val) {
     
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
