import './less/app.less';
import './less/index.less';
import './app.ts';
import Vue from 'vue';
import App from './app.vue';

declare const module: any;
if(module.hot && process.env.NODE_ENV === 'development'){
  module.hot.accept()
}

new Vue({
  render: h=> h(App),
}).$mount('#app');