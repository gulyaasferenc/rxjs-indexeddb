import { fromEvent, Observable } from 'rxjs'

export default ({ dbName, storeName }) => {
  return new Observable((subject) => {
    const myDb = window.indexedDB.open(dbName)

    console.log(myDb)

    const onDBSuccess = fromEvent(myDb, 'success')
    const onDBError = fromEvent(myDb, 'error')

    onDBError.subscribe((error) => {
      subject.error(error)
    })

    onDBSuccess.subscribe((db) => {
      const myDb = db.target.result
      const isExist = myDb.objectStoreNames.contains(storeName)
      myDb.close()
      subject.next(isExist)
    })
  })
}
