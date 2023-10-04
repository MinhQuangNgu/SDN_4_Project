import express from "express";
const userRouter = express.Router();
import UserController from '../controllers/userController.js'

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getUserID);
userRouter.post('/', UserController.postUser );
userRouter.post('/token', UserController.CreateToken);
userRouter.delete('/', UserController.deleteUser);
userRouter.put('/:id', UserController.updateUser);


export default userRouter;