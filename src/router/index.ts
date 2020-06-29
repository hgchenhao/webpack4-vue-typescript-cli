import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location:object) {
  return originalPush.call(this, location).catch((err:any) => err)
}

const routes: any[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/containers/home/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/containers/about/index.vue'),
  }
]

const router = new Router({
  routes,
})

export default router;