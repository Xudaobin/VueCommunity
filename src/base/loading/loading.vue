<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return　{
        title: '正在载入...'
      }
    }
  }
</script>

<style>
  .loading{
    width: 100%;
    text-align: center;
  }
  .loading img{
    width: 24px;
    height: 24px;
  }
  .desc{
    line-height: 20px;
    font-size: 14px;
    color: #000;
  }
</style>
