<template>
  <div class="all">
    <ul class="itemUl">
      <li class="itemLi" v-for="item in data" @click="Details($event)" ref="hidden" :data-val="item.id" :key="item.id">
        <div class="itemTop">
          <div class="itemImg"><img  v-lazy="item.author.avatar_url" alt=""></div>
          <div class="itemTitle">{{item.title}}</div>
          <div class="itemTab">{{item.tab}}</div>
          <input type="hidden" :value="item.id">
        </div>
        <div class="itemBottom">
          <div class="itemName">{{item.author.loginname}}</div>
          <div class="itemDate">{{item.create_at}}</div>
          <div class="itemAmount">
            <div class="itemAmountOne">
              <i class="icon iconfont icon-BAI-shenpi"></i>
              <span>{{item.visit_count}}</span>
            </div>
            <div class="itemAmountoneTow">
              <i class="icon iconfont icon-BAI-zan"></i>
              <span>{{item.reply_count}}</span>
            </div>
          </div>
        </div>
        <div class="good" v-show="item.good" :data-good="item.good">精</div>
      </li>
    </ul>
    <div class="GenDuo" ref="GenDuo" :foo.sync="foo" @click="GenDuo" v-show="data.length">{{foo}}</div>
  </div>

</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
      props: {
        data: {
          type: Array
        },
        foo: {
          type: String
        }
      },
      methods: {
        GenDuo() {
          this.$emit('GenDuo')
        },
        Details(e) {
          // 将点击的 主题详情id 保存入vuex
          this.SET_ITEMID(e.currentTarget.dataset.val)
          this.$emit('Details')
        },
        ...mapMutations({
          SET_ITEMID: 'SET_ITEMID'
        })
      },
     computed: {
        ...mapGetters([
          'ItemId'
        ])
      }
  }
</script>

<style>
  @import "../../assets/css/body.css";
</style>
