<template>
  <div class="wrapper">
    {{title}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class Test extends Vue { 
  title: string = 'About vue file'
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