"use strict";
use(function () {
    var options = granite.resource.properties["options"];
    var optionsStr = "";
    if (options && options.length) {
      options = options.map(function(o){
        return "'"+o+"'";
      })
      optionsStr = "[" + options.join(",") + "]";
    }
    return {
      options: optionsStr
    };
});