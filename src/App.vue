<template>
  <div id="app">
    <div class="wrap">
      <transition name="fade" mode="out-in">
          <!-- keep-alive排除article -->
        <router-view>
        </router-view>
      </transition>
    </div>
    <footer class="footer">
        <!-- <p>Copyright © <a href='https://github.com/BUPT-HJM'>BUPT-HJM</a>&nbsp;&nbsp;2017 </p>
        <p>Created by <a href="https://github.com/BUPT-HJM/vue-blog.git">vue-blog</a></p> -->
    </footer>
  </div>
</template>

<script>
import Top from "./components/Top/Top";
import "./style/base.css";
export default {
  name: "App",
  components: {
    Top
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
a {
  color: black;
  text-decoration: none;
}
</style>
