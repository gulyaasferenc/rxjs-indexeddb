# rxjs-indexeddb

Currently a very small package wich helps you handle indexed db using `rxjs library`

## Usage
> You can clone the repository and import the methods  
> 

### Import like this
```
import rxjsIndexddb from '../rxjs-indexeddb/index.js';
const rxjsIndexedDb = rxjsIndexddb()
```

### For now basic methods can be used:  
> Creates indexed db in your browser without a version  
> Returns an observable wich will grant the db instance
```javascript
rxjsIndexedDb.createDb({
    dbName: string
})
```  
> Creates store for the named indexed db  
> It will upgrade the db version automatically in every case  
> Returns void

```javascript
rxjsIndexedDb.createStore({
    dbName: string,
    storeName: string
})
```
> Add more or one new key-value pars to the store.  
> Returns void
```javascript
rxjsIndexedDb.add({
    dbName: string,
    storeName: string,
    values = [[{key: 'yourKey', value: 'yourValue'}]]
})
```
> Get a value from the named indexed db based on the given key  
> 
> Returns observable wich gives you the asked value of the given key
```javascript
rxjsIndexedDb.getValue({
    dbName: string,
    storeName: string,
    key: string
})
```
> Update one specific value in the named db and object store based  on the given key and value  
> Returns an object {key: value}
```javascript
rxjsIndexedDb.updateValue({
    dbName: string,
    storeName: string,
    key: string,
    value: any
})
```
`As you can see, all of the methods expect object inputs with the keys above ` 

### There will be a lot of new features in the future
soon..