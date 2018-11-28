<template>
    <ul class="pagination">
        <li class="pagination__button" @click="prevPage">
            <
        </li>
        <li class="pagination__item" v-for="page in pageArr" @click="switchPage(page)" :class="{'pagination__item--active':page==curPage}" :key="page">
            {{page}}
        </li>
        <li class="pagination__button" @click="nextPage">
            >
        </li>
    </ul>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  props: {
    curPage: {
      type: Number,
      required: true
    },
    allPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageArr() {
      let arr = [];
      if (this.allPage <= 7) {
        // 1 2 3 4 5 6 7
        for (let i = 1; i <= this.allPage; i++) {
          arr.push(i);
        }
      } else {
        if (this.curPage - 1 < 3) {
          // 1 2 3 4 ... allpage
          for (let i = 1; i <= this.curPage + 1; i++) {
            arr.push(i);
          }
          arr.push("...");
          arr.push(this.allPage);
        } else if (this.allPage - this.curPage < 3) {
          // 1 ... 34 35 36 37
          arr.push(1);
          arr.push("...");
          for (let i = this.curPage - 1; i <= this.allPage; i++) {
            arr.push(i);
          }
        } else {
          // 1 ... 3 4 5 ... 37
          arr.push(1);
          arr.push("...");
          arr.push(this.curPage - 1);
          arr.push(this.curPage);
          arr.push(this.curPage + 1);
          arr.push("...");
          arr.push(this.allPage);
        }
      }
      return arr;
    }
  },
  created() {},
  methods: {
    prevPage() {
      if (this.curPage <= 1) {
        return;
      }
      this.$emit("changPage", this.curPage - 1);
    },
    nextPage() {
      if (this.curPage >= this.allPage) {
        return;
      }
      this.$emit("changePage", this.curPage + 1);
    },
    switchPage(page) {
      if (page === "...") {
        return;
      }
      console.log(page);
      // 触发父组件的changePage方法，实现从父组件再修改props,单向数据流
      this.$emit("changePage", page);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.pagination {
  display: flex;
  max-width: 300px;
  list-style: none;
  margin: 25px auto;
  & .pagination__button {
    flex: 1;
    text-align: center;
    color: #0288d1;
    cursor: pointer;
  }
  & .pagination__item {
    flex: 1;
    text-align: center;
    cursor: pointer;
    margin: 0 10px;
  }
  & .pagination__item:hover {
    background-color: #efefef;
  }
  & .pagination__item--active {
    background-color: #efefef;
  }
}
</style>
