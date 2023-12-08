const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    size:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    extension:{
        type:String,
        require:true
    },
    hash:{
        type:String,
        require:true
    },
    deletedAt:{
        type:Date,
        default:null
    }
},{timestamps:true});

const FileModel = mongoose.model('File',fileSchema);
module.exports = FileModel;