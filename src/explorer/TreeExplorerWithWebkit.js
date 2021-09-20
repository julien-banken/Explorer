import { memoize } from '../tools.js'
import { TreeExplorerWithFileList } from './TreeExplorerWithFileList.js'

export class TreeExplorerWithWebkit {
  /**
   * @param {DataTransferItem} item
   * @returns {Object}
   */
  getTree (item) {
    const entry = item.webkitGetAsEntry()
    return this.createNode(entry)
  }

  /**
   * @param {FileSystemEntry} entry
   * @returns {Object}
   */
  createNode (entry) {
    if (entry.isDirectory) {
      return this.createDirectoryNode(entry)
    }
    return this.createFileNode(entry)
  }

  /**
   * @param {FileSystemEntry} entry
   * @returns {Object}
   */
  createFileNode (entry) {
    return {
      name: entry.name,
      isDirectory: false,
      isFile: true,
      getFile: memoize(async () => {
        const promise = new Promise((resolve, reject) => {
          entry.file(file => { resolve(file) })
        })
        return await promise
      })
    }
  }

  /**
   * @param {FileSystemEntry} entry
   * @returns {Object}
   */
  createDirectoryNode (entry) {
    return {
      name: entry.name,
      isDirectory: true,
      isFile: false,
      getChildren: memoize(async () => {
        const reader = entry.createReader()
        const promise = new Promise(resolve => {
          reader.readEntries(entries => {
            resolve(entries.map(child => this.createNode(child)))
          })
        })
        return await promise
      })
    }
  }

  async prompt () {
    const promise = new Promise(resolve => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('multiple', true)
      input.setAttribute('webkitdirectory', true)
      input.addEventListener('change', event => {
        const explorer = new TreeExplorerWithFileList()
        resolve(explorer.getTree(event.target.files))
      })
      input.click()
    })
    return await promise
  }
}
