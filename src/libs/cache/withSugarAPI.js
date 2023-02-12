import impl from './implementations/simple'
/* //* defaultApi (interface) 
  {
    set(itemName, itemValue) {
      ...
    },
    get(itemName) {
      ...
    },
    has(itemName) {
      ...
    },
    delete(itemName) {
      ...
    },
  }
*/
/*  //* api usage 
  // default api (native js object with methods)
  caches.get('item')
  caches.set('item', 'itemValue')
  caches.delete('item')
  caches.has('item')

  // proxified api (with sugar)
  caches.item               // get
  caches.item = 'someValue' // set
  caches.item = null        // delete (1)
  delete caches.item        // delete (2)
  'item' in caches          // has (1)
  caches.item               // has (2)
    // => someValue || null
    // e.g
    if (caches.item) doSmth 
    caches.item || fallback
    caches.item ? onHas : onAbsent
*/ 

const sugarApi = {
  get(target, prop, reviver) {
    return prop === 'get'
      ? target.get
      : target.get(prop)
  },
  set(target, prop, value, reviver) {
    value === null
      ? target.delete(prop)
      : target.set(prop, value)
    return true
  },
  deleteProperty(target, prop, reviver) {
    target.delete(prop)
    return true
  },
  has(target, prop, reviver) {
    return target.has(prop)
  },
}

function proxify(impl, sugarApi) {
  return new Proxy(impl, sugarApi)
}

const caches = proxify(impl, sugarApi)
export default caches