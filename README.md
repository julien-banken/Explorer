# Explorer

Firefox and the web browsers based on Chromium use different approaches to manipulate a virtual file system. This library defines a **common API** that you can use to build your own file explorer. With the library, you will not have to deal with the specificities of each browser.

**Disclaimer**: The library uses some features that are still considered as experimental. The library only supports the read operations as the write operations are not currently supported on all web browsers.

## Examples

The library is **framework agnostic**. It makes no assumption regarding of the framework you are using to render your components. To build your explorer with the library, you will have to define your own rendering functions and attach your own event listeners.

This repository contains minimal examples to show you how to use the library. These examples should cover most use-cases you could have in practice.

### Basic example

In the basic example, we will render all the directories and all the files at once in a nested HTML list. When the user clicks on a file, the script will log the corresponding file in the console. You can, of course, change that behavior and define your own callback function.

Example:

- Directory 1
  - File 1
  - File 2
- Directory 2

### Advanced example

In the advanced example, we will also render the files and the directories in an HTML nested list expect that the sub-directories will be loaded lazily. In other words: When the user clicks on a directory, the system will load all the sub-directories of the selected directory and append it to the dom.

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

Notes: The interface will show a breadcrumb that will allow the user to access to the parent directories.

## Getting started

Step 1: Install the dependencies

```bash
npm install
```

Step 2: Compile the source

```bash
rollup -c
```

Step 3: Open the `index.html` file of one of the sub-directories of `/examples`

## License

This software is licensed under the Apache 2.0 LICENSE.

# Sources

- [web.dev - File System access](https://web.dev/file-system-access/)
- [Mozilla - webkitGetAsEntry](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry)
