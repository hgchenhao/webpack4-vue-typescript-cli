<template>
  <div class="wrapper">
    {{ title }} -- {{ money | toMoney }}- {{ propA }}
    <div class="btn-group">
      <van-button type="primary" @click="handleClick('home')">home</van-button>
      <van-button type="primary" @click="handleClick('about')">about</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import * as types from '@/store/mutation-types'

const classroomModel = namespace('classroom')

@Component({
  components: {},
})
export default class Test extends Vue {
  // vuex
  @State('isLoading') isLoading: boolean
  @Getter('token') getterToken: string
  @Action('updateLoading') updateLoading: Function
  @Mutation(types.UPDATE_LOADING_STATUS) mutationUpdateLoading: Function

  @classroomModel.State('joinStatus') joinStatus: boolean
  @classroomModel.Action('setJoinStatus') setJoinStatus: Function
  @classroomModel.Mutation(types.JOIN_COURSE) joinCourse: Function

  // props
  @Prop({
    type: String,
    default: 'default value',
  })
  propA: string

  // watch
  @Watch('$route', { immediate: true, deep: true })
  routerChange(val: object, oldVal: object) {
    console.log(val, oldVal)
  }

  title = 'Test vue file'
  money = '100'

  // computed
  get title1(): string {
    return this.title
  }

  set title1(title: string) {
    this.title = title
  }

  created() {
    console.log(this.getterToken, 'getterToken')
    this.mutationUpdateLoading(true)
    this.setJoinStatus(true)
  }

  // Emit
  @Emit('click')
  handleClick(name: string) {
    this.$router.push({ name })

    return '@Emit' // 返回值作为$emit的第二个参数
  }
}
</script>
<style scoped lang="less">
.btn-group {
  margin-bottom: 10px;
}
</style>
