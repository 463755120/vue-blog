<template>
  <div class="sideBox">
    <div class="sideBox__mask" :class="{ 'sideBox__mask--show': showSide}"></div>
    <div class="sideBox__main" :class="{ 'sideBox__main--open': showSide}">
      <slot>
        <img src="https://img.imhjm.com/touxiang.png" alt class="sideBox__img">
        <p class="side_name">宇智波.志刚</p>
        <div class="side_motto">
          &nbsp &nbsp 三甲医院降生，真-共产主义接班人，战争学院不屈白银，火锅微辣布道师，
          易健身卡拥有者，不撸者，雾霾鉴赏专家，淘宝高级会员，华图教育前端
        </div>
        <ul class="sideBox__iconList">
          <li v-for="icon in iconList" class="sideBox__iconItem" :key="icon.name">
            <a class="sideBox__link" :href="icon.href" target="_blank">
              <i class="iconfont" :class="'icon-'+icon.name"></i>
            </a>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
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
  },
  computed: {
    ...mapGetters(["showSide"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.sideBox {
  width: 250px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
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
    color: #999;
    margin-bottom: 8px;
    height: auto;
    line-height: 20px;
    width: 195px;
    text-align: left;
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
@custom-media --small-viewport (max-width: 850px);

@media (--small-viewport) {
  .sideBox {
    position: absolute;
    top: 0;
    left: 0;
    & .side_motto {
      margin-left: 38px;
    }
    & .sideBox__main {
      position: fixed;
      left: 0px;
      top: 60px;
      bottom: 0;
      width: 250px;
      transform: translateX(-250px);
      transition: transform 0.3s;
      background-color: #e5e4e4;
      overflow-x: hidden;
      overflow-y: auto;
    }
    & .sideBox__main--open {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      z-index: 2;
      transform: translateX(0px);
      transition: transform 0.3s;
    }
    & .sideBox__mask {
      position: fixed;
      top: 60px;
      left: 250px;
      right: 0;
      bottom: 0;
      display: block;
      z-index: 1;
      display: none;
    }
    & .sideBox__mask--show {
      display: block;
    }

    & .sideBox__tagItem:hover {
      color: grey;
    }

    & .sideBox__tagItem--active:hover {
      color: blue;
    }

    .categoryBox--fixed {
      position: static;
      width: auto;
    }
  }
}
</style>
