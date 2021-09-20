/**
 * Depth-first search
 * @param {Object} tree
 * @param {Function} callback
 */
export async function dfs (tree, callback) {
  const traverse = async (node, depth) => {
    if (!callback(node, depth) || !node.isDirectory) {
      return
    }
    for (const child of await node.getChildren()) {
      await traverse(child, depth + 1)
    }
  }
  await traverse(tree, 1)
}

/**
 * @param {Function} fun
 */
export function memoize (fun) {
  let cache = null
  return async () => {
    if (cache) {
      return cache
    }
    const value = await fun()
    cache = value
    return value
  }
}
