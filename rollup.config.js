// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default [{
  input: 'lib/index.js',
  output: {
    dir: 'www/js',
    format: 'amd',
  },
  plugins: [
    replace({
      include: require.resolve('marked'),
      values: {
        'typeof define': '"undefined"',
      }
    }),
    replace({
      include: require.resolve('color/color-0.4.1.js'),
      delimiters: ['', ''],
      values: {
        ';Color =': ';window.Color =',
      }
    }),
    // Angular is bad at guessing things, It tries to use the base href to do routing.
    // This forces angular to use the root as base for the app
    replace({
      include: require.resolve('angular/angular.js'),
      delimiters: ['', ''],
      values: {
        'self.baseHref = function() {': 'self.baseHref = function() {return "/";',
      }
    }),
    resolve(),
  ],
  moduleContext: {
    [require.resolve('./lib/vendor/ace/ace.js')]: 'window',
    [require.resolve('marked')]: 'window',
    [require.resolve('color/color-0.4.1.js')]: 'window',
    [require.resolve('coffeescript/lib/coffeescript-browser-compiler-legacy/coffeescript.js')]: 'window'
  }
}];