const vueTemplate = `
<template>
  <div class="wrapper">
    {{title}}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import * as types from '@/store/mutation-types';

const classroomModel = namespace('classroom');

@Component({
  components: {
  },
})
export default class Test extends Vue { 
  // vuex
  @State('isLoading') isLoading
  @Getter('token') getterToken
  @Action('updateLoading') updateLoading
  @Mutation(types.UPDATE_LOADING_STATUS) mutationUpdateLoading

  @classroomModel.State('joinStatus') joinStatus
  @classroomModel.Action('setJoinStatus') setJoinStatus
  @classroomModel.Mutation(types.JOIN_COURSE) joinCourse

  // props
  @Prop({
    tpe: String, 
    default: 'default value' 
  }) propA: string
    
  // watch
  @Watch('$route', { immediate: true, deep: true })
  routerChange(val: object, oldVal: object) {
    console.log(val)
  }

  title: string = 'Test vue file'
  
  // computed
  get title1(): string {
    return this.title
  }

  set title1(title: string) {
    this.title = title
  }

  created(){
  }

  // Emit 
  @Emit('click')
  handleClick() {
    return '@Emit' // 返回值作为$emit的第二个参数
  }
}
</script>
<style scoped lang="less">

</style>
`
module.exports = {
  vueTemplate: compoenntName => {
    return vueTemplate
  }
}

