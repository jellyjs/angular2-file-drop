export default {
  entry: 'dist/file-drop.js',
  dest: 'dist/bundles/bergben-angular2-file-drop.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'bergben-angular2-file-drop',
  globals: {
    '@angular/core': 'ng.core',
  }
}