const entryExist = require('./helpers/entryExist');
const getInformationByKey = require('./actions/getInformationByKey');
let redisInstance;

/**
 * use
 * 
 * Set the redis instance to use
 * @param {*} redisIns
 */
const use = redisIns => {
    redisInstance = redisIns;
}

/**
 * getValueByJsonKey
 * 
 * return if exist the JsonKey value store on redis db
 * @param {*} redisKey 
 * @param {*} JsonKey 
 * @return {Promise} if resolved return the value of the json object assosiated to the JSON KEY store in the DB
 */
const getValueByJsonKey = (redisKey, JsonKey) => {
    return new Promise((resolve, reject) => {
        entryExist(redisInstance, redisKey)
            .then(() => { // value exist
                getInformationByKey(redisInstance, redisKey)
                    .then(data => { //get information 
                        if (data != null) {
                            if (data.hasOwnProperty(JsonKey)) {  //json key exist
                                resolve(data[JsonKey]);
                            }
                        }
                        reject("[redis-store-JSON] getValueByJsonKey => value not found")
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.error(err);
            })
    })
}


/**
 * set
 * 
 * Method use to serialize json object and store them to the redis database
 * @param {*} redisKey  the off the redis database (where to store data)
 * @param {*} payload   json object to store
 * @return {Promise} if resolved data set succefuly if reject error when setting data
 */
const set = (redisKey, payload) => {
    return new Promise((resolve, reject) => {
        try {
            let parsed = JSON.stringify(payload);
            redisInstance.set(redisKey, parsed);
            resolve("[redis-store-JSON] succefuly stored data")
        } catch (e) {
            reject("[redis-store-JSON] data to store is not a JSON object ")
        }
    })
}

/**
 * modifyValueByJsonKey
 * 
 * Modify a value in a stored JSON object by is key
 * @param {*} redisKey key of the db to modify
 * @param {*} JSONkey  key of the JSON value to modify
 * @param {*} value    new value to set
 * @return {Promise} if resolved data modify succefuly if reject error when modify data
 */
const modifyValueByJsonKey = (redisKey, JSONkey, value) => {
    return new Promise((resolve, reject) => {
        getInformationByKey(redisInstance, redisKey) 
            .then(data => {
              
                if (data != null){
                    if(data.hasOwnProperty(JSONkey)){
                        data[JSONkey] = value;
                        set(redisKey,data);   //update the db
                        resolve('[redis-store-JSON] succefuly modify stored data')
                    }
                }
                reject('[redis-store-JSON] fail when modify data')
            })
            .catch(err => {
                reject(err)
            })
    })
    
}

/**
 * getJSON
 * 
 * return a JSON object get by parssing db info
 * @param {*} redisKey Key of the db to return data
 * @return {Promise} if resolved data get succefuly and return parsed JSON data if reject error when getting data
 */
const getJSON = (redisKey) => {
    return new Promise((resolve, reject) => {
        getInformationByKey(redisInstance,redisKey)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject("[redis-store-JSON] value not found on redis DB")
            })
    })    
}

/**
 * hasJSONkey
 * 
 * Test if a jsonKey exist on the JSON object stored on the database
 * @param {*} redisKey Key where you want to search the json key
 * @param {*} jsonKey  the json key to search
 */
const hasJSONkey = ( redisKey, jsonKey ) => {
    return new Promise((resolve, reject) => {
        getJSON(redisKey)
            .then(data => {
                if(data.hasOwnProperty(jsonKey)) {
                    resolve(true);
                }
                resolve(false);
            })
            .catch(err => {
                reject(err);
            })
    })

}


module.exports = { use, getValueByJsonKey, set, modifyValueByJsonKey, getJSON, hasJSONkey }