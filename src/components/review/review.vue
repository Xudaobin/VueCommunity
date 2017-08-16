
<template>
  <div class="review">
    <Scroll class="reviewBox" :data="detailsData">
      <div class="reviewDataBox">
        <div class="reviewTitle">5条评论</div>
        <ul class="reviewUl" v-for="item in detailsData">
            <li class="reviewLi">
                <div class="reviewUserImg">
                    <img v-lazy="item.author.avatar_url">
                </div>
                <div class="reviewUserText">
                    <div class="reviewUsernmae">{{item.author.loginname}}</div>
                    <div class="reviewUsernameDate">{{item.create_at}}</div>
                    <div class="reviewUsernameText" v-html="item.content"></div>
                </div>
                <div class="reviewUserZan"><i class="icon iconfont icon-praise_fill"></i>{{item.ups.length}}</div>
            </li>
        </ul>
      </div>
    </Scroll>
    <CommIt @back='back'></CommIt>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '../../base/scroll/scroll'
import CommIt from '../commit/commit'
export default {
  data() {
    return {
      detailsData: []
    }
  },
  created() {
    Object.assign(this.detailsData, this.DetailsData)
    if (this.detailsData.length == 0) {
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters([
      'DetailsData'
    ])
  },
  methods: {
   back() {
     this.$router.back()
   }
  },
  components: {
    Scroll,
    CommIt
  }
}

</script>

<style>
    .review{
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 1000;
        background-color: rgb(239, 242, 247)
    }
    .reviewBox{
        height: 100%;
        width: 92%;
        margin: 0 auto;
    }
    .reviewDataBox{

    }
    .reviewTitle{
        position: relative;
        width: 100%;
        padding: .32rem;
        box-sizing: border-box;
        text-indent: .2rem;
    }
    .review .reviewTitle:before {
        display: block;
        content: "";
        position: absolute;
        left: .32rem;
        top: 50%;
        -webkit-transform: translate3d(0,-50%,0);
        transform: translate3d(0,-50%,0);
        width: 4px;
        height: .28rem;
        background: #e96900;
    }
    .reviewLi{
        display: flex;
        padding: 0.35rem 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        margin: 0.2rem 0;
    }
    .reviewUserImg {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 100%;
      overflow: hidden;    
      margin-right: 0.25rem;
    }
    .reviewUserImg img{
        width: .75rem;
        height: .75rem;
    }
    .reviewUserText{
        width: 90%;
    }
    .reviewUsernmae{
        font-size: 0.3rem;
        font-weight: bold;
        margin: 0 0 0.09rem 0;
    }
    .reviewUsernameDate{
        font-size: 0.2rem;
        color: #7588a1;
        margin-bottom: 0.05rem;
    }
    .reviewUsernameText{
        margin: 0 0.2rem;
        margin-top: 0.1rem;
        margin-bottom: 0.2rem;
    }
    .reviewUserZan{
        position: absolute;
        top: 0.35rem;
        right: 0.6rem;
        color: #475669;
    }
    .reviewUserZan i{
        color: rgb(211, 220, 230);
        vertical-align: middle;
    }
    .review p{
        white-space: pre-wrap;
        word-break: break-all;
    }
</style>
