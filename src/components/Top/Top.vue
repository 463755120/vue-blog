<template>
  <header class="top-header">
      <img @click.stop="handelSide" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAADlJREFUWMPt08ERACAIBDEomvqxBh18EQogn9us+HsJAAAAt0BPfQU8A2YKULKSdQAQmpIBAMBm4AAtdCIhmRB8RAAAAABJRU5ErkJggg==" alt="" class="menu-button" >
      <router-link to="/" class="top-header-link">zhigang's Blog</router-link>
      <div v-if="userInfo" class="userInfo">
        <router-link to="/admin" class="admin">hi,{{userInfo}}</router-link>
        <p class="quit" @click="quit">退出</p>
      </div>
      <router-link v-else to="/login" class="userInfo">{{msg}}</router-link>
    </header>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Top",
  data() {
    return {
      msg: "好想写博客",
      userName:""
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      console.log("这是头部");
    },
    handelSide(){
      this.setShowSideState(!this.showSide)
    },
    quit(){
      this.quit()
    },
    ...mapMutations({
     setShowSideState:'SET_SHOWSIDE_STATE',
     quit:'DELETE_TOKEN',
    })
  },
  computed:{
    ...mapGetters([
      'showSide',
      'userInfo'
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
:root {
  --mianColor: #0288d1;
}
.top-header {
  position: fixed;
  top: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  padding: 0 40px 0 40px;
  background: white;
  z-index: 3;
  & .top-header-link {
    color: var(--mianColor);
    font-weight: 600;
    font-size: 20px;
  }
  & .menu-button {
    position: absolute;
    left: 10px;
    top: 50%;
    width: 32px;
    height: 32px;
    margin-top: -16px;
    display: none;
  }
  & .userInfo{
    position: absolute;
    right: 10px;
    top: 50%;
    width: 246px;
    height: 32px;
    margin-top: -16px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .quit {
      margin-left: 18px;
      cursor: pointer;
    }
    & .admin {
      cursor: pointer;
    }
  }
}
@custom-media --small-viewport (max-width: 850px);

@media (--small-viewport) {
  .top-header {
    text-align: center;
    padding: 0;
    & .menu-button {
      display: block;
    }
    & .userInfo{
       width: 84px;
    }
  }
}
</style>
