import { fromEvent, Observable } from 'rxjs'

export default ({ dbName, storeName, key, value, options = null }) => {
  const returnSubs = new Observable((subject) => {
    const myDb = window.indexedDB.open(dbName)

    const onDBSuccess = fromEvent(myDb, 'success')
    const onDBError = fromEvent(myDb, 'error')

    onDBError.subscribe((error) => {
      subject.error(error)
      subject.complete()
    })

    onDBSuccess.subscribe((db) => {
      const os = db.target.result
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)

      const update = os.put(data, key)

      const updateSuccess = fromEvent(update, 'success')
      const updateError = fromEvent(update, 'error')

      updateError.subscribe((error) => {
        subject.error(error)
      })

      updateSuccess.subscribe((resp) => {
        const toNext = { [key]: data }
        subject.next(toNext)
      })
    })
  })

  return returnSubs
}
