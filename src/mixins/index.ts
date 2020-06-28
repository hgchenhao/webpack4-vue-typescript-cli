import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class Hello extends Vue {
  mixinName: string = 'from mixins'
};