import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    ownerRecipes: {
        type:[
            {
                type: mongoose.Types.ObjectId,
                ref: "recipes"
            },
        ],
        default: []
    },
    favoriteRecipes: {
        type:[
            {
                type: mongoose.Types.ObjectId,
                ref: "recipes"
            },
        ],
        default: []
    },
    followings:{
        type:[
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            },
        ],
        default: []
    },
    tags:{
        type:[],
        default:[]
    }
}, {
    timestamps: true,
})
export default mongoose.Model("users", userModel);