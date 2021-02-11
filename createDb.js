const rxjs = require('rxjs')

const {
    fromEvent,
    Observable
} = rxjs

module.exports = ({
    dbName,
    version
}) => {
    const DBOpenRequest = window.indexedDB.open(dbName/* , version */);

    const onCreateDbError = fromEvent(DBOpenRequest, 'error')
    const onCreateDb = fromEvent(DBOpenRequest, 'success')

    const getDbInstance = new Observable(subs => {
        onCreateDb.subscribe(data => {
            subs.next(data.target.result)
        })
        onCreateDbError.subscribe(err => {
            subs.error(err)
        })
    })

    return getDbInstance

}