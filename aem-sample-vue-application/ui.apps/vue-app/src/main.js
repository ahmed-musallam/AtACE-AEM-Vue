import Vue from 'vue'
import App from './App.vue'

// Open AEM dialog
function openVueDialog(resourceType, jcrPath) {
  // Granite.Util.getTopWindow()
  const config =  {
    getConfig: function () {
      return {
        layout: "auto",
        loadingMode: "auto",
        src: `/mnt/override${resourceType}/_cq_dialog.html${jcrPath}`,
        fullscreenToggle: true
      }
    },
    getRequestData: function () {
      return {
        resourceType: "vue-app/components/content/tech-products-search"
      }
    }
  }
  // eslint-disable-next-line
  console.log("openVueDialog", resourceType, jcrPath)
  window.Granite.Util.getTopWindow().Granite.author.DialogFrame.openDialog(config);
}

function addEditButton(el, resourceType, jcrPath){
  var b = document.createElement("button")
  b.innerHTML = "Edit";
  b.style.cssText = `
    left: calc(100% - 37px);
    position: relative;
    top: -1.5em;
    height: 20px;
    background: none;
    border: solid #5755d9 1px;
    color: #5755d9;
    font-size: 1em;
    line-height: 0.5em;
    padding: 0.2em;
  `
  el.insertAdjacentElement('afterend', b);
  b.onclick = function(){
    // eslint-disable-next-line
    console.log("editing!!")
    openVueDialog(resourceType, jcrPath)
  }
}

Vue.mixin({
  mounted: function () {
    // eslint-disable-next-line
    console.log(this)
    var resourceType = this.resourceType;
    var jcrPath = this.jcrPath;
    if (this.$el && this.$el.setAttribute && resourceType && jcrPath) {
      addEditButton(this.$el, resourceType, jcrPath)
    }
  }
})

//window.callOpenDialog("/apps/vue-app/components/content/tech-products-search", "/content/vue-app/home/sample/jcr:content/par/tech-products-search")


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
