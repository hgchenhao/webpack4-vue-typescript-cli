<template>
  <div class="wrapper">
    {{title}}--{{joinStatus}}-{{isLoading}}
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Hello } from '@/mixins';
import { State, Action, namespace } from 'vuex-class';

const classroomModel = namespace('classroom');

@Component()
export default class Test extends Mixins(Hello) {
  @State('isLoading') isLoading
  @classroomModel.State((state)=> state.joinStatus) joinStatus
  title: string = 'About vue file'
  props:{}

  created(){
    console.log('created', this.mixinName);
  }

  mounted() {
    
  }
}
</script>
<style scoped>
</style>