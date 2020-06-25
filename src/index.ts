import './less/app.less';
import './less/index.less';
import './app.ts';
import router from '@/router';
import Vue from 'vue';
import App from './app.vue';

declare const module: any;
if(module.hot && process.env.NODE_ENV === 'development'){
  module.hot.accept()
}

new Vue({
  router,
  render: h=> h(App),
}).$mount('#app');