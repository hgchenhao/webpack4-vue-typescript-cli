<template>
  <div class="wrapper">
    {{title}} -- {{money| toMoney}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class Test extends Vue { 
  title: string = 'Test vue file'
  money: string = '100'
  props:{}

  created(){
    console.log('created');
  }

  mounted() {
    
  }
  watch:{}
}
</script>
<style scoped>
</style>