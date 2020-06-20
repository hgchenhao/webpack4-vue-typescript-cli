<template>
  <div class="wrapper">
    {{ title }}
    <Test></Test>
  </div>
</template>

<script>
import Test from '@/vue/test';
export default {
  components:{
    Test
  },
  props:{},
  data(){
    return {
      title: 'webpack vue loader',
    }
  },
  created(){},
  mounted(){},
  computed:{},
  methods:{},
  watch:{},
}
</script>
<style scoped>

</style>