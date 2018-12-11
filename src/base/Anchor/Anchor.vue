<template>
  <div
    class="categoryBox"
    v-if="category.length"
    :class="{ 'categoryBox--fixed': (scrollTop > 270)}"
    ref="categoryBox"
  >
    <p class="categoryBoxtitle">文章目录</p>
    <ul class="categoryBox__list">
      <li v-for="item in category" :key="item.text" :class="'categoryBox__'+item.tagName">
        <a :href="item.href">{{item.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import throttle from "../../js/throttle.js";
export default {
  name: "Anchor",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      scrollTop: 0
    };
  },
  props: {
    category: {
      type: Array,
      required: true
    }
  },
  created() {
    // this.getdata();
    window.onscroll = throttle(this.getScrollTop, 30);
  },

  methods: {
    getScrollTop() {
      let scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        // 如果屏幕宽度小于850就直接return,不再去获取滚动值
        if (document.body.clientWidth < 850) {
          return;
        }
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      console.log(this.scrollTop);
      this.scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      // console.log(this.scrollTop)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.categoryBox {
  padding-left: 20px;
  padding-right: 15px;
  will-change: transform;
  position: fixed;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  width: 250px;
  & .categoryBoxtitle {
    margin-top: 15px;
    margin-bottom: 10px;
    font-weight: 400;
    color: #808080;
    font-size: 18px;
  }
  & ui {
    list-style: none;
  }
  & li {
    text-align: left;
    margin-bottom: 5px;
    padding-left: 20px;
    word-wrap: break-word;
    word-break: all;
    & a {
      color: grey;
      text-decoration: none;
      margin-left: -18px;
      word-wrap: break-word;
      word-break: break-all;
    }
    & a:hover {
      color: blue;
      text-decoration: underline;
    }
  }
  & .categoryBox__h1 {
    margin-left: 0;
  }
  & .categoryBox__h2 {
    margin-left: 20px;
  }
  & .categoryBox__h3 {
    margin-left: 40px;
  }
  & .categoryBox__h4 {
    margin-left: 60px;
  }
  & .categoryBox__h5 {
    margin-left: 80px;
  }
  & .categoryBox__h6 {
    margin-left: 100p;
  }
}
</style>
