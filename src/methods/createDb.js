import { fromEvent, Observable } from 'rxjs'

export default ({ dbName, version }) => {
  const DBOpenRequest = window.indexedDB.open(dbName /* , version */)

  const onCreateDbError = fromEvent(DBOpenRequest, 'error')
  const onCreateDb = fromEvent(DBOpenRequest, 'success')

  return new Observable((subs) => {
    onCreateDb.subscribe((data) => {
      data.target.result.close()
      subs.next(data.target.result)
    })
    onCreateDbError.subscribe((err) => {
      subs.error(err)
    })
  })
}
