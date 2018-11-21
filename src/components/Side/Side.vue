<template>
<div class="side">
  <img src="https://img.imhjm.com/touxiang.png" alt="" class="sideBox__img">
  <p class="side_name">宇智波.志刚</p>
  <p class="side_motto">广告位招租</p>
  <ul class="sideBox__iconList">
      <li v-for="icon in iconList" class="sideBox__iconItem" :key="icon.name">
          <a class="sideBox__link" :href="icon.href" target="_blank"><i class="iconfont" :class="'icon-'+icon.name"></i></a>
      </li>
  </ul>
</div>
</template>

<script>
import axios from "axios";
import "../../assets/iconfont/iconfont.css";
export default {
  name: "Side",
  data() {
    return {
      iconList: [
        {
          name: "github",
          href: "https://github.com/463755120"
        },
        {
          name: "zhihu",
          href: "https://www.zhihu.com/people/wang-pang-dan/activities"
        }
      ]
    };
  },
  created() {
    // this.getdata();
  },
  methods: {
    getdata() {
      this.$get("/api/test").then(res => {
        console.log("请求成功");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.side {
  width: 250px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  & img {
    width: 150px;
    border-radius: 50%;
    box-shadow: 0 0 2px #000;
    margin-top: 10px;
    cursor: pointer;
  }
  & .side_name {
    color: gray;
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  & .side_motto {
    color: #bfbfbf;
    margin-bottom: 8px;
  }
  & .sideBox__iconList {
    list-style: none;
    margin-bottom: 8px;
    padding: 0;
    & .sideBox__iconItem {
      display: inline-block;
      cursor: pointer;
      & .sideBox__link {
        color: grey;
        margin-left: 4px;
        margin-right: 4px;
        & .iconfont {
          font-size: 28px;
        }
        & .iconfont:hover {
          color: black;
        }
      }
    }
  }
}
</style>
