<template>
  <div class="wrapper">
    <div @click="handlClick">{{ title }}</div>
    <Test></Test>
    <router-view />
  </div>
</template>

<script lang="ts">
import Test from '@/demo/test.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Test,
  },
})
export default class App extends Vue {
  title = 'webpack vue'

  handlClick() {
    console.log('handlClick')
  }

  get title1(): string {
    return this.title
  }

  set title1(title: string) {
    this.title = title
  }

  created() {
    console.log('created')
  }
}
</script>
<style scoped></style>
