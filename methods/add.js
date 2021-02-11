const rxjs = require('rxjs')

const {
    fromEvent,
    Observable
} = rxjs

module.exports = ({
    dbName,
    storeName,
    values = []
}) => {
    const myDb = window.indexedDB.open(dbName)

    const onSuccess = fromEvent(myDb, 'success')
    const onError = fromEvent(myDb, 'error')

    onError.subscribe(error => {
        throw new Error(error)
    })

    onSuccess.subscribe(db => {
        const myDb = db.target.result
        values.forEach(value => {
            const request = myDb
                .transaction([storeName], "readwrite")
                .objectStore(storeName)
                .add(value.value, value.key)
            const onError = fromEvent(request, 'error')
            onError.subscribe(error => {
                throw new Error(error)
            })
        })
    })

}