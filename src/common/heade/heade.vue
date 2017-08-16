<template>
   <div class="my-header">
      <div class="my-header-img">
        <img src="../../assets/img/logo.png">
      </div>
      <div class="my-header-btn">
        <button @click="goReleas">发布</button>
      </div>
  </div>
</template>

<script>
import {IsLodin} from '../../assets/js/js'
export default {
   methods: {
    goReleas() {
      let LUserId = localStorage.getItem('UserId')
      if (LUserId =='' || LUserId == null || LUserId == undefined)
        IsLodin(this, LUserId)
        this.$router.push({
          path: '/releas'
        })
    }
   }
}
</script>


<style>
.my-header {
     width: 100%;
     height: 56px;
     background-color: #41b883;
     position: relative;
     display: flex;
     justify-content: flex-end;
     align-items: center;
 }
 
 .my-header-img {
     width: 30px;
     height: 30px;
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
 }
 
 .my-header-img img {
     width: 100%;
     height: 100%;
 }
 
 .my-header-btn button {
     display: block;
     background-color: transparent;
     border: none;
     color: #fff;
 }
</style>
