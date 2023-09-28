import mongoose from "mongoose";

const recipeModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    introduction:{
        type:String,
    },
    recipes:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    tags:{
        type:[],
        default:[]
    }

},{
    timestamps:true
})

export default mongoose.model('recipes',recipeModel);