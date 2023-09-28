import mongoose from "mongoose";

const commonTagModel = new mongoose.Schema({
    commonType:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    },
    required:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
})

export default mongoose.model('commonTags',commonTagModel);