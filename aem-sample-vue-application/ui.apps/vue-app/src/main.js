import Vue from 'vue'
import App from './App.vue'

Vue.mixin({
  mounted: function () {
    console.log(this)
    if (this.$el && this.$el.setAttribute && this.resourceType) {
      this.$el.setAttribute('data-aem-component', this.resourceType)
    }
  }
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
