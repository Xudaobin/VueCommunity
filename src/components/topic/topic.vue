<template>
  <div class="topic">
      <h3 class="topicTitle"><i @click="backr" class="icon iconfont icon-close"></i><span>{{topicTitle}}({{topicsData.length}})</span></h3>
      <Scroll class="topic-content">
        <ul class="topicUl">
          <li class="topicLi" v-for="item in topicsData" @click="topicDetails($event)" :data-val='item.id' :key="item.id">
            <div class="topicImg"><img v-lazy="item.author.avatar_url" /></div>
            <div class="topicText">{{item.title}}</div>
            <div class="topicDate">
              <span>{{item.author.loginname}}</span>
              <b>4天前</b>
            </div>
          </li>
        </ul>
       <div v-show="!topicsData.length" class="NoData">这里空空如也，快去逛逛吧</div>
      </Scroll>
  </div>
</template>

<script>
import Scroll from '../../base/scroll/scroll'
import {mapMutations, mapGetters} from 'vuex'
export default {
  data() {
    return{
      topicsData: [],
      topicTitle: ''
    }
  },
  created() {
    this._getData()
    if (this.topicsData == [] || this.topicsData ==undefined || this.topicsData == null) {
      this.backr()
    }
  },
  methods: {
    backr() {
      this.ISDET(false)
      this.$router.back()
    },
    _getData() {
      let topicType =  this.$route.query.topicType
       switch (topicType) {
        case 'collect_topics':
        this.topicsData = this.UserData.collect_topics
        this.topicTitle = '我收藏的话题'
        break;
        case 'recent_replies':
        this.topicsData = this.UserData.recent_replies
        this.topicTitle = '我参与的话题'
        break;
        case 'recent_topics':
        this.topicsData = this.UserData.recent_topics
        this.topicTitle = '我最近的话题'
        break;
      }
    },
    topicDetails(e) {
      this.SET_ITEMID(e.currentTarget.dataset.val)
      this.$router.push({
        path: `/all/${this.ItemId}`,
        query: {topic: true}
      })
    },
    ...mapMutations({
      ISDET: 'ISDET',
      SET_ITEMID: 'SET_ITEMID'
    })
  },
  computed: {
    ...mapGetters([
      'UserData',
      'ItemId'
    ])
  },
  components: {
    Scroll
  }
}
</script>

<style>
.topic{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgb(239, 242, 247);
}
.topic-content{
    height: 100%;
    overflow: hidden;
}
.topicTitle{
  height: 1rem;
  background-color: #41b883;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  display: flex;
  align-items: center;
  padding: 0 0.2rem;
  color: #fff;
  font-size: 0.3rem;
}
.topicTitle i{
  font-size: 22px;
  margin-top: 0.05rem;
  padding: 0.25rem;
}
.topicLi{
  background-color: #fff;
  padding: 0.3rem 0.25rem;
  overflow: hidden;
  margin: 0.2rem 0;
}
.topicImg{
  width: 20%;
  height: 100%;
  float: left;
  position: relative;
  top: 50%;
  transform: translateY(10%);
}
.topicImg img{
  border-radius: 100%;
  width: .88rem;
  height: .88rem;
}
.topicText{
  width: 80%;
  height: 0.7rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 0.35rem;
  float: left;
}
.topicDate{
  float: left;
  color: #92a8c1;
  width: 80%;
}
.topicDate span{
  display: inline-block;
  margin-right: 0.1rem;
  margin-top: 0.1rem;
}
.NoData{
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
  font-size: 0.3rem;
}
</style>
