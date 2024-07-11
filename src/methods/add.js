import { concat, fromEvent, merge, Observable, of } from 'rxjs'

export default ({ dbName, storeName, values = [] }) => {
  return new Observable((subject) => {
    const myDb = window.indexedDB.open(dbName)

    const onSuccess = fromEvent(myDb, 'success')
    const onError = fromEvent(myDb, 'error')

    onError.subscribe((error) => {
      subject.error(error)
    })

    onSuccess.subscribe((db) => {
      const myDb = db.target.result
      try {
        const transaction = myDb.transaction([storeName], 'readwrite')

        values.forEach((v) =>
          transaction.objectStore(storeName).add(v.value, v.key)
        )

        const tr = fromEvent(transaction, 'complete')
        const trError = fromEvent(transaction, 'error')

        tr.subscribe((event) => {
          myDb.close()
          subject.next(event)
        })

        trError.subscribe((error) => {
          myDb.close()
          subject.error(error.target.error)
        })
      } catch (error) {
        subject.error(new Error(error))
      } finally {
        myDb.close()
      }
    })
  })
}
