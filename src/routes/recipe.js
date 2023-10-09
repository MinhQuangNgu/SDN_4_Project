import express from 'express'; 
import recipeController from '../controllers/recipeController.js';
const recipeRouter = express.Router();

recipeRouter.get('/',recipeController.getAllrecipe)
recipeRouter.get('/:id',recipeController.getrecipeByID)
recipeRouter.post('/',recipeController.createRecipe)
recipeRouter.put('/:id',recipeController.updateByID)
recipeRouter.delete('/:id',recipeController.deleteByID)
export default recipeRouter;