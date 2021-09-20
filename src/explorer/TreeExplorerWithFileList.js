export class TreeExplorerWithFileList {
  /**
   * @param {FileList} list
   * @returns {Object}
   */
  getTree (files) {
    const root = this.createDirectoryNode('./')
    for (let k = 0; k < files.length; k++) {
      const path = files[k].webkitRelativePath
      const node = this.createFileNode(files[k])
      this.insertToTree(root, node, path.split('/'))
    }
    return root.getChildren()[0]
  }

  /**
   * @param {Object} current
   * @param {Object} node
   * @param {Array[String]} path
   */
  insertToTree (current, node, path) {
    if (path.length === 1) {
      this.insertToDirectory(current, node)
      return
    }
    const name = path.shift()
    const children = current.getChildren()
    let child = children.find(child => child.name === name)
    if (!child) {
      child = this.createDirectoryNode(name)
      this.insertToDirectory(current, child)
    }
    this.insertToTree(child, node, path)
  }

  /**
   * @param {Object} parent
   * @param {Object} child
   */
  insertToDirectory (parent, child) {
    const children = parent.getChildren()
    children.push(child)
    parent.getChildren = () => children
  }

  /**
   * @param {String} name
   * @returns {Object}
   */
  createDirectoryNode (name) {
    return {
      name: name,
      isDirectory: true,
      isFile: false,
      getChildren: () => []
    }
  }

  /**
   * @param {File} file
   * @returns {Object}
   */
  createFileNode (file) {
    return {
      name: file.name,
      isDirectory: false,
      isFile: true,
      getFile: () => file
    }
  }
}
