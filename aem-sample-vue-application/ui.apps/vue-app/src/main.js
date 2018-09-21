import Vue from 'vue'
import App from './App.vue'


function getParentEditablePath (el) {
  var editableDom = el.closest(".cq-Editable-dom");
  
  if(editableDom){
    var cq = editableDom.querySelector("[data-path]")
    if (cq){
      return cq.getAttribute("data-path")
    }
  }
  
  return ""
}

// Open AEM dialog
function openVueDialog(resourceType, jcrPath, vm) {

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
  var win = window.Granite.Util.getTopWindow()
  win.Granite.author.DialogFrame.openDialog(config);
  console.log("curr dialog",  win.Granite.author.DialogFrame.currentDialog);
  win.Granite.author.DialogFrame.currentDialog.onSuccess = function(){
  fetch(jcrPath+'.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log("vm to update: ", vm)
        console.log("got json: ", data)
        vm.update(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

    fetch(jcrPath)
    
  }
}

function addEditButton(el, resourceType, jcrPath, vm){
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
    var absolutePath = getParentEditablePath(el)
    openVueDialog(resourceType, absolutePath + jcrPath, vm)
  }
  return b;
}

Vue.mixin({
  mounted: function () {
    // eslint-disable-next-line
    console.log(this)
    var resourceType = this.resourceType;
    var jcrPath = this.jcrPath;
    if (this.$el && this.$el.setAttribute && resourceType && jcrPath) {
      this.editBtn = addEditButton(this.$el, resourceType, jcrPath, this)
    }
  },
  beforeDestroy: function () {
    // cleanup before destroy
    this.editBtn.parentNode.removeChild(this.editBtn);
  }
})

//window.callOpenDialog("/apps/vue-app/components/content/tech-products-search", "/content/vue-app/home/sample/jcr:content/par/tech-products-search")


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
