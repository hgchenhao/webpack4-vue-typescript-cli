<template>
  <div class="wrapper">{{ title }}--{{ joinStatus }}-{{ isLoading }}</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Hello } from '@/mixins'
import { State, namespace } from 'vuex-class'

const classroomModel = namespace('classroom')

@Component
export default class Test extends Mixins(Hello) {
  @State('isLoading') isLoading: boolean
  @classroomModel.State(state => state.joinStatus) joinStatus: boolean
  title = 'About vue file'

  created() {
    console.log('created', this.mixinName)
  }
}
</script>
<style scoped></style>
