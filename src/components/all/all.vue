<template>
  <div class="recommend">
    <ul class="tab" ref="tabUl" @click="ajaxDate">
      <li data-text="all" class="allL my-tap">全部</li>
      <li data-text="good" class="essence my-tap">精华</li>
      <li data-text="weex" class="weex my-tap">weex</li>
      <li data-text="share" class="share my-tap">分享</li>
      <li data-text="ask" class="answer my-tap">问答</li>
      <li data-text="job" class="recruitment my-tap">招聘</li>
    </ul>
    <Scroll @scroll="scroll" @scrollEnd="scrollEnd" :data="allData" ref="scroll" class="recommend-content">
      <Min :data="allData" @Details="Details" @GenDuo="GenDuo" :foo="foo"></Min>
      <div class="allLoading" ref="loading" v-show="!allData.length">
        <Loading></Loading>
      </div>
    </Scroll>
    <transition :name='Xiang'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'
import Min from '../min/min'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { dateConversion } from '../../assets/js/js'
export default {
  data () {
    return {
      allData: [],
      scrollY: 0,
      formData: {
        limit: 20,
        page: 1,
        tab: this.Wexall || 'all'
      },
      foo: '加载更多...',
      Xiang: 'Xiang'
    }
  },
  created () {
    setTimeout(() => {
      this._getAll()
    }, 20)
  },
  mounted () {
  },
  methods: {
    _getAll () {
      this.getList(this.formData).then(res => {
        let list = res.data
        if (list.length) {
          list.forEach(v => {
            v.create_at = v.create_at.substring(0, v.create_at.lastIndexOf('T'))
            this.allData.push(v)
          })
          this.foo = '加载更多....'
        } else if (list.length === 0) {
          this.foo = '别点啦,没有啦！'
        }
      })
    },
    GenDuo () {
      this.formData.page += 1
      this._getAll()
    },
    Details () {
      // 跳转进入 详情页 通过vuex 获取了页面的ID
      this.$router.push({
        path: `/all/${this.ItemId}`
      })
    },
    scroll (pos) {
      this.scrollY = pos.y
      if (pos.y > 1) {
        this.$refs.loading.style.display = 'block'
      }
    },
    scrollEnd (pos) {
      if (this.$refs.loading.style.display == 'block') {
        this.$refs.loading.style.top = '104px'
        //下拉完刷新
        setTimeout(() => {
          this.reset()
          this._getAll()
        }, 500)
        this.$refs.loading.style.display = 'none'
        //将数据清空
      }
    },
    ajaxDate (e) {
      // 将点击的模块名字 保存到vuex
      this.SetWexall(e.target.attributes['data-text'].nodeValue)
      this.reset()
      this._getAll()
    },
    reset () {
      this.formData = {
        limit: 20,
        page: 1,
        tab: this.Wexall || 'all'
      }
      this.formData.page = 1
      this.allData = []
    },
    ...mapMutations({
      SetWexall: 'SET_WEXALL'
    }),
    ...mapActions([
      'getList'
    ])
  },
  computed: {
    ...mapGetters([
      'Wexall',
      'ItemId'
    ])
  },
  components: {
    Scroll,
    Loading,
    Min
  },
  watch: {
    scrollY (newY) {
      if (newY > 1) {
        this.$refs.loading.style.top = newY - 10 + 'px'
      }
    }
  }
}

</script>
<style>
@import "../../assets/css/body.css";
.allLoading {
  position: absolute;
  top: 104px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: all .5s;
}

.tab {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 999;
  background-color: #fff;
  color: rgba(31, 45, 61, .7);
}

.my-tap {
  padding: 12px 5px;
  text-align: center;
  flex-grow: 1;
}

.Xiang-enter,
.Xiang-leave-active {
  opacity: 0;
  transform: translate3d(25%, 0, 0);
}

.Xiang-enter-active,
.Xiang-leave-active {
  transition: all .5s cubic-bezier(0.4, 0, 0, 1);
}
</style>
