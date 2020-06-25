import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes: any[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/containers/home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/containers/about.vue'),
  }
]

const router = new Router({
  routes,
})

export default router;