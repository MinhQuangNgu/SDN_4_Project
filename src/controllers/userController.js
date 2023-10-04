import User from '../models/userModel.js';
import Recipe from '../models/recipeModel.js';
import bcrypt from 'bcrypt';
class UserController {

    async getUserDetail(req, res) {
        try {
            const { id } = req.params;
            const requestUser = await User.findById(req.user.id);
            let excluded = "-password";
            if (requestUser.role !== 'admin') {
                excluded += " -role";
            }
            const user = await User.findById(id).populate("ownerRecipes").populate("favoriteRecipes").populate({
                path: "followings",
                select: "_id name"
            }).select(excluded);
            return res.status(200).json({
                user: {
                    ...user,
                    owner: req.user.id == id
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async updateUserDetails(req, res) {
        try {
            const { id } = req.params;
            const requestUser = await User.findById(req.user.id);
            if (!requestUser) {
                return res.status(404).json({ message: "User not found" });
            }
            if (requestUser.role === 'admin') {
                await User.findByIdAndUpdate(id, {
                    status: req.body.status,
                    role: req.body.role
                });
            }
            else {
                const data = { ...req.body };
                delete data.role;
                delete data.status;
                if (data.password) {
                    data.password = await bcrypt.hash(data.password, 12);
                }
                await User.findByIdAndUpdate(id, data);
            }
            return res.status(200).json({ message: "Update successful" });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async userChiefFollow(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(req.user.id);
            const follower = await User.findById(id);
            if (!user || !follower) {
                return res.status(404).json({ message: "User not found" });
            }
            const isAlreadyFollowing = user.followings.includes(id);
            if (isAlreadyFollowing) {
                await User.findByIdAndUpdate(req.user.id, {
                    $pull: { followings: id }
                });
                await User.findByIdAndUpdate(id, {
                    $pull: { followers: req.user.id }
                });
            } else {
                await User.findByIdAndUpdate(req.user.id, {
                    $addToSet: { followings: id }
                });
                await User.findByIdAndUpdate(id, {
                    $addToSet: { followers: req.user.id }
                });
            }
            const action = isAlreadyFollowing ? "Unfollow" : "Follow";
            return res.status(200).json({ msg: `${action} ${follower.name} successfully!` });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async userRecipeFollow(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(req.user.id);
            const recipe = await Recipe.findById(id);
            if (!user || !recipe) {
                return res.status(404).json({ message: "User or recipe not found" });
            }
            const isAlreadyFollowing = user.favoriteRecipes.includes(id);
            if (isAlreadyFollowing) {
                await User.findByIdAndUpdate(req.user.id, {
                    $pull: { favoriteRecipes: id }
                });
                await Recipe.findByIdAndUpdate(id, {
                    $pull: { favorites: req.user.id}
                });
            } else {
                await User.findByIdAndUpdate(req.user.id, {
                    $addToSet: { favoriteRecipes: id }
                });
                await Recipe.findByIdAndUpdate(id, {
                    $addToSet: { favorites: req.user.id}
                });
            }
            const action = isAlreadyFollowing ? "Unfollow" : "Follow";
            return res.status(200).json({ msg: `${action} ${follower.name} successfully!` });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }
}

export default new UserController;