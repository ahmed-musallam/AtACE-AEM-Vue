
Vue.newInstance('vue-select', {
  data: function () {
    return {
      selected: ""
    }
  },
  methods: {

  },
  // see: https://github.com/sagalbot/vue-select
  components: {
    'v-select': VueSelect.VueSelect
  }
})