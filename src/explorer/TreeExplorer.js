import { TreeExplorerWithWebkit } from './TreeExplorerWithWebkit.js'
import { TreeExplorerWithFSH } from './TreeExplorerWithFSH.js'

export class TreeExplorer {
  /**
   * Constructor of `TreeExplorer`
   */
  constructor () {
    if (window.FileSystemDirectoryHandle) {
      this.explorer = new TreeExplorerWithFSH()
    } else {
      this.explorer = new TreeExplorerWithWebkit()
    }
  }

  /**
   * @param {DataTransferItem} item
   * @returns {Object}
   */
  async load (item) {
    return await this.explorer.getTree(item)
  }

  /**
   * @returns {Object}
   */
  async prompt () {
    return await this.explorer.prompt()
  }
}
