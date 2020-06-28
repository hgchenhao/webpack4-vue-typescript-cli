const filters = [
  {
    name: 'toMoney',
    handler(value: string | number) {
      return isNaN(Number(value)) ? '0.00' : (Number(value) / 100).toFixed(2);
    }
  },
  {
    name: 'isFree',
    handler(value: string) {
      return value ? 'value' : '免费';
    }
  },
];

export default {
  install(Vue: { filter: Function }) {
    filters.map(item => {
      Vue.filter(item.name, item.handler);
      return item;
    });
  }
};
