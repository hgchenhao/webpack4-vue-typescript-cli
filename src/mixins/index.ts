import { Vue, Component } from 'vue-property-decorator'
@Component
export class Hello extends Vue {
  mixinName = 'from mixins'
}
