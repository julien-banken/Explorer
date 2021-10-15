import { h } from '../helpers.js'
import { TreeExplorer } from 'explorer'

/**
 * @param {HTMLElement} container
 * @param {Function} callback
 */
function renderBreadcrumbs (stack, callback) {
  const ul = document.querySelector('.breadcrumbs')
  ul.innerHTML = ''
  for (let k = 0; k < stack.length; k++) {
    const li = h('li', {}, stack[k].name)
    li.addEventListener('click', async () => {
      await renderList(stack.slice(0, k + 1), callback)
    })
    ul.append(li)
  }
}

/**
 * @param {Array[Object]} stack
 * @param {Function} callback
 */
async function renderList (stack, callback) {
  renderBreadcrumbs(stack, callback)
  const ul = document.querySelector('.list-view')
  ul.innerHTML = ''
  for (const child of await stack[stack.length - 1].getChildren()) {
    const li = h('li', {}, child.name)
    if (child.isFile) {
      li.addEventListener('click', () => {
        callback(child)
      })
    } else {
      li.addEventListener('click', async () => {
        await renderList([...stack, child], callback)
      })
    }
    ul.append(li)
  }
}

/**
 * @param {Object} tree
 */
async function render (tree) {
  await renderList([tree], async node => {
    const file = await node.getFile()
    console.log('file', file)
    console.log('node', node)
  })
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
