var utils = require('./_utils'),
  rollup = require( 'rollup' ),
  mkdirp = require('mkdirp'),
  fs = require('fs'),
  noderesolve = require('rollup-plugin-node-resolve'),
  replace = require('rollup-plugin-replace'),
  commonjs = require('rollup-plugin-commonjs'),
  globals = require('rollup-plugin-node-globals'),
  babel = require('babel-core')

const alias = require('rollup-plugin-alias')

module.exports = function(options) {

  // delete the old ./dist folder
  utils.clean('./dist')

  /**
   * Create a promise based on the result of the webpack compiling script
   */

  return new Promise(function(resolve, reject) {

    rollup.rollup({
      // The bundle's starting point. This file will be
      // included, along with the minimum necessary code
      // from its dependencies
      entry: './src/index.js',
      plugins: [
        noderesolve({
          jsnext: true,
          main: true
        }),
        commonjs({
          include: 'node_modules/**',
          // search for files other than .js files (must already
          // be transpiled by a previous plugin!)
          extensions: [ '.js', '.coffee' ] // defaults to [ '.js' ]
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        alias({
            'vue': 'node_modules/vue/dist/vue.esm.js'
        }),
        globals({
          'vue': 'Vue',
          'vue-router': 'VueRouter'
        })
      ]
    }).then( function ( bundle ) {

      // convert to valid es5 code with babel
      var result = babel.transform(
        // create a single bundle file
        bundle.generate({
          format: 'cjs'
        }).code,
        {
          moduleId: global.library,
          moduleIds: true,
          comments: false,
          presets: ['es2015'],
          plugins: ['transform-es2015-modules-umd']
        }
      ).code

      mkdirp('./dist', function() {
        try {
          fs.writeFileSync(`./dist/${ global.library }.js`, result, 'utf8')
          resolve()
        } catch (e) {
          reject(e)
        }
      })

    }).catch(e =>{ utils.print(e, 'error') })
  })

}
