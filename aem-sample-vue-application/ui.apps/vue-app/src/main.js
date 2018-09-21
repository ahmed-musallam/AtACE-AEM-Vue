import Vue from 'vue'
import App from './App.vue'

import VueDialogManager from './vue-dialog-manager'

Vue.mixin({
  mounted: function () {
    // do nothing if component does not have resourceType and jcrPath
    if (!this.resourceType || !this.jcrPath) return;
    VueDialogManager.updateVueComponent(this)
    if (VueDialogManager.canEdit(this)) {
     
      const editBtn = VueDialogManager.renderEditButton(this) 
      if(editBtn) this.editBtn = editBtn;
    }
  },
  beforeDestroy: function () {
    if(this.editBtn) {
      // remove edit button
      this.editBtn.parentNode.removeChild(this.editBtn);
    }
  }
})

//window.callOpenDialog("/apps/vue-app/components/content/tech-products-search", "/content/vue-app/home/sample/jcr:content/par/tech-products-search")


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
