import rxjs from 'rxjs'

const { fromEvent, Observable } = rxjs

export default ({ dbName, storeName, options = null }) => {
  const returnSubs = new Observable((subject) => {
    const myDb = window.indexedDB.open(dbName)

    const onDBSuccess = fromEvent(myDb, 'success')
    const onDBError = fromEvent(myDb, 'error')

    onDBError.subscribe((error) => {
      subject.error(error)
    })

    onDBSuccess.subscribe((db) => {
      const myDb = db.target.result
      subject.next(myDb.objectStoreNames.contains(storeName))
    })
  })

  return returnSubs
}
