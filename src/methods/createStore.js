import { fromEvent, Observable } from 'rxjs'

export default ({ dbName, storeName, options = null }) => {
  return new Observable((subject) => {
    console.log('RUNNING')
    window.indexedDB.databases().then((dbs) => {
      const currentVersion = dbs.find((el) => el.name === dbName).version

      const myDb = window.indexedDB.open(dbName, +currentVersion + 1)

      const onSuccess = fromEvent(myDb, 'upgradeneeded')
      const onError = fromEvent(myDb, 'error')

      onError.subscribe((error) => {
        console.log(error)
        subject.error('Db open error')
      })

      onSuccess.subscribe((db) => {
        const myDatabase = db.target.result
        subject.next(myDatabase.createObjectStore(storeName, options))
      })
    })
  })
}
