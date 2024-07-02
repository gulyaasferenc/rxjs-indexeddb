import createDb from './methods/createDb'
import createStore from './methods/createStore'
import add from './methods/add'
import getValue from './methods/getValue'
import updateValue from './methods/updateValue'
import removeKeyValue from './methods/removeKeyValue'
import checkIsStoreExist from './methods/checkIsStoreExist'

export default () => {
  console.log('I AM RUNNING')
  // In the following line, you should include the prefixes of implementations you want to test.
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some window.IDB* objects:
  window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction || { READ_WRITE: 'readwrite' } // This line should only be needed if it is needed to support the object's constants for older browsers
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
  // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

  return {
    createDb,
    createStore,
    add,
    getValue,
    updateValue,
    removeKeyValue,
    checkIsStoreExist,
  }
}
