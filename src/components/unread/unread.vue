<template>
  <div class='unread'>
    <div class="newmes">
        <div class="newmesTitle">新消息({{hasnot_read.length}}) <span @click="read">全部已读</span></div>
        <ul class="newUl" v-for="hasNo in hasnot_read">
            <li :data-id='hasNo.topic.id' @click="U_Details($event)" :key="hasNo.topic.id">
                <div>来自 {{hasNo.author.loginname}}<span>18分钟前</span></div>
                <h3>回复:  {{hasNo.reply.content}}</h3>
                <span class="mintitle">{{hasNo.topic.title}}</span>
            </li>
        </ul>
        <div class="noHas" v-show="!hasnot_read.length">没有新消息，快去和小伙伴交流吧~！</div>
    </div>
    <div class="readmes">
         <div class="newmesTitle newmesTitle2">已读消息({{has_read.length}})</div>
         <ul class="newUl readmesUL" v-for="hasItem in has_read">
             <li :data-id='hasItem.topic.id'  @click="U_Details($event)" :key="hasItem.topic.id">
                <div>来自 {{hasItem.author.loginname}}<span>18分钟前</span></div>
                <h3>{{hasItem.topic.title}}</h3>
             </li>
         </ul>
    </div>
     <!-- <LodIn class="logdin" v-show="!has_read.length"></LodIn>  -->
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
// import LodIn from '../../base/loading/loading'
import {IsLodin} from '../../assets/js/js'
export default {
  data() {
    return {
      UserId: '',
      has_read: [],
      hasnot_read: []
    }
  },
  created() {
    // 延迟0.2毫秒 以免遇到数据无法获取
    setTimeout(() => {
      let Id = localStorage.getItem('UserId')
      if (Id == '' || Id == null || Id == undefined) {
        IsLodin(this, Id)
        return
      }
      this._getData(Id)
      this.GOWEI(false)
    }, 20);

  },
  methods: {  
    _getData(id) {
      axios.get('https://www.vue-js.com/api/v1/messages', {
        params:{accesstoken: id}
      }).then((res) => {
        console.log(res)
        this.has_read = res.data.data.has_read_messages
        this.hasnot_read = res.data.data.hasnot_read_messages
      })
    },
    U_Details(e) {
      this.ISDET(true)
      this.SET_ITEMID(e.currentTarget.dataset.id)
      this.$router.push({
        path: `/all/${e.currentTarget.dataset.id}`,
        query: {type: 'unread'}
      })
    },
    read() {
      if (this.hasnot_read.length > 0) {
        console.log(this.hasnot_read)
        let Id = localStorage.getItem('UserId')
        axios.post('https://www.vue-js.com/api/v1/message/mark_all',{
          accesstoken: Id
        }).then((res) => {
          // 将未读消息加入 已读
          for (let i in this.hasnot_read) {
            this.has_read.push(this.hasnot_read[i])
          }
          // this.has_read = this.has_read.concat(this.hasnot_read)
          this.hasnot_read = []
        }).catch((error) => {
            console.log(error)
        }) 
        return
      }
      alert('没有未读消息')    
    },
    ...mapMutations({
      GOWEI: 'GOWEI',
      SET_ITEMID: 'SET_ITEMID',
      ISDET: 'ISDET'
    })
   }
}
</script>


<style scoped>
  .unread{
      height: 100%;
      width: 100%;
      overflow-y: scroll;
  }
  .newmesTitle{
      width: 100%;
      height: 0.5rem;
      background-color: #eff2f7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.25rem;
      box-sizing: border-box;
      position: relative;
      font-size: 0.28rem;
  }
  .newmesTitle span{
      color: #41b883;
      display: inline-block;
      height: 100%;
      padding: 0 0.1rem;
      line-height: 0.51rem;
  }
  .newmesTitle::before{
        content: "";
        display: block;
        width: 6px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgb(234, 32, 0);
  }
  .newmesTitle2::before{
        content: "";
        display: block;
        width: 6px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #d3dce6;
  }
  .newUl{
      background-color: #fff;
      box-sizing: border-box;
  }
  .newUl li{
      padding: 0.3rem 0.25rem;
      border-bottom: 1px solid #eff2f7;
  }
  .newUl li div{
      display: flex;
      justify-content: space-between;
      color: #b1bdcb;
      font-size: .28rem;
      margin-bottom: 0.1rem;
  }
  .newUl li h3{
      width: 100%;
      overflow: hidden;
      line-height: 0.4rem;
      font-weight: bold;
      font-size: 0.25rem;
  }
  .readmesUL li div{
      color: #b1bdcb;
  }
  .readmesUL li h3{
      color: #d0d7df;
  }
  .logdin{
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .noHas{
    text-align: center;
    padding: 0.8rem 0;
    background-color: #fff;
  }
  .mintitle{
    display: block;
    margin-top: 0.2rem;
    font-size: 0.1rem;
    color: #41b883;
  }
</style>
