
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
import userModel from "../models/userModel.js";
import { generateAccessToken, googleAuthen } from "../authen.js";
import passport from 'passport'
import cookieParser from "cookie-parser";

class RecipeController {

    findAll = async (req, res, next) => {
        try {
            const userModels = await userModel.find({});

            return userModels;
        } catch (err) {
            return err;
        }

    }

    findOne = async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return next();
        }
        try {

            const userModel = await userModel.find(req.query)
            return userModel;
        } catch (err) {
            return err;
        }
    }

    Update = async (req, res, next) => {
        const { id } = req.params;
        try {
            console.log(id);
            const userUpdate = await userModel.findById(id).exec();
            if (!userUpdate) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        error: "User not found"
                    }
                };
            }
            await userModel.findOneAndUpdate({ _id: id }, req.body);
            return {
                data: {
                    statusCode: 200,
                    success: true,
                }
            };
        } catch (err) {
            return err;
        }
    }
    

    Create = async (req, res, next) => {

        const { email } = req.body;

        try {

            const user = await userModel.findOne({ email: email }).exec();

            if (user) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        data: "Email is not the same the other user"
                    }
                };
            }

            const userModelFind = await userModel.create(req.body)
            const { token, refreshToken } = generateAccessToken({ _id: userModelFind['_id'], role: userModelFind["role"] }, 2);
            cookieParser.JSONCookie(refreshToken);
            return {
                data: {
                    statusCode: 200,
                    success: true,
                    data: userModelFind,
                    token: token,

                }
            };


        } catch (error) {
            return error;
        }
    }

    Login = async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const userModelFind = await userModel.findOne({ email: email, password: password }, { password: 0 }).exec();
            if (!userModelFind) {
                return {
                    data: {
                        statusCode: 400,
                        success: false,
                        data: "Kiểm tra lại tên hoặc mật khẩu"
                    }
                };
            }
            const { token, refreshToken } = generateAccessToken({ _id: userModelFind['_id'], role: userModelFind["role"] },2);
            const cookieRefresh = cookieParser.signedCookie(refreshToken, process.env.REFRESH_KEY)
            res.cookie('refresh', cookieRefresh);
            return {
                data: {
                    statusCode: 200,
                    success: true,
                    data: userModelFind,
                    token: token,
                    refreshToken: refreshToken
                }
            };
        } catch (err) {
            return err;
        }

    }

    Refresh = async (req, res, next) => {
        const { refreshToken } = req.body;
        // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
        console.log("refreshToken ");
        console.log(refreshToken);

        const cookieValue = req.cookies['refresh'];
        console.log("cookie value");
        console.log(process.env.REFRESH_KEY);
        let token;
        console.log((refreshToken) && (refreshToken == cookieValue));
        if ((refreshToken) && (refreshToken == cookieValue)) {
            // Kiểm tra mã Refresh token
            jwt.verify(cookieValue, process.env.REFRESH_KEY, (err, user) => {
                console.log(err);
                console.log(user);
                if (err) {

                    return res.status(400).json({
                        statusCode: 400,
                        success: false,
                        data: "Invalid Refresh Token"

                    });
                }
                // Tạo mới mã token và trả lại cho user
                 token = generateAccessToken({ _id: user['_id'], role: user["role"] },1);

                 return res.status(400).json(
                    {
                        statusCode: 200,
                        success: true,
                        token: token,
                    }
                 )
            })
        } else {

            return {
                data: {
                    statusCode: 400,
                    success: false,
                    data: "Invalid Request"
                }
            }
        }
    }


}

export default new RecipeController;