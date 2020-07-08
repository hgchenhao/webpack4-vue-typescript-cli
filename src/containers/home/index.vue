<template>
  <div class="wrapper">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BASE_API from '@/api/common'

@Component
export default class Test extends Vue {
  title = 'Home vue file'

  created() {
    console.log('created')
    this.getSetting()
  }

  getSetting() {
    BASE_API.settings((res: any) => {
      console.log(res)
    })
  }
}
</script>
<style scoped></style>
