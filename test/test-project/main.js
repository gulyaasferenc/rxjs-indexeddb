import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import rxjsIdb from '../../src/index.js'
import { map, of, switchMap } from 'rxjs'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

const dbName = 'test-db'
const storeName = 'test-store'

const flow$ = rxjsIdb
  .createDb({
    dbName,
  })
  .pipe(
    switchMap(() => {
      return rxjsIdb.checkIsStoreExist({ dbName, storeName })
    }),
    switchMap((isExist) => {
      if (isExist) {
        return of(isExist)
      } else {
        return rxjsIdb.createStore({ dbName, storeName })
      }
    })
  )

flow$.subscribe(() => {
  rxjsIdb
    .add({
      dbName,
      storeName,
      values: [
        { value: 'test1000', key: 'test1' },
        { value: 'test2', key: 'test2' },
      ],
    })
    .subscribe((res) => console.log(res, 'JEEE'))
})
