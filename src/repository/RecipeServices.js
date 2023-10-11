import recipeModel from "../models/recipeModel.js";
import userModel from "../models/userModel.js";
class RecipeServices {
    getAllRecipe = async (req, res, next) => {
        try {
            const allRecipe = await recipeModel.find({});
            return allRecipe;
        } catch (err) {
            return err;
        }

    }

    findByID = async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return next();
        }
        try {
            const recipe = await recipeModel.findById(id)
            return recipe;
        } catch (err) {
            return err;
        }
    }

    Create = async (req, res, next) => {
        try {
            const { name, introduction, recipes, tags } = req.body
            const userId = req.user._id;
            return recipeModel.create({ name, introduction, recipes, tags, owner: userId });
        } catch (error) {
            return error;
        }

    }

    Update = async (req, res, next) => {
        const { id } = req.params;
        try {
            const recipeUpdate = await recipeModel.findById(id).exec();
            if (!recipeUpdate) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        error: "Recipe not found"
                    }
                };
            }
            const result = await recipeModel.findOneAndUpdate({ _id: id }, req.body);
            return {
                data: {
                    statusCode: 200,
                    success: true,
                    result
                }
            };
        } catch (err) {
            return err;
        }
    }

    Delete = async (req, res, next) => {
        const { id } = req.params;
        try {
            const recipeUpdate = await recipeModel.findById(id).exec();
            if (!recipeUpdate) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        error: "Recipe not found"
                    }
                };
            }
            const result = await recipeModel.findOneAndDelete({ _id: id }, req.body);
            return {
                data: {
                    statusCode: 200,
                    success: true,
                    result
                }
            };
        } catch (err) {
            return err;
        }
    }

}

export default new RecipeServices