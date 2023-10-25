import commentModel from "../models/commentModel.js";
import { io } from "../index.js";
class CommentController {
  async createComment(req, res) {
    try {
      const { content, recipeId } = req.body;
      const userId = req.user._id;

      const newComment = new commentModel({
        owner: userId,
        content,
        recipeId,
      });

      const savedComment = await newComment.save();
      io.emit("commentAdded", savedComment);

      return res.status(201).json({
        success: true,
        data: savedComment,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getCommentsForRecipe(req, res) {
    try {
      const { recipeId } = req.params;

      const comments = await commentModel.find({ recipeId });

      return res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new CommentController();
