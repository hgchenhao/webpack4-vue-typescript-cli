export default {
  install(Vue: { prototype: any }) {
    Vue.prototype.$isDev = () => process.env.NODE_ENV !== 'production'
  },
}
