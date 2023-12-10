const cron = require("node-cron");
const { msToCron } = require("./convert");
const FileService = require("../services/file.service");
require("dotenv").config();

const garbageCollectionInterval =msToCron(process.env.GARBAGE_COLLECTION_INTERVAL) || '0 0 * * *';

const startGarbageCollectionCron = ()=>{
    console.info(`🚀 GARBAGE COLLECTOR LAUNCHED 🚀`);
    cron.schedule(garbageCollectionInterval,async()=>{
        const {success,status,error} = await FileService.runGarbageCollection();
        if(success){
            console.log(`✅ GARBAGE COLLECTION DONE  ✅  [ ${status} files deleted] - on 📆 - `,new Date())
        }else{
            console.error('❌ GARBAGE COLLECTION FAILED ❌\nError:', error);
        }
    })
}

module.exports = {
    startGarbageCollectionCron
}