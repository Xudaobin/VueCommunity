<template>
  <div class="details">
    <Scroll class="detailsBox" ref="scroll" :data='detailsData'>
      <div class="dataBox">
        <div class="title">
          <h2>{{detailsTitle}}</h2>
          <div class="user">
            <div class="userTw">
            <div class="userImg"><img @load="loadImage()" :src="avatar_url"></div>
            <span>{{loginname}}</span>
            </div>
            <div class="Detailsdate">2天前</div>
          </div>
        </div>
        <div ref="min"></div>
      </div>
    </Scroll>
    <CommIt ref="Commit" :isLove='isLove' :commentsNumber='commentsNumber' @Pin='Pin' @back='back' @collection='AddCollection' iStrue='true'></CommIt>
      <Loading class="detailsLoading" v-show="!avatar_url"></Loading>    
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import axios from 'axios'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import CommIt from '../commit/commit'
  import {IsLodin} from '../../assets/js/js' 
  export  default{
    data() {
      return {
        detailsData: [],
        commentsNumber: 0,
        detailsTitle: '',
        avatar_url: '',
        loginname: '',
        Id: '',
        isLove: false
      }
    },
    computed: {
      ...mapGetters([
        "ItemId"
      ])
    },
    created() {
      if (this.ItemId == '' || null) {
        this.$router.back()
        this.ISDET(false)
      }
      this._getData(this.ItemId)
    },
    mounted() {
     
    },
    methods: {
      _getData(Id) {
        axios(`https://www.vue-js.com/api/v1/topic/${Id}`).then((response) => {
          this.Id = response.data.data.id
          let userData = {
            detailsData : response.data.data.replies,
            commentsNumber : response.data.data.replies.length,
            detailsTitle : response.data.data.title,
            avatar_url : response.data.data.author.avatar_url,
            loginname : response.data.data.author.loginname
          }
          console.log(response)
          this._setData(userData)
          this.$refs.min.innerHTML = response.data.data.content,response
          for (var i = 0; i<this.detailsData.length; i++) {
            this.detailsData[i].create_at = this.detailsData[i].create_at.substring(0,this.detailsData[i].create_at.lastIndexOf('T'))
          }
        }).catch((error) =>{
          console.log(error)
        })
      },
      back() {
        if (!this.$route.query.topic){
          this.ISDET(false)
        }
        this.$router.back()
      },
      Pin() {
        this.SET_DETAILSDATA(this.detailsData)
        this.$router.push({
          path: `/all/review/${this.ItemId}`
        })
      },
      AddCollection() {
        let accesstoken = localStorage.getItem('UserId')
        // 判断是否登录
        if (accesstoken == '' || accesstoken == null || accesstoken == undefined) {
          IsLodin(this, accesstoken)
          return
        }
        let topic_ide = this.Id
        if (this.isLove == false) {
          //收藏话题
          axios.post('https://www.vue-js.com/api/v1/topic/collect',{
            accesstoken: accesstoken,
            topic_id: topic_ide
          }).then((res) => {
            this.isLove = res.data.success
          }).catch((error) => {
            console.log(error)
          })
          return
        }
        // 取消收藏
        axios.post('https://www.vue-js.com/api/v1/topic/de_collect ',{
          accesstoken: accesstoken,
          topic_id: topic_ide
        }).then((res) => {
          this.isLove = false
        }).catch((error) => {
          console.log(error)
        })
      },
      _setData(userData) {
        this.detailsData = userData.detailsData
        this.commentsNumber = userData.commentsNumber
        this.detailsTitle = userData.detailsTitle
        this.avatar_url = userData.avatar_url
        this.loginname = userData.loginname
      },
      loadImage() {
        // 图片加载完毕，从新计算页面高度
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      ...mapMutations({
        SET_DETAILSDATA: "SET_DETAILSDATA",
        ISDET: 'ISDET'
      })
    },
    activated() {
      // 以为app.vue 使用了缓存，这里调用keep-alive 的什么周期钩子函数，重新请求数据，不用缓存
      if (this.ItemId == '' || null) {
         this.$router.back()
         this.ISDET(false)
       }
      this._getData(this.ItemId)
    },
    components: {
      Scroll,
      Loading,
      CommIt
    }
 }
</script>

<style>
  .details{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1000;
  }
  .detailsBox{
    height: 100%;
    width: 92%;
    margin: 0 auto;
  }
  .title h2{
    font-size: .32rem;
    font-weight: 700;
    line-height: .5rem;
    color: #1f2d3d;
    margin: 0.5rem 0 0.6rem 0;
  }
  .user{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.3rem 0;
  }
  .userTw{
    display: flex;
    align-items: center;
  }
  .userImg{
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 0.2rem;
  }
  .userImg img{
    width: 100%;
    height: 100%;
  }
  .Detailsdate{
    color: #d3dce6;
  }
  .details .markdown-text p{
    margin: 0.2rem 0;
    line-height: 0.5rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .detailsBox a{
    display: inline-block;
    color: #ff4081;
  }
  .detailsBox ul{
    margin: 0.3rem 0;
  }
  .detailsBox div{
    line-height: 0.5rem;
  }
  .detailsBox ul li{
    line-height: 0.5rem;
  }
  .detailsBox h2{
    font-size: 0.4rem;
  }
  .details p img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .detailsLoading{
    position: fixed;
    top: 5rem;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .detailsBox code{
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
