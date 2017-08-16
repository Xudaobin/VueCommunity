<template>
  <div class="message">
      <div class="messageImg">
          <img src="" />
      </div>
      <h4 class="messageText">登陆后可查看未读消息</h4>
      <button @click="goLin" class="logInBtn">登录</button>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  methods: {
    goLin() {
      this.GOWEI(true)
      this.$router.push({
        path: '/login'
      })
      },
    ...mapMutations({
      GOWEI: 'GOWEI'
    })
  },
}
</script>


<style scoped>
 .messageImg{
     width: 1.5rem; 
     height: 1.5rem;
     border-radius: 50%;
     background: url(http://wx1.sinaimg.cn/mw690/0068NTeNgy1fi39026f3rj30go0cgwez.jpg) no-repeat center;
     margin: 0 auto;
     background-size: cover;
     margin-top: 1.8rem;
 }
 .messageText{
     font-size: .3rem;
     font-weight: 100;
     margin: 0 auto;
     color: #475669;
     text-align: center;
     margin: 0.3rem 0;
 }
 .logInBtn{
     display: block;
     width: 2.2rem;
     height: .5rem;
     background-color: rgb(65, 184, 131);
     color: #fff;
     border: none;
     border-radius: 0.05rem;
     margin: 0 auto;
 }
</style>
