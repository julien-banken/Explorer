import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'examples/basic/index.js',
    output: {
      file: 'examples/basic/public/build.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve({
        mainFields: ['module', 'browser', 'main'],
        extensions: ['.mjs', '.js']
      }),
      commonjs()
    ]
  },
  {
    input: 'examples/intermediate/index.js',
    output: {
      file: 'examples/intermediate/public/build.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve({
        mainFields: ['module', 'browser', 'main'],
        extensions: ['.mjs', '.js']
      }),
      commonjs()
    ]
  },
  {
    input: 'examples/advanced/index.js',
    output: {
      file: 'examples/advanced/public/build.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve({
        mainFields: ['module', 'browser', 'main'],
        extensions: ['.mjs', '.js']
      }),
      commonjs()
    ]
  }
]
