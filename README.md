# rxjs-indexeddb

Currently a very small package wich helps you handle indexed db using `rxjs observables`

## Usage
> You can clone the repository, run yarn/npm install and import the library  
> Afterward you can use the methods like below

### Import like this
```
import rxjsIndexddb from 'your/path/rxjs-indexeddb/index.js';
const rxjsIndexedDb = rxjsIndexddb()
```

### For now basic methods can be used:  
-----------
> Creates indexed db in your browser without a version  
> Returns an observable wich will grant the db instance
```javascript
rxjsIndexedDb.createDb({
    dbName: string
}).subscribe(db => yourFunction(db))
```  
-----------
> Creates store for the named indexed db  
> It will upgrade the db version automatically in every case  
> Returns void

```javascript
rxjsIndexedDb.createStore({
    dbName: string,
    storeName: string
})
```
-----------
> Add more or one new key-value pairs to the store.  
> Returns void
```javascript
rxjsIndexedDb.add({
    dbName: string,
    storeName: string,
    values: [{key: 'yourKey', value: 'yourValue'}]
})
```
-----------
> Get a value from the named indexed db and object store based on the given key
> Returns observable wich gives you the asked value of the given key
```javascript
rxjsIndexedDb.getValue({
    dbName: string,
    storeName: string,
    key: string
}).subscribe(value => yourFunction(value))
```
-----------
> Update one specific value in the named db and object store based  on the given key and value  
> Returns an observable wich will give you an object like {key: value}
```javascript
rxjsIndexedDb.updateValue({
    dbName: string,
    storeName: string,
    key: string,
    value: any
}).subscribe(updatedValue => yourFunction(updatedValue))
```
-----------
> Removes a key and its value from the specified indexed db objectstore  
> Returns void

```javascript
rxjsidb.removeKeyValue({
    dbName: string,
    storeName: string,
    key: string
})
```
-----------
* `As you can see, all of the methods expect object inputs with the keys above `  

* `void methods will throw new error if any trouble happens`  
* `where an observable is returned you can subscribe on the error events as well` 

### There will be a lot of new features in the future
soon..