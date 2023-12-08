const mongoose = require("mongoose");

let mongoClient;

async function connect(uri,dbName){
    return new Promise((resolve,reject)=>{
        mongoose.connect(uri,{dbName})
            .then(()=>{
                mongoClient = mongoose.connection;
                console.log("Mongoose connected to DB")
                resolve();
            }).catch(error=>reject(error));
    })
}

async function init(uri = process.env.MONGO_URI, dbName = process.env.DB_NAME){
    try {
        await connect(uri,dbName);
        console.log("Mongodb initialized")
    } catch (error) {
        console.error("MongoDB connection error",error);
        throw error;
    }
}

async function getClient(){
    if(!mongoClient){
        throw new Error("Connection not initialized. Call init() first.")
    }
    return mongoClient;
}


async function close(){
    if(!mongoClient){
        await mongoClient.close();
    }
}

module.exports = {
    init,
    getClient
}