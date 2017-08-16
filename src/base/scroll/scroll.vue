<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      },20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        //初始化 bscroll
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
            click: this.click
          })
          let me = this
          // 内容滚动 派发一个事件
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
          // 滚动完 派发一个时间
          this.scroll.on('touchend', (pos) => {
            me.$emit('scrollEnd', pos)
          })
      },
      enable() {
        this.scr && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }


</script>

<style>

</style>
