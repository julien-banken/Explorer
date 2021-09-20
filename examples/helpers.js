/**
 * @param {String} type
 * @param {Object} attributes
 * @param {...any} children
 */
export function h (type, attributes, ...children) {
  const el = document.createElement(type)
  for (const key in attributes) {
    if (key === 'style' && Array.isArray(attributes[key])) {
      el.setAttribute(key, attributes[key].join(';'))
    } else {
      el.setAttribute(key, attributes[key])
    }
  }
  children.forEach(child => {
    if (child instanceof window.HTMLElement) {
      el.append(child)
    } else {
      el.append(document.createTextNode(child))
    }
  })
  return el
}

/**
 * @param {HTMLElement} elem
 * @param {String} name
 * @param {?boolean} bool
 */
export function toggleClass (elem, name, bool) {
  if (elem === null) {
    return
  }
  if (typeof bool === 'undefined') {
    bool = !elem.classList.contains(name)
  }
  if (bool) {
    if (!elem.classList.contains(name)) {
      elem.classList.add(name)
    }
  } else {
    if (elem.classList.contains(name)) {
      elem.classList.remove(name)
    }
  }
}
