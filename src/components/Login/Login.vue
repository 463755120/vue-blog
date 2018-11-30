<template>
  <div class="login">
      <div class="login__header">
          <h1 class="login__title">博客后台登录</h1>
      </div>
      <div class="login__item">
          <el-input v-model="userName" placeholder="请输入内容"></el-input>
      </div>
      <div class="login__item">
          <el-input type="password" placeholder="密码" v-model="password"></el-input>
      </div>
      <div class="login__item">
          <el-button type="primary" @click="login">登录</el-button>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import md5 from "md5";
export default {
  name: "login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userName: "",
      password: ""
    };
  },
  created() {
    console.log()
  },
  methods: {
    ...mapActions(["createToken"]),
    login() {
      let userData = {
        username: this.userName,
        password: md5(this.password).toUpperCase()
      };
      this.createToken(userData)
        .then(res => {
          if (res.success) {
            this.$Message({
              message: "登陆成功",
              type: "success"
            })
            this.$router.push("/admin");
          }else{
            this.$Message.error("登录失败");
          }
        })
        .catch(err => {
          this.$Message.error(err.response.data.error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.login {
  max-width: 640px;
  margin: 150px auto 0 auto;
  & .login__header {
    margin: 0 auto 50px auto;
    text-align: center;
  }
  & .login__item {
    margin-bottom: 10px;
    padding: 0 10px 0 10px;
    & input {
      display: block;
      width: 300px;
      height: 50px;
      border: 1px solid;
      margin: 0 auto;
      padding-left: 10px;
    }
    & button {
      width: 300px;
      height: 50px;
      margin: 20px auto;
      display: block;
    }
  }
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
}
</style>
