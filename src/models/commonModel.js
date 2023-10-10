import mongoose from "mongoose";

const commonModel = new mongoose.Schema({
    k:{
        type:String,
    },
    v:{
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model("common", commonModel);