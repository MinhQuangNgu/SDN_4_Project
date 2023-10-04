import UserService from '../repository/UserService.js'
import userModel from '../models/userModel.js'
class UserController {
    getAll = async (req, res, next) => {
        const user = await UserService.findAll(req, res, next);
        return res.send({
            status: 200,
            user
        })
    };
    getUserID = async (req, res, next) => {
        const user = await UserService.findOne(req, res, next);
        return res.send({
            status: 200,
            user
        })
    }
    postUser = async (req, res, next) => {


        const userCreate = await UserService.Create(req, res, next);
        if (!userCreate) {
            return res.status(400).send({
                status: "failed to create user",
            })
        }
        console.log("=========================");

        if (userCreate.data.statusCode !== 200) {
            return res.status(200).send({
                data: userCreate.data
            });
        }
        return res.status(200).send({
           data: userCreate.data
        });
    }
    deleteUser = async (req, res, next) => {
        await userModel.deleteOne(req.query);
        return res.send({
            status: "success",
        })
    }
    updateUser = async (req, res, next) => {

        try {
            const userUpdate = await UserService.Update(req, res, next);
            if (!userUpdate) {
                return res.send({
                    status: "failed to Update user",
                })
            }
            if (userUpdate.data.statusCode !== 201) {
                return res.status(200).send({
                    data: userUpdate.data
                });
            }
            return res.status(201).send({
                success: true,
            })
        } catch (error) {

        }

    }
    CreateToken = async (req, res, next) => {
        const user = await UserService.Login(req, res, next);
        if (user.data.statusCode !== 200) {
            return res.status(200).send({
                data: user.data
            });
        }
        return res.status(200).send({
            data: user.data
        })
    }
}

export default new UserController;