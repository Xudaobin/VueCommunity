<template>
    <div class="backBox">
      <div class="bacD back" @click="back"><i class="backi icon iconfont icon-return"></i></div>
      <div class="Liao"><input type="text" placeholder="说点什么吧"></div>
      <div class="bacD Shuo" @click="Pin" v-show="iStrue">
        <i class="Shuoi icon iconfont icon-interactive_fill"></i>
        <div>{{commentsNumber}}</div>
      </div>
      <div class="bacD Xin" @click="collection" v-show="iStrue">
        <i class="Xini icon iconfont icon-like" :class="isLove?'NoLove': 'ILove'"></i>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    commentsNumber: {
      type: Number,
      default: 0
    },
    iStrue: {
      type: String,
      default: ''
    },
    isLove: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    Pin() {
      this.$emit("Pin")
    },
    collection() {
      this.$emit('collection')
    },
    back() {
      this.$emit("back")
    }
  }
}
</script>
<style>
 .backBox{
    width: 100%;
    height: 56px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    box-sizing: border-box;
    box-shadow: 0 0 5px rgb(74, 74,74);
  }
  .backi{
    font-size: 34px;
  }
  .Shuo{
    position: relative;
  }
  .Shuo div{
    position: absolute;
    right: .09rem;
    top: 0.02rem;
    width: 0.3rem;
    height: 0.3rem;
    line-height: .35rem;
    border-radius: 100%;
    background: #e96900;
    text-align: center;
    font-size: .2rem;
    color: #fff;
  }
  .Shuoi{
    font-size: 34px
  }
  .Xini{
    font-size: 34px;
  }
  .Liao{
     flex-grow: 1;
     padding-right: 0.3rem;
  }
  .Liao input[type='text']{
      border: none;
      min-width: 80%;
      height: 42px;
      border: none;
      color: #b2c2d4;
      text-indent: 0.2rem;
     background: #eff2f7;
  }
  .bacD{
    padding: 0.15rem 0.26rem;
  }
  .ILove{
   color: #000;
  }
  .NoLove{
   color: red;
  }
</style>
