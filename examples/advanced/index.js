import { h, toggleClass } from '../helpers.js'
import { TreeExplorer } from 'explorer'

/**
 * @param {Object} tree
 * @param {Function} callback
 */
async function renderTree (tree, callback) {
  const ul = (
    h('ul', {},
      h('li', {}, tree.name)
    )
  )
  const li = ul.querySelector('li')
  if (tree.isFile) {
    li.addEventListener('click', () => {
      callback(tree)
    })
    return ul
  }
  li.addEventListener('click', async () => {
    const container = h('li', {})
    for (const child of await tree.getChildren()) {
      container.append(await renderTree(child, callback))
    }
    li.addEventListener('click', async () => {
      toggleClass(container, 'hidden')
    })
    ul.append(container)
  }, { once: true })
  return ul
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
