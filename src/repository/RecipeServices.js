import recipeModel from "../models/recipeModel.js";

class RecipeServices {
    getAllRecipe = async (req, res, next) => {
        try {
            const allReceip = await recipeModel.find({});
            return allReceip;
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
            return recipeModel.create({ name, introduction, recipes, tags })
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