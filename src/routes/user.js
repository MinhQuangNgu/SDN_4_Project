import express from "express";
import userController from "../controllers/userController.js";
import middlewareController from "../controllers/middlewareController.js";
const userRouter = express.Router();
import UserController from '../controllers/userController.js'

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getUserID);
userRouter.post('/register', UserController.postUser );
userRouter.post('/login', UserController.CreateToken);
userRouter.delete('/', UserController.deleteUser);
userRouter.put('/:id', UserController.updateUser);


userRouter.get('/:id',middlewareController.verifyToken,userController.getUserDetail);
userRouter.post('/update/:id',middlewareController.verifyToken,userController.updateUserDetails);
userRouter.post('/f_m/:id',middlewareController.verifyToken,userController.userChiefFollow);
userRouter.post('/c_m/:id',middlewareController.verifyToken,userController.userRecipeFollow);


export default userRouter;