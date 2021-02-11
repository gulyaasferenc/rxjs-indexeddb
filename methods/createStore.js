const rxjs = require('rxjs')

const {
    fromEvent,
    Observable
} = rxjs

module.exports = ({
    dbName,
    storeName,
    options = null
}) => {

    const errorList = []

    window.indexedDB.databases()
        .then(dbs => {
            const currentVersion = dbs.find(el => el.name === dbName).version

            const myDb = window.indexedDB.open(dbName, +currentVersion + 1)

            const onSuccess = fromEvent(myDb, 'upgradeneeded')
            const onError = fromEvent(myDb, 'error')

            onError.subscribe(error => {
                errorList.push(error)
            })

            onSuccess.subscribe(db => {
                const myDb = db.target.result
                try {
                    myDb.createObjectStore(storeName, options)
                } catch (error) {
                    errorList.push(error)
                }
                
            })
            if (errorList.length > 0) return errorList
        })


}