<template>
  <div class="article__content markdown-body" v-html="markdownData" ref="post" v-highlight></div>
</template>
<script>
import marked from "../../js/marked";
export default {
  name: "markdownFile",
  data() {
    return {
      markdownData: "",
      category: []
    };
  },
  props: {
    markdownfile: {
      type: String,
      required: true
    }
  },
  created() {
    this.markdownData = marked(this.markdownfile);
  },
  beforeMount() {
    this.$nextTick(() => {
      console.log("读取dom")
      // 提取文章标签，生成目录
      Array.from(this.$refs.post.querySelectorAll("h1,h2,h3,h4,h5,h6")).forEach(
        (item, index) => {
          item.id = item.localName + "-" + index;
          this.category.push({
            tagName: item.localName,
            text: item.innerText,
            href: "#" + item.localName + "-" + index
          });
        }
      );
    });
  },
  methods: {

  },
  watch: {
    markdownfile(val) {
      this.markdownData = marked(val);
    },
    category(val) {
      this.$emit("getCategory", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
