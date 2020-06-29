<template>
  <div class="wrapper">
    {{title}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BASE_API from '@/api/common';

@Component()
export default class Test extends Vue { 
  title: string = 'Home vue file'
  props:{}

  created(){
    console.log('created');
    this.getSetting();
  }

  mounted() {
    
  }

  getSetting() {
    BASE_API.settings(res=> {
      console.log(res);
    })
  }
}
</script>
<style scoped>
</style>