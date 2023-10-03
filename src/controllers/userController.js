import userModel from '../models/userModel/js';
class UserController {

    async getUserDetail(req, res) {
        try {
            const { id } = req.params;
            const requestUser = await userModel.findById(req.user.id);
            let excluded = "-password";
            if(requestUser.role !== 'admin') {
                excluded += " -role";
            }
            const user = await userModel.findById(id).populate("ownerRecipes").populate("favoriteRecipes").populate({
                path: "followings",
                select: "_id name"
            }).select(excluded);
            return res.status(200).json({
                user:{
                    ...user,
                    owner: req.user.id == id
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async updateUserDetails(req,res){

    }
}

export default new UserController;