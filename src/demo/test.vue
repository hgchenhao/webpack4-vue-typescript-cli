<template>
  <div class="wrapper">
    {{title}} -- {{money| toMoney}}
    <div class="btn-group">
      <van-button type="primary" @click="handleClick('home')">home</van-button>
      <van-button type="primary" @click="handleClick('about')">about</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions({ // or use vuex-class
      updateLoading: 'updateLoading',
      setJoinStatus: 'classroom/setJoinStatus'
    })
  },
})
export default class Test extends Vue { 
  title: string = 'Test vue file'
  money: string = '100'
  props:{}

  created(){
    this.updateLoading(true);
    this.setJoinStatus(true);
  }

  mounted() {
    
  }

  handleClick(name) {
    this.$router.push({name})
  }
}
</script>
<style scoped lang="less">
 .btn-group {
   margin-bottom: 10px;
 }
</style>