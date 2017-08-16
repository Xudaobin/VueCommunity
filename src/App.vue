<template>
  <div id="app">
      <MyHeader  v-show="!IsDet"></MyHeader>
      <transition :name="app">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      <MyBottom v-show="!IsDet"></MyBottom>
  </div>
</template>

<script>
  import rem from './assets/js/rem'
  import MyBottom from './common/bottom/bottom'
  import MyHeader from './common/heade/heade'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        app: 'all'
      }
    },
    computed: {
      ...mapGetters([
        'IsDet',
        'ItemId'
      ])
    },
    components: {
      MyBottom,
      MyHeader  
    },
    watch: {
      // 检测那个路由过来，分别给出不同的动画
      '$route' (to, from) {
        if (to.query.type) {
          this.app = 'unread'
          return
        }else if(to.path =='/releas'){
          this.app = 'releas'
          return
        }
        this.app = 'all'
      }
    }
  }
</script>

<style>
  @import "./assets/css/publicStyle.css";
  @import url('http://at.alicdn.com/t/font_nsen2cixyctyb9.css');
  #app{
    width: 100%;
    height: 100%;
    background-color: #eff2f7;
  }
  .all-enter,.all-leave-active{
      opacity: 0;
  }
  .all-enter-active,.all-leave-active{
      transition: all .25s ease;
  }
  .unread-enter,.unread-leave-active{
    opacity: 0;
    transform: translate3d(25%,0,0);
  }
  .unread-enter-active,.unread-leave-active{
    transition: all .5s cubic-bezier(0.4, 0, 0, 1);
  }
  .releas-enter,.releas-leave-active{
    opacity: 0;
    transform: translate3d(0,100%,0);
  }
  .releas-enter-active,.releas-leave-active{
    transition: all .5s cubic-bezier(0.4, 0, 0, 1);
  }
</style>
