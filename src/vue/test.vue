<template>
  <div class="wrapper">
    {{title}} -- {{money| toMoney}}
    <div>
      <button @click="handleClick('home')">home</button>
      <button @click="handleClick('about')">about</button>
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
<style scoped>
</style>