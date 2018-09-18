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

Vue.use({
  install: function (Vue) {
    // Vue registry
    Vue.instanceRegistry = new Registry();
    // create new vue instance
    Vue.newInstance = function (name, vueOptions) {
      var selector = getVueSelector(name);
      Vue.instanceRegistry.set(name, vueOptions)
      var els = document.querySelectorAll(selector);
      vueInstances = [];
      for (let i = 0; i < els.length; i++) {
        var newVueOptions = Object.assign({}, vueOptions, {el:  els[i]})
        vueInstances.push(new Vue(newVueOptions))
      }
      return vueInstances;
    }
    /**
     * Remounts Vue instance within element subtree
     * NOTE: supports only ONE instance within subtree. for multiple, use components.
     * @param {*} element the root element that has a vue element within it.
     */
    Vue.reloadInstance = function (element){
      // root element has VUE_ATTR
      if (element.matches(VUE_ATTR_SELECTOR)) {
        element = element;
      }
      // root element does not have VUE_ATTR, search within the subtree
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
