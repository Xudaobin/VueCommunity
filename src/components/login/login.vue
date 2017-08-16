<template>
  <div class="login">
      <div class="loginInp">
        <i class="icon iconfont icon-mima"></i>
        <div><input type="text" placeholder="accessToken" v-model="userAccess"></div>
      </div>
      <div class="loginBtn">
        <button @click="registered">注册</button>
        <button class="logIn" @click="logIn">登录</button>
      </div>
      <div class="loginHelp">
        <i class="icon iconfont icon-wenhao-yuankuang"></i>
        <p @click="GetToke">如何获取 accessToken?</p>
      </div>
      <div class="error" ref="Error">access错误</div>
      <div class="succer" ref="succer">验证成功</div>
      <div class="getToke" :class="GetBoll? 'GetBoll': 'GetBollf'">
        <p>1、先去<a href="https://www.vue-js.com/signup">社区</a>注册一个账户吧</p>
        <p>2、进入邮箱激活账户后登录进入设置</p>
        <p>3、拉动到最底部，复制accessToken</p>
        <p>4de200d2-f277-4bcc-910c-f9ffba44dd6b</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapGetters} from 'vuex'
import {alterr} from '../../assets/js/js'
export default {
  data() {
    return {
      userAccess: '',
      UserId: '',
      GetBoll: false
    }
  },
  created() {
    this.userAccess = localStorage.getItem('UserId')
  },
  computed: {
    ...mapGetters([
      "GoWei"
    ])
  },
  methods: {
    logIn() {
      if (this.userAccess === null || this.userAccess == '') {
        // 弹出验证AccessToken 信息
        alterr(this.$refs.Error, 900)
        return
      }
      axios.post('https://www.vue-js.com/api/v1/accesstoken', {
          accesstoken: this.userAccess
      }).then((response) => {
        let UserData = JSON.stringify(response.data)
        // 将用户信息及accessToken保存进 localStorage
        localStorage.setItem('UserData', UserData)
        localStorage.setItem('UserId', this.userAccess)
        alterr(this.$refs.succer, 900, this.RoutPush)
      }).catch((error) => {
        alterr(this.$refs.Error, 900)
        console.log(error)
      })
    },
    RoutPush() {
      if (this.GoWei) {
        this.$router.push({
          path: '/unread'
        })
        return
      }
      this.$router.push({
        path: '/user'
      })
    },
    registered() {
      window.location.href = 'https://www.vue-js.com/signup'
    },
    GetToke() {
      this.GetBoll = (this.GetBoll == false) ? true:false
    }
  }
}
</script>

<style scoped>
.login{
 position: fixed;
 width: 100%;
 top: 1.7rem;
}
.loginInp{
  display: flex;
  align-items: center;
  justify-content: space-between;
   margin: 0 1rem;
}
.loginInp i{
  font-size: .4rem;
  font-weight: bold;
}
.loginInp div{
  width: 3.8rem;
  border-bottom: 1px solid rgba(0,0,0,.24);
}
.loginInp input[type='text'] {
      -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    background: none;
    border-radius: 0 0 0 0;
    box-shadow: none;
    display: block;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 32px;
    border-radius: .5rem;
    font-style: inherit;
    font-variant: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    font-size: inherit;
    color: rgba(0,0,0,.87);
    font-family: inherit;
    position: relative;
}
.loginBtn{
   margin: 0 1rem;
  margin-top: .4rem;
}
.loginBtn button{
    border-radius: 2px;
    border: none;
    width: 100%;
    height: .6rem;
    background-color: #fff;
    box-shadow: 0 1px 4px #c6c8c5;
    margin-top: 0.3rem;
    color: #333;
}
.loginBtn button:last-of-type{
    color: #fff;
    background-color: rgb(65, 184, 131)
}
.loginHelp{
  display: flex;
  align-items: center;
   margin: 0 .5rem;
  margin-top: .7rem;
}
.loginHelp i{
  font-size: .3rem;
  color: rgb(233, 105, 0);
}
.loginHelp p{
  margin-left: 0.2rem;
}
.error{
  width: 90%;
  height: 1.5rem;
  position: fixed;
  background-color: rgb(233, 105, 0);
  top: 10%;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 0.5rem;
  transition: all .5s;
  text-align: center;
  line-height: 1.5rem;
  color: #fff;
  font-size: 0.37rem;
  transform: scale3d(0,0,0)
}
.succer{
   width: 90%;
  height: 1.5rem;
  position: fixed;
  background-color: rgb(65, 184, 131);
  top: 10%;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 0.5rem;
  transition: all .5s;
  text-align: center;
  line-height: 1.5rem;
  color: #fff;
  font-size: 0.37rem;
  transform: scale3d(0,0,0)
}
.andOk{
  transform: scale3d(1,1,1)
}
.getToke{
  margin: 0 1rem;
  margin-top: 0.2rem;
  color: rgb(233, 105, 0);
  line-height: 0.5rem;
  transition: all .5s;
}
.GetBoll{
  transform: scale3d(1)
}
.GetBollf{
  transform: scale3d(1, 0, 0)
}
</style>
