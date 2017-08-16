<template>
  <div class="release">
      <div class="releaseHade">
          <i class="icon iconfont icon-return backI" @click="backe"></i>
            <span>发布</span>
      </div>
      <div class="releaseType">
        <span class="RE_title">选择模块</span>
        <div class="TypeVal" @click="choose">{{tab}}<i class="icon iconfont icon-xiajiantou"></i></div>
        <ul class="RElTypeTExt" :class="{'outREl': coose}">
           <li @click="toggle(index,item)"  v-for="(item, index) in tabs" :class="{'active':active == index}">{{item.dataText}}</li>
        </ul>
      </div>
      <div class="releaseTitle">
          <span class="RE_title">标题</span>
          <input type="text" v-model="editorTitle" placeholder="10个字符串以上">
      </div>
      <div class="textbody" @click="editoCls">{{baocun}}</div>
      <button @click="newTheme" class="releasOk">发布</button>
     <editor @setEditorData='getEditorData' @editoCls='editoCls' :editoCls='data_editoCls'></editor>
  </div>
</template>


<script>
import editor from './editorBody/editorBody' 
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      tabs: [
        {dataText: '问答', value: 'ask'},
        {dataText: '分享', value: 'share'},
        {dataText: '招聘', value: 'job'}
      ],
    	coose: true,
      active: 0,
      tab: '问答',
      baocun: '点击编辑正文',
      data_editoCls: false,
      editorTitle: '',
      value: 'ask',
      editorData: ''
    }
  },
  methods: {
    backe() {
      this.$router.back()
      this.coose = true
    },
    toggle(i,t){ 
      this.active = i
      this.tab = t.dataText
      this.value = t.value
      this.choose()
    },
    choose() {
      this.coose  = (this.coose === true) ? false:true
    },
    editoCls() {
      this.data_editoCls = (this.data_editoCls == false) ? true:false
      this.baocun = (this.editorData == '') ? '点击编辑正文':'正文保存成功'
    },
    getEditorData(value) {
      this.editorData = value
    },
    ceshi() {

        // axios.post('http://10.86.86.78/rws/tokens',{
        //   uname: "admin",
        //   passwd: "123456"
        // }).then((res) => {
        //   console.log(res)
        // }).catch((error) =>{
        //     console.log(error)
        // })

        // var params = new URLSearchParams();
        // params.append('uname','admin');
        // params.append('passwd', '123456');
        // console.log(params)

        // axios({
        //   method:'post',
        //   url:'http://10.86.86.78/rws/tokens',
        //   data:{
        //       name: 'admin',
        //       password: '123456'
        //   },
        //   withCredentials: true
        // }).then((res) =>{
        //   console.log(res)
        // });

        // axios 设置headers
        // headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // },
        // axios({
        //     method: 'get',
        //     url: 'http://10.86.86.78/rws/users/user/1',
        //     withCredentials: true
        // }).then((res) => {
        //     console.log(res)
        // })
        // let URL = 'http://10.86.86.78/rws/'
        // axios({
        //     method: 'get',
        //     url: URL+'export/excel/34',
        //     withCredentials: true
        // }).then((res) => {
        //     console.log(res)
        // })

        // axios.get('http://10.86.86.78/rws/users/user/1').then((res) => {
        //     console.log(res)
        // }).catch((error) =>{
        //     console.log(error)
        // })
    },
    newTheme() {
      let themeData = {
        editorTitle: this.editorTitle,
        value: this.value,
        editorData: this.editorData,
        UserId: localStorage.getItem('UserId')
      }
      let stringLent = this.GetStringLeng(themeData.editorTitle) 
      if (stringLent < 10) {
        alert('标题不能少于10个汉字的长度')
        return
      }
      if (themeData.editorData == '') {
        alert('正文不能为空')
        return
      }
      if(themeData.editorTitle !='' && themeData.value!='' && themeData.editorData!=''){
        axios.post('https://www.vue-js.com/api/v1/topics',{
          accesstoken: themeData.UserId,
          title: themeData.editorTitle,
          tab: themeData.value,
          content: themeData.editorData
        }).then((res) => {
          console.log(res)
          let topic_id = res.data.topic_id
          this.SET_ITEMID(topic_id)
          if (res.data.success == true) {
            this.$router.push({
              path: `/all/${topic_id}`
            })
          }
        }).catch((res) => {
          alert('发帖子失败咯')
        })
      }

    },
    GetStringLeng(str) {
      return str.replace(/[\u0391-\uFFE5]/g,"aa").length
    },
    ...mapMutations({
      SET_ITEMID: 'SET_ITEMID'
    })    
  },
  components: {
      editor
  }
}
</script>

<style scoped>
 .release{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1000;
 }
 .releaseHade{
    height: 1rem;
    background-color: #41b883;
    display: flex;
    align-items: center;
 }
 .backI{
     font-size: 0.5rem;
     color: #fff;
     height: 100%;
     line-height: 1rem;
     padding: 0 0.2rem;
 }
 .releaseHade span{
     font-size: 0.35rem;
     color: #fff;
 }
 .releaseType{
     height: 1rem;
 }
 .releaseType,.releaseTitle{
     margin: 0 0.3rem;
     color: rgba(0,0,0,.87);
     margin-top: 0.3rem;
     position: relative;
 }
 .RElTypeTExt{
     width: 100%;
     box-sizing: border-box;
     position: absolute;
     bottom: -2.1rem;
     z-index: 1000;
     padding: 0.1rem  0.2rem;
     background-color: #fff;
     box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
     transition: all .3s ease-in;
 }
 .outREl{
     opacity: 0;
     transform: translateY(-100%) scaleY(0.1);
 }
 .RElTypeTExt li{
     padding: 0.15rem 0;
 }
 .RE_title{
     font-size: 10px;
     color: rgba(0,0,0,.54);
     display: block;
     margin-bottom: 0.1rem;
 }
 .TypeVal>i{
     color: rgba(0,0,0,.12);
 }
 .releaseType{
     border-bottom: 1px solid rgb(224, 224, 224);
 }
 .TypeVal{
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0.17rem 0.05rem;
 }
 .releaseTitle input[type='text'] {
     border: none;
     border-bottom: 1px solid rgb(224, 224, 224);
     width: 100%;
     height: 0.6rem;
     font-size: 0.3rem;
 }
 .textbody{
     margin: 0 0.3rem;
     border-radius: 0.09rem;
     background-color: #eff2f7;
     height: 0.7rem;
     text-indent: 0.2rem;
     line-height: 0.7rem;
     color: #333;
     margin-top: 0.7rem;
 }
 .releasOk{
     display: block;
     border: none;
     text-align: center;
     background-color: #fff;
     width: 1.5rem;
     height: 0.5rem;
     margin: 0 auto;
     margin-top: 0.5rem;
 }
 .active{
        color:#ffcd32;
}   
</style>
 