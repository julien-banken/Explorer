# 📁 Explorer

Firefox and the web browsers based on Chromium use different approaches to manipulate a **virtual file system**. As a developper, it can be quite tedious to build something that works on every browser.

This library will define a **common API** that you can use to interact with a virtual file system. It will help you build your own file explorer in pure Javascript without having to worry about which browser the user is using.

To build a file explorer with the library, you will have to define your own rendering functions and explorer the **tree abstraction** provided by the library. In that regards, the library will made no assumption on of the frontend framework you are using.

**Disclaimer**: The library uses some features that are still considered as experimental (see [FileSystemHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle), [FileSystemEntry](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry), etc). The library only supports the read operations as the write operations are not currently supported on all web browsers.

## 📖 Documentation

### Tree abstraction

The **tree abstraction** will be a **JSON object** containg data about a file or a directory as well as some helper functions that you can use to interact with it.

The **directory node** will have the following properties:

- `name`: Name of the directory.
- `isDirectory`: Boolean that indicates if the node is a directory (`true` in that case).
- `isFile`: Boolean that indicates if the node is a file (`false` in that case).
- `getChildren`: Function allowing you to retrieve the children of the directory (i.e: the files and the sub-directories).

The **file node** will have the following properties:

- `name`: Name of the file.
- `isDirectory`: Boolean that indicates if the node is a directory (`false` in that case).
- `isFile`: Boolean that indicates if the node is a file (`true` in that case).
- `getFile`: Function allowing you to retrieve a `File` object.

## Getting started

### Load a directory from a dropzone

To generate the tree abstraction, you will have to instantiate a `TreeExplorer` object and call its `load` function. This function will take as input a [DataTransferItem](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) object that you can get when the user drops a file on a dom element or uses a standard file input.

Example:

```Javascript
dropzone.addEventListener('drop', async event => {
  event.preventDefault()
  if (event.dataTransfer.items.length !== 1) {
    return
  }
  const item = event.dataTransfer.items[0]
  const explorer = new TreeExplorer()
  const tree = await explorer.load(item)
  console.log('tree', tree)
})
```

You can then render your component as you want by recursively exploring the tree. Hopefully, the library defines some helper functions to help you out (see: `dfs` function).

### Prompt the user to select a directory

To prompt the user to upload a file or a directory, you can use the `prompt` function of the `TreeExplorer` object.

Exemple:

```Javascript
button.addEventListener('click', () => {
  const tree = new TreeExplorer();
  tree.prompt();
})
```

## Helpers

To explore the tree, you can use the `dfs` (see [Depth First Search](https://en.wikipedia.org/wiki/Depth-first_search)) function provided by the library. This functions takes two arguments: (1) the `tree` you want to explore and (2) a function that will be called each time the algorithm traverses a node.

```Javascript
dfs(tree, (node, depth) => {
  // ... your logic
  return true;
})
```

Note: To explore the children of the current `node`, the anonymous function will have to return `true`. You can backtrack earlier by returning `false`.

## Examples

This repository contains minimal examples to show you how to use the library. These examples should cover most use-cases you could have in practice.

### Basic example

In the basic example, we will render all the directories and all the files at once in a nested HTML list. When the user clicks on a file, the script will log the corresponding file in the console. You can, of course, change that behavior and define your own callback function.

Example:

- Directory 1
  - File 1
  - File 2
- Directory 2

### Advanced example

In the advanced example, we will also render the files and the directories in an HTML nested list except that the sub-directories will be loaded lazily. In other words: When the user clicks on a directory, the system will load all the sub-directories of the selected directory and append it to the dom.

Example:

- Directory 1
- Directory 2

When the user clicks on `Directory 1`:

- Directory 1
  - File 1
  - File 2
- Directory 2

### Intermediate example

When the user clicks on a directory, the view will clear the view and render the content of the selected directory.

Example:

- Directory 1
- Directory 2

When the user clicks on the `Directory 1`:

- File 1
- File 2

# 👨‍⚖️ License

This software is licensed under the Apache 2.0 LICENSE.

# 🔍 Sources

- [web.dev - File System access](https://web.dev/file-system-access/)
- [Mozilla - webkitGetAsEntry](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry)
