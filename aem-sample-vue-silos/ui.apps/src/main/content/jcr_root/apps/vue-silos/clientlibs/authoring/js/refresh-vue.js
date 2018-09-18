(function(ns){

  /**
   * Initializes a Vue component from its editable.
   * @param {Granite.author.Editable} editable 
   */
  ns.REFRESH_VUE = function refreshVue (editable) {
    if (!editable) return;
    editable = editable.editable ? editable.editable : editable;
    var el = editable.dom.get(0);
    var win = el.ownerDocument.defaultView;
    var vueInstance = win.Vue.reloadInstance(el)
    // in case there are editables within the vue component, refresh them 
    // after vue instance has been mounted.
    if (vueInstance) {
      vueInstance.$nextTick(function () {
        var children = editable.getChildren() || [];
        children.forEach(function (childEditable) {
          childEditable.refresh()
        });
      })
    }
    return editable;
  }

  /**
   *  A different, hacky way to call initVueEditable, by overriding refresh events. 
   */


  /**
   * see: http://me.dt.in.th/page/JavaScript-override/
   * Overrides a function on a
   * @param {*} object The object containing the method we want to override
   * @param {*} methodName The name of the method to override
   * @param {*} callback the callback with original method
   */
  /*function override(object, methodName, callback) {
    object[methodName] = callback(object[methodName])
  }*/

  /**
   * DEFAULT GRANITE JS API OVERRIDES
   */

  /**
   * Granite.author.Editable.prototype.refresh
   */
  
  /*override(Granite.author.Editable.prototype, 'refresh', function(orginialRefresh){
    return function (editable) {
      var editable = this;
      return orginialRefresh.call(this)
        .then(function () {
          return initVueEditable(editable)
        });
    }
  });*/

  /**
   * Override Granite.author.editableHelper.overlayCompleteRefresh
   */
  /*override(Granite.author.editableHelper, 'overlayCompleteRefresh', function (originalOverlayCompleteRefresh) {
    return function (promise) {
      return originalOverlayCompleteRefresh(promise)
        .then(function (editable, config){ // after overlays are refreshed, 
          return initVueEditable(editable)
        });
    }
  })*/
})(Granite.author);