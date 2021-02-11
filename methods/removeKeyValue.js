const rxjs = require('rxjs')

const {
    fromEvent,
    Observable
} = rxjs

module.exports = ({
    dbName,
    storeName,
    key
}) => {
    const myDb = window.indexedDB.open(dbName)

    const onSuccess = fromEvent(myDb, 'success')
    const onError = fromEvent(myDb, 'error')

    onError.subscribe(error => {
        throw new Error(error)
    })

    onSuccess.subscribe(db => {
        const myDb = db.target.result
        const request = myDb
            .transaction([storeName], "readwrite")
            .objectStore(storeName)
            .delete(key)
        const onError = fromEvent(request, 'error')
        onError.subscribe(error => {
            throw new Error(error)
        })
    })

}