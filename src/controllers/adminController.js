import User from '../models/userModel.js';
import Recipe from '../models/recipeModel.js';


class AdminController{
    async getUsers(req,res){
        try{
            const page = req.query.page || 1;
            const limit = req.query.limit || 1;
            const search = req.query.search || "";
            const sort = req.query.sort || '-createdAt';
            const users = await User.find({
                $or:[
                    {name:{$regex:search}},
                    {email:{$regex:search}}
                ]
            }).sort(sort).skip((page - 1) * limit).limit(limit);
            return res.status(200).json({users:users});
        }
        catch(err){
            return res.status(500).json({message:err.toString()});
        }
    }

    async getRecipes(req,res){
        try{
            const page = req.query.page || 1;
            const limit = req.query.limit || 1;
            const search = req.query.search || "";
            const sort = req.query.sort || '-createdAt';
            const recipes = await Recipe.find({
                $or:[
                    {name:{$regex:search}}
                ]
            }).sort(sort).skip((page - 1) * limit).limit(limit);
            return res.status(200).json({recipes:recipes});
        }
        catch(err){
            return res.status(500).json({message:err.toString()});
        }
    }
}

export default new AdminController;