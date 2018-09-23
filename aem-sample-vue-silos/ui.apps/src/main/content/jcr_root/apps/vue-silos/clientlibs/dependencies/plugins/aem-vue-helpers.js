(function(Vue){
// ignore `cq` custom element
Vue.config.ignoredElements = [
  'cq'
]
/**
 * Simple registry impl where you can only register items once.
 */
var Registry = function(){
  var reg = {};
  /**
   * Registers an object with a name. Errors if name is already registered
   */
  this.set = function (name, obj) {
    // already exists, throw error.
    if (reg.hasOwnProperty(name)) {
      throw new Error('Cannot register name'+ name + '. It is already registered.')
    } else reg[name] = obj;
  }
  /**
   * get a registered item
   */
  this.get = function (name) {
    return reg[name];
  }
}

var VUE_ATTR = 'aem-comp';
var VUE_ATTR_SELECTOR = '[' + VUE_ATTR + ']';
function getVueSelector (name) {
  return '[' + VUE_ATTR + '="' + name +'"]';
}

// New Vue plugin
Vue.use({
  install: function (Vue) {
    // Vue registry
    Vue.instanceRegistry = new Registry();
    /**
     * Vue.newInstance global method.
     * 
     * @param {*} name the name of the AEM component set on the 'aem-comp' attribute
     * @param {*} vueOptions The vue instance options. (what you'd normally pass to `new Vue({})`)
     */
    Vue.newInstance = function (name, vueOptions) {
      // Add the vue options object to the registry, for later use
      Vue.instanceRegistry.set(name, vueOptions)
      // get all HTML elements matching the selector (AEM components)
      var selector = getVueSelector(name);
      var els = document.querySelectorAll(selector);
      // create a Vue instance for each AEM component
      vueInstances = [];
      for (let i = 0; i < els.length; i++) {
        var newVueOptions = Object.assign({}, vueOptions, {el:  els[i]})
        vueInstances.push(new Vue(newVueOptions))
      }
      // return all created Vue instances
      // TODO - track and destroy those instances when needed.
      return vueInstances;
    }
    /**
     * Remounts Vue instance within element subtree
     * NOTE: supports only ONE instance within subtree. for multiple, use components.
     * @param {*} element the root element that has a vue element within it.
     */
    Vue.reloadInstance = function (element){
      // root element has aem-comp attribute
      if (element.matches(VUE_ATTR_SELECTOR)) {
        element = element;
      }
      // root element does not have aem-comp attribute, search within it's subtree
      else {
        var child = element.querySelector(VUE_ATTR_SELECTOR);
        if (child) {
          element = child
        }
        else {
          console.warn('tried to find an element with attribute: '+ VUE_ATTR + ' but none was found in ', element)
          return;
        }
      }

      // get corresponding vue options from registry and create vue instance.
      var vueElementName = element.getAttribute(VUE_ATTR);
      var vueInstnceOptions = Vue.instanceRegistry.get(vueElementName);
      return new Vue(Object.assign({}, vueInstnceOptions, {el: element}));
    }
  }
})
})(Vue)
