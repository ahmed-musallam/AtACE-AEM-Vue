Vue.component('pagination', {
  props: ['docs', 'pages'],
  data() {
    return {}
  },
  methods: {
    emitSearch: function (index) {
      this.$emit('search', index);
    }
  }
});