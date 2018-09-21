const path = require('path')
const fs = require('fs');

module.exports = class  CopyPlugin {
  constructor(options) {
    this.options = options;
  }
  // check if string ends with js or css
  isJsCss(str){
    return str && (str.endsWith('js') || str.endsWith('css'))
  }
  // copy file from src to distination folder
  copy(src, distFolder) {
    const dist = path.join(distFolder, path.basename(src))
    console.log(`copying ${src} to ${dist}`)
    fs.copyFileSync(src, dist);
  }
  apply(compiler) {
    // use "afterEmit" hooks to make sure all bundles have been written to filesystem
    compiler.hooks.afterEmit.tap("CopyPlugin", (compilation) => {
      var distPath = compilation.outputOptions.path
      // get an array of js/css file names emmited.
      var chunkFileNames = compilation.chunks
                          .map(c => c.files.filter(this.isJsCss))
                          .reduce((acc, val) => acc.concat(val), [])

      var distFiles = chunkFileNames.map(file => path.join(distPath, file))
      distFiles.forEach(file => {
        this.copy(file, this.options.dist)
      });
    });
  }
}
