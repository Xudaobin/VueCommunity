<template>
  <div class="userBox">
    <div class="userTitle">
      <div class="userTou"><img :src="Y_UserData.avatar_url"></div>
      <div class="userZi">
          <h3>{{Y_UserData.loginname}}</h3>
          <div>ID:{{Y_UserData.id}}</div>
      </div>
      <div class="userJi">
          <i class="icon iconfont icon-VIP"></i>
          <span>{{C_score}}</span>
      </div>
    </div>
    <div class="huatiBox" @click="GoTopic($event)" >
        <div class="userShou huati" data-type='collect_topics'>
            <i class="icon iconfont icon-favorites"></i>
            <span>我收藏的话题<b v-show="C_collectLength">{{C_collectLength}}</b></span>
            <span class="icon iconfont icon-gengduo"></span>
        </div>
        <div class="userHua huati" data-type='recent_replies'>
            <i class="icon iconfont icon-message"></i>
            <span>我参与的话题<b v-show="C_repliesLength">{{C_repliesLength}}</b></span>
            <span class="icon iconfont icon-gengduo"></span>
        </div>
        <div class="userZui huati"  data-type='recent_topics'>
            <i class="icon iconfont icon-zuixinlianzai"></i>
            <span>我最近的话题<b v-show="C_topicsLength">{{C_topicsLength}}</b></span>
            <span class="icon iconfont icon-gengduo"></span>
        </div>
    </div>
   
    <div class="userexit" @click="exitUser">退出登录</div>
    <div class="exitText" ref="Exit">退出成功</div>
    <transition :name="Tname">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {alterr} from '../../assets/js/js'
import axios from 'axios'
export default {
  data() {
    return {
      Y_UserData: {},
      getUserData:{},
      collectLength: 0,
      repliesLength: 0,
      topicsLength: 0,
      score: 0,
      Tname: 'Zui'
    }
  },
  created() {
    this._getUserData()
  },
  methods: {
    exitUser() {
      localStorage.removeItem('UserId')
      localStorage.removeItem('UserData')
      alterr(this.$refs.Exit, 900, this.RoutPush)
    },
    _getUserData() {
      let UserData = localStorage.getItem('UserData')
      UserData = JSON.parse(UserData)
      this.Y_UserData = UserData
      axios.get(`https://www.vue-js.com/api/v1/user/${this.Y_UserData.loginname}`).then((res) => {
        let resData = res.data.data
        this.getUserData = resData
        this.collectLength = resData.collect_topics.length
        this.repliesLength = resData.recent_replies.length
        this.topicsLength = resData.recent_topics.length
        this.score = resData.score
        this.USERDATA(resData)
      })  
    },
    RoutPush() {
      this.$router.push({
        path: '/login'
      })
    },
    GoTopic(e) {
      let topicType = ''
      // 此处有 bug 待修复
      try{
        topicType = e.target.parentNode.attributes['data-type'].nodeValue
      }catch(err){
        topicType = e.target.parentNode.parentNode.attributes['data-type'].nodeValue
      }
      // 跳转进入 话题页面,传入了一个参数用来判断是进那个页面
      this.$router.push({
        path: `/user/topic/${topicType}`,
        query: {topicType: topicType}
      })
      this.IsDet(true)
    },
    ...mapMutations({
      USERDATA: 'USERDATA',
      IsDet: 'ISDET'
    })
  },
  activated() {
    //keep-alive 的钩子函数，此为不缓存
    // this._getUserData()
  },
  computed: {
    C_collectLength() {
      return this.collectLength
    },
    C_repliesLength() {
      return this.repliesLength
    },
    C_topicsLength() {
      return this.topicsLength
    },
    C_score() {
      return this.score
    }
  }
}
</script>

<style scoped>
    .userBox{
        position: fixed;
        top: 1.2rem;;
        width: 100%;
    }
    .userTitle{
        background-color: #fff;
        padding: 0.15rem 0.2rem;
        display: flex;
        align-items: center;
        position: relative;
    }
    .userTou{
        margin-right: 0.2rem;
        border-radius: 100%;
        overflow: hidden;
    }
    .userZi{
        line-height: 0.4rem;
    }
    .userJi{
        position: absolute;
        right: 0.2rem;
        top: 0.15rem;
    }
    .userJi i{
         color: rgb(255, 235, 59);
    }
    .huatiBox{
        border-top: 1px solid #e5e9f2;
        border-bottom: 1px solid #e5e9f2;
        margin-top: 0.4rem;
    }
    .huati{
        background-color: #fff;
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
     .huati span{
         position: relative;
     }
    .huati span:nth-of-type(1){
        flex-grow: 1;
        padding: 0.2rem 0;
        margin-left: 0.2rem;
        border-bottom: 1px solid #e5e9f2;
        height: 100%;
    }
    .huati span b{
         position: absolute;
        top: 50%;
        right: 8px;
        -webkit-transform: translate3d(0,-50%,0);
        transform: translate3d(0,-50%,0);
        width: .4rem;
        height: .4rem;
        line-height: .45rem;
        text-align: center;
        font-size: .2rem;
        color: #324057;
        border-radius: 100%;
        background: #e5e9f2;
    }
    .huati:last-child span:nth-of-type(1){
        border:none;
    }
    .huati i{
        font-size: 0.3rem;
    }
    .userShou i{
        color:  rgb(255, 235, 59);
    }
    .userHua i{
        color: rgb(0, 152, 218);
    }
    .userZui i{
        color: rgb(248, 97, 97);
    }
    .userexit{
        background-color: #fff;
        padding: 0.2rem 0;
        text-align: center;
        margin-top: 0.3rem;
    }
    .exitText{
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
    .andOk{
        transform: scale3d(1,1,1)
    }
    .Zui-enter,.Zui-leave-active{
        opacity: 0;
        transform: translate3d(0,100%,0);
    }
    .Zui-enter-active,.Zui-leave-active{
        transition: all .5s ease;
    }
</style>
