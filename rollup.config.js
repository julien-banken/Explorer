import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'

export default [{
  input: 'src/index.js',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    terser()
  ]
}, {
  input: 'examples/basic/index.js',
  output: {
    file: 'examples/basic/public/build.js',
    format: 'iife'
  },
  plugins: [
    alias({
      entries: [
        { find: 'explorer', replacement: './build/index.js' }
      ]
    })
  ]
}, {
  input: 'examples/intermediate/index.js',
  output: {
    file: 'examples/intermediate/public/build.js',
    format: 'iife'
  },
  plugins: [
    alias({
      entries: [
        { find: 'explorer', replacement: './build/index.js' }
      ]
    })
  ]
}, {
  input: 'examples/advanced/index.js',
  output: {
    file: 'examples/advanced/public/build.js',
    format: 'iife'
  },
  plugins: [
    alias({
      entries: [
        { find: 'explorer', replacement: './build/index.js' }
      ]
    })
  ]
}]
