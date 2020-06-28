<template>
  <div class="wrapper">
    {{title}}
  </div>
</template>

<script lang="ts">

import Component, { mixins } from 'vue-class-component';
import { Hello } from '@/mixins'

@Component()
export default class Test extends mixins(Hello) { 
  title: string = 'About vue file'
  props:{}

  created(){
    console.log('created', this.mixinName);
  }

  mounted() {
    
  }
  watch:{}
}
</script>
<style scoped>
</style>