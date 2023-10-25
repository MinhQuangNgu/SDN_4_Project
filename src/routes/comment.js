import express from 'express';
import commentController from '../controllers/commentController.js';
import middlewareController from '../controllers/middlewareController.js';
const commentRouter = express.Router();

commentRouter.post('/',middlewareController.verifyToken,commentController.createComment)
commentRouter.get('/:recipeId',commentController.getCommentsForRecipe)


export default commentRouter;