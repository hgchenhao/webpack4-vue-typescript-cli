import './less/app.less';
import './index.less';
import a from './images/a.png';
import './app.ts';
import Vue from 'vue';
import App from './app.vue';


if(module.hot && process.env.NODE_ENV === 'development'){
  module.hot.accept()
}


console.log(process.env.NODE_ENV, 'NODE_ENV');
document.getElementById('a').src = a;

new Vue({
  render: h=> h(App),
}).$mount('#app');