// because I can...
const editButtonCssText =
  `
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
export default class VueDialogManager {
  /**
   * Get the jcr path for this vue component data in AEM
   * @param {*} vm Vue component instance
   */
  static getJcrPath(vm) {
    console.log("getJcrPath", vm)
    if(!vm.$el || !vm.$el.closest) return
    // closest might requires a polyfill for IE.. no one likes IE. 
    // TODO - Cache this
    var appContainer = vm.$el.closest("[data-vue-component-path]");
    if (appContainer) {
      const vuePath = appContainer.getAttribute("data-vue-component-path")
      if (!vuePath) {
        console.warn("This application container has a [data-vue-component-path] attribute that is empty..")
      } else return `${vuePath}${vm.jcrPath}`;
    }
    return null
  }

  /**
   * Returns an AEM dialog config for a vue instance
   * @param {*} vm Vue component instance
   */
  static getDialogConfig(vm) {
    console.log()
    const jcrPath = `${VueDialogManager.getJcrPath(vm)}`
    return {
      getConfig: () => ({
        layout: "auto",
        loadingMode: "auto",
        src: `/mnt/override${vm.resourceType}/_cq_dialog.html${jcrPath}`,
        fullscreenToggle: true
      }),
      getRequestData: () => ({
        resourceType: vm.resourceType
      })
    }
  }

  /**
   * Opens a vue dialog
   * @param {*} vm Vue component instance
   */
  static openVueDialog(vm) {
    // Granite.Util.getTopWindow()
    const config = VueDialogManager.getDialogConfig(vm)

    console.log(`Opening dialog with resourceType [${vm.resourceType}] and relative path [${vm.jcrPath}]`)
    var win = window.Granite.Util.getTopWindow() // get the authoring window
    win.Granite.author.DialogFrame.openDialog(config);
    console.log("Current open dialog instance: ", win.Granite.author.DialogFrame.currentDialog);
    win.Granite.author.DialogFrame.currentDialog.onSuccess = () => {
      VueDialogManager.updateVueComponent(vm)
    }
  }

  /**
   * Get component data from aem and call the vue instance "update" method with that data
   * @param {*} vm Vue component instance
   */
  static updateVueComponent(vm) {
    if (!vm.$el) return
    const jcrPath = VueDialogManager.getJcrPath(vm)
    if (!jcrPath) return;

    const path = `${jcrPath}.json`
    // fetch requires polyfill for IE... again, no one likes IE.. https://github.com/github/fetch
    return fetch(path)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status Code: ${response.status}`);
            return;
          }
          // Examine the text in the response
          response.json().then(function (data) {
            console.log("updating vue component instance: ", vm)
            console.log("with json: ", data)
            if (vm.update) vm.update(data);
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  /**
   * check if we can author this vue component
   * @param {*} vm Vue component instance
   */
  static canEdit(vm){
    // check that window.Granite.Util.getTopWindow exists
    const canGetTopWindow = (((window||{}).Granite||{}).Util||{}).getTopWindow;
    return canGetTopWindow && vm.$el && vm.resourceType && vm.jcrPath
  }

  /**
   * Render edit button after vue component
   * @param {*} vm Vue component instance
   */
  static renderEditButton(vm) {

    if (!VueDialogManager.canEdit(vm)) return; // EXIT here, cannot edit

    var b = document.createElement("button")
    b.innerHTML = "Edit";
    b.style.cssText = editButtonCssText;
    vm.$el.insertAdjacentElement('afterend', b);
    b.onclick = () => {
      console.log("Edit triggered")
      VueDialogManager.openVueDialog(vm)
    }
    return b;
  }
}