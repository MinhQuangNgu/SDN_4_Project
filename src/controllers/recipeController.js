import RecipeServices from "../repository/RecipeServices.js";

class RecipeController {
    getAllReceipt = async (req, res, next) => {
        const allReceip = await RecipeServices.getAllRecipe(req, res, next)
        return res.send({
            status: 200,
            allReceip
        })
    }

    getReceiptByID = async (req, res, next) => {
        const recipe = await RecipeServices.findByID(req, res, next);
        return res.send({
            status: 200,
            recipe
        })
    }

    createRecipe = async (req, res, next) => {


        const newRecipe = await RecipeServices.Create(req, res, next);
        if (!newRecipe) {
            return res.status(400).send({
                status: "failed to create recipe",
            })
        }
        return res.status(200).send({
            data: newRecipe
        });
    }

    updateByID = async (req, res, next) => {

        try {
            const recipeUpdate = await RecipeServices.Update(req, res, next);
            if (!recipeUpdate) {
                return res.send({
                    status: "failed to Update recipe",
                })
            }
            if (recipeUpdate.data.statusCode !== 201) {
                return res.status(200).send({
                    data: recipeUpdate
                });
            }
            return res.status(201).send({
                success: true,
            })
        } catch (error) {

        }

    }

    deleteByID = async (req, res, next) => {

        try {
            const recipeUpdate = await RecipeServices.Delete(req, res, next);
            if (!recipeUpdate) {
                return res.send({
                    status: "failed to delete recipe",
                })
            }
            if (recipeUpdate.data.statusCode !== 201) {
                return res.status(200).send({
                    data: recipeUpdate
                });
            }
            return res.status(201).send({
                success: true,
            })
        } catch (error) {

        }

    }
}

export default new RecipeController;