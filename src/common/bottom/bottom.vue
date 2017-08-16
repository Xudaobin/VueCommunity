<template>
<div class="Buttom">
      <router-link class="buttom-btn" tag="div" to="/all">
          <i class="icon iconfont icon-BAI-xiaoxi"></i>
          <span>话题</span>
      </router-link>
      <div class="buttom-btn" @click="MLogin">
          <i class="icon iconfont icon-BAI-youjian"></i>
          <span>未读消息</span>
      </div>
      <div class="buttom-btn"   @click="Login">
          <i class="icon iconfont icon-BAI-wode"></i>
          <span>我的</span>
      </div>
  </div>  
</template>

<script>
export default {
  methods: {
    Login(e) {
      let LUserId = localStorage.getItem('UserId')
      if (LUserId === null || LUserId === '' || LUserId=== undefined){
        this.$router.push({
          path: '/login'
        })
        return
      }
       this.$router.push({
         path: '/user'
       })
      },
    MLogin() {
      let LUserId = localStorage.getItem('UserId')
      if (LUserId === null || LUserId === '' || LUserId=== undefined){
        this.$router.push({
          path: '/message'
        })
        return
       }
      this.$router.push({
        path: '/unread'
      })
    }
  }
}
</script>
<style>
.Buttom {
     width: 100%;
     height: 56px;
     background-color: #1F2D3D;
     display: flex;
     position: absolute;
     bottom: 0;
     justify-content: space-around;
     align-items: center;
 }
 
 .buttom-btn {
     width: 33%;
     padding: 6px 5px 5px 5px;
     display: flex;
     flex-direction: column;
     align-self: center;
     text-align: center;
     color: #fff;
     font-size: 12px;
 }
 
 .buttom-btn i {
     color: #fff;
     display: block;
     font-size: 30px;
 }
</style>
