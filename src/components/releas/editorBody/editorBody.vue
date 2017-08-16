<template>
  <div class="editorBody" :class="{'editorBodyTran': editoCls}">
      <ul class="editorBodyUl">
          <li>编辑</li>
          <li>预览</li>
      </ul>
      <div class="editoText">
          <span>正文</span>
          <textarea v-model="editorData" placeholder="建议使用Markdown语法"></textarea>
      </div>
      <div class="save">
          <span @click="ok">保存</span>
          <span @click="exit">取消</span>
      </div>
  </div>
</template>

<script>
export default {
   data() {
     return {
      editorData:''
     }
   },
   props: {
    editoText: {
      type: String,
      default: ''
    },
    editoCls: {
      type: Boolean,
      default: false
    }
   },
   methods: {
     exit(){ 
       this.$emit('editoCls')
     },
     ok() {
       // 保存 textarea 传递给父组件
       this.$emit('setEditorData', this.editorData)
       this.$emit('editoCls')
     }
   }
}
</script>

<style scoped>
  .editorBody{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1100;
    width: 100%;
    height: 100%;
    background: #fff;
     transform: translate3d(0,100%,0);    
    transition: transform .6s ease;
  }
  .editorBodyTran {
      transform: translate3d(0,0,0); 
  }
  .editorBodyUl{
      display: flex;
      width: 100%;
      text-align: center;
  }
  .editorBodyUl li{
      background-color: #41b883;
      height: 0.8rem;
      width: 50%;
      line-height: 0.8rem;
      color: #fff;
  }
  .editoText{
      margin: 0.3rem 0.3rem;
  }
  .editoText span {
      display: block;
      color: rgba(0,0,0,.54);
  }
  .editoText textarea{
      margin-top: 0.3rem;
      width: 100%;
      border: none;
      height: 240px;
      border-bottom: 1px solid #41b883; 
      font-size: 0.27rem;
  }
  .save{
      position: fixed;
      bottom: 0.5rem;
      width: 100%;
      display: flex; 
      justify-content: flex-end;
      padding-right: 0.5rem;
      box-sizing: border-box;
  }
  .save span{
      width: 1rem;
      height: 0.5rem;
      line-height: 0.51rem;
      color: rgb(132, 146, 166);
      text-align: center;
  }
  .save span:nth-of-type(1) {
      color: rgb(65, 184, 131);
  }
</style>
