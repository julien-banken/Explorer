import { memoize } from '../tools.js'

export class TreeExplorerWithFSH {
  /**
   * @param {DataTransferItem} item
   * @returns {Object}
   */
  async getTree (item) {
    const handle = await item.getAsFileSystemHandle()
    return await this.getTreeFromFileSystemHandle(handle)
  }

  /**
   * @param {FileSystemHandle} handle
   * @returns {Object}
   */
  async getTreeFromFileSystemHandle (handle) {
    if (!(await this.verifyPermission(handle))) {
      return false
    }
    return this.createNode(handle)
  }

  /**
   * @param {FileSystemHandle} handle
   * @returns {Object}
   */
  createNode (handle) {
    if (handle.kind === 'directory') {
      return this.createDirectoryNode(handle)
    }
    return this.createFileNode(handle)
  }

  /**
   * @param {FileSystemHandle} handle
   * @returns {Object}
   */
  createFileNode (handle) {
    return {
      name: handle.name,
      isDirectory: false,
      isFile: true,
      getFile: memoize(async () => await handle.getFile())
    }
  }

  /**
   * @param {FileSystemHandle} handle
   * @returns {Object}
   */
  createDirectoryNode (handle) {
    return {
      name: handle.name,
      isDirectory: true,
      isFile: false,
      getChildren: memoize(async () => {
        const children = []
        for await (const child of handle.values()) {
          children.push(this.createNode(child))
        }
        return children
      })
    }
  }

  /**
   * @param {FileSystemHandle} handle
   * @returns {boolean}
   */
  async verifyPermission (handle) {
    const options = {
      mode: 'read'
    }
    return (
      (await handle.queryPermission(options)) === 'granted' ||
      (await handle.requestPermission(options)) === 'granted'
    )
  }

  /**
   * @returns {Object}
   */
  async prompt () {
    const handle = await window.showDirectoryPicker()
    return this.createDirectoryNode(handle)
  }
}
