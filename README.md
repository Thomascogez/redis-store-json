# redis-store-json
<b> :warning: i did a mistake on versionning last version is 1.1.0. I'm sorry about that</b>

This module was at the beginning for a personal project, but I decided to publish it.

redis-store-json, is a light nodejs module that will allow to easily store, get and modify JSON object into  redis database. It base on promise, so every function work with promise

# Installation

```shell
npm --save install redis-store-json
```

> You will also need the redis_nodejs package  https://github.com/NodeRedis/node_redis 

## Getting started



### Basic set-up



> For more redis  set-up option check  https://github.com/NodeRedis/node_redis 

```js
const redisJson = require('redis-store-json'); //import the module
const redis     = require('redis');            //import redis module
const client    = redis.createClient();        //create a new redis connection

redisJson.use(client);                      //give the redis instance to redis-json-store

let testSet = {
    "testKey1" : "test",
    "testKey2" : "test2"
}
redisJson.set("REDIS_DB_KEY", testSet)  // set a new JSON key
	.then(() =>{
    	console.log("succefuly set data");
	})
	.catch(() =>{
    	console.log("error when set data");
	})


```

<b> :warning: Before using any function make sure to call .use() and give your redis connection instance</b>



## Documentation

### Setting and modifying data

#### 		set(redisKey, payload)

> return { Promise } if resolved successfully set data, reject error

##### Param

| Name     | Description                          |
| -------- | ------------------------------------ |
| redisKey | The key of the redis table to modify |
| payload  | The JSON to store                    |

##### Example

```js
...
let testSet = {
    "testKey1" : "test",
    "testKey2" : "test2"
}
redisJson.set("REDIS_DB_KEY", testSet)  // set a new JSON key
	.then(() =>{
    	console.log("succefuly set data");
	})
	.catch(() =>{
    	console.log("error when set data");
	})
```

​	

#### 		modifyValueByJsonKey(redisKey, JSONkey, value)

> modify a value of a JSON object stored on a DB

##### Param

| Name     | Description                                      |
| -------- | ------------------------------------------------ |
| redisKey | The key of the redis table to modify             |
| JSONkey  | the JSON key stored on the JSON object to modify |
| value    | new value to set                                 |

##### Example

```js
...
//testSet = {
//    "testKey1" : "test",
//    "testKey2" : "test2"
//}

// set the data to redis
// ...

redisJson.modifyValueByJsonKey(redisKey, "testKey1", "updatedValue" )
	.then(() =>{
    	//value modified succefuly
	})
	.catch(err => {
    	console.error(err);//error when modifing error
	})

```





### Getting data

#### 	getJSON(databaseKey)

> return if resolved a new JSON object who contain the stored database informations

##### Param

| Name        | Description                       |
| ----------- | --------------------------------- |
| databaseKey | The key of the redis table to get |

##### Example

```js
...
//testSet = {
//    "testKey1" : "test",
//    "testKey2" : "test2"
//}

// set the data to redis
// ...

redisJson.getJSON("REDIS_DB_KEY")
	.then(data =>{
    	console.log(data); // {"testKey1" : "test","testKey2" : "test2"}
	})
	.catch(err => {
    	console.log(err);
	})


```



#### 		getValueByJsonKey(databaseKey, JSONkey)

> return if resolved return the value of  the key of the JSON object store in the DB

##### Param

| Name        | Description                       |
| ----------- | --------------------------------- |
| databaseKey | The key of the redis table to get |
| JSONkey     | The JSON to get data from         |



##### Example

```js
...
let testSet = {
    "testKey1" : "test",
    "testKey2" : "test2"
}
// set the data to redis

redisJson.getValueByJsonKey("REDIS_DB_KEY","testKey1") 
	.then(data =>{
    	console.log(data); //return "test"
	})
	.catch(err =>{
    	console.error(err);
	})
```

#### 		hasJSONkey(redisKey, JSONkey)

> return if resolved return the value of  the key of the JSON object store in the DB

##### Param

| Name     | Description                       |
| -------- | --------------------------------- |
| redisKey | The key of the redis table to get |
| JSONkey  | The JSON key to check             |



##### Example

```js
...
let testSet = {
    "testKey1" : "test",
    "testKey2" : "test2"
}
// set the data to redis

redisJson.hasJSONkey("REDIS_DB_KEY","testKey1") 
	.then(data =>{
    	console.log(data); //return true
	})
	.catch(err =>{
    	console.error(err);
	})
```

