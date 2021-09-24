import { h } from '../helpers.js'
import { dfs, TreeExplorer } from '../../src/index.js'

/**
 * @param {Object} tree
 * @param {Function} callback
 * @returns {HTMLElement}
 */
async function renderTree (tree, callback) {
  const stack = [h('ul', {})]
  dfs(tree, (node, depth) => {
    while (depth > stack.length) {
      const ul = h('ul', {})
      const li = h('li', {}, ul)
      stack[stack.length - 1].append(li)
      stack.push(ul)
    }
    stack.splice(depth, stack.length - depth)
    const li = h('li', {}, node.name)
    if (node.isFile) {
      li.addEventListener('click', () => {
        callback(node)
      })
    }
    stack[stack.length - 1].append(li)
    return true
  })
  return stack[0]
}

/**
 * @param {Object} tree
 */
async function render (tree) {
  const ul = await renderTree(tree, async node => {
    const file = await node.getFile()
    console.log('file', file)
    console.log('node', node)
  })
  ul.classList.add('tree-view')
  document.body.append(ul)
}

/**
 * @param {DataTransferItem} tree
 */
async function load (item) {
  const explorer = new TreeExplorer()
  const tree = await explorer.load(item)
  await render(tree)
}

async function prompt () {
  const explorer = new TreeExplorer()
  const tree = await explorer.prompt()
  await render(tree)
}

// Event listeners:

const dropzone = document.querySelector('.dropzone')
dropzone.addEventListener('dragover', event => { event.preventDefault() })
dropzone.addEventListener('dragenter', event => { event.preventDefault() })
dropzone.addEventListener('dragleave', event => { event.preventDefault() })
dropzone.addEventListener('drop', async event => {
  event.preventDefault()
  if (event.dataTransfer.items.length !== 1) {
    return
  }
  const item = event.dataTransfer.items[0]
  await load(item)
})

const input = document.querySelector('input[type="file"]')
input.addEventListener('click', async event => {
  event.preventDefault()
  await prompt()
})
input.addEventListener('drop', async event => {
  if (event.dataTransfer.items.length !== 1) {
    return
  }
  const item = event.dataTransfer.items[0]
  await load(item)
})
