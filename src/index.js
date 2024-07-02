import createDb from './methods/createDb'
import createStore from './methods/createStore'
import add from './methods/add'
import getValue from './methods/getValue'
import updateValue from './methods/updateValue'
import removeKeyValue from './methods/removeKeyValue'
import checkIsStoreExist from './methods/checkIsStoreExist'

export default () => {
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
