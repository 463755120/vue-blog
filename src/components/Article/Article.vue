<template>
  <div>
    <ArticleList :articles="posts"></ArticleList>
    <Pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'></Pagination>
  </div>
</template>

<script>
import ArticleList from "../../base/ArtcelList/ArtcelList";
import Pagination from "../../base/Pagination/Pagination";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Article",
  data() {
    return {
    };
  },
  created() {
    // this.getdata();
    this.getAllPosts();
  },
  methods: {
    ...mapActions(["getAllPosts"]),
    changePage(page){
      this.getAllPosts({page});
    }

  },
  computed: {
    ...mapGetters(["curPage", "allPage", "showSide","posts"])
  },
  components: {
    ArticleList,
    Pagination
  },
  watch: {
    showSide(val) {
      console.log(val, "showSideshowSide");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
