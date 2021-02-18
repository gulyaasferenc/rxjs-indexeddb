const rxjs = require('rxjs')

const {
    fromEvent,
    Observable
} = rxjs

module.exports = ({
    dbName,
    storeName,
    key,
    options = null
}) => {

    const returnSubs = new Observable(subject => {
        const myDb = window.indexedDB.open(dbName)

        const onDBSuccess = fromEvent(myDb, 'success')
        const onDBError = fromEvent(myDb, 'error')

        onDBError.subscribe(error => {
            subject.error(error)
        })

        onDBSuccess.subscribe(db => {
            const request = db.target.result.transaction([storeName]).objectStore(storeName).get(key)

            const onSuccess = fromEvent(request, 'success')
            const onError = fromEvent(request, 'error')
            onSuccess.subscribe(data => {
                subject.next(data.target.result)
            })
            onError.subscribe(error => {
                subject.error(error)
            })

        })

    })

    return returnSubs

}