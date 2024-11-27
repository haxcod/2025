const commentService = require('../services/comment.service');

// Function to create a new comment
const createComment = async (req, res) => {
    const { mobile, utterance, score, image } = req.body;
    
    // Validate input
    if (!mobile || !utterance || !score) {
        return res.status(400).json({
            status: 400,
            message: "All fields (mobile, utterance, score) are required.",
        });
    }

    // Validate score range (1 to 5)
    if (score < 1 || score > 5) {
        return res.status(400).json({
            status: 400,
            message: "Score must be between 1 and 5.",
        });
    }

    try {
        // Call the service to create the comment
        const comment = await commentService.createComment(mobile, utterance, score, image);
        return res.status(201).json({
            status: 201,
            message: "Comment created successfully.",
            data: comment,
        });
    } catch (err) {
        console.error("Error in createComment:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

// Function to get all comments
const getComments = async (req, res) => {
    try {
        // Call the service to fetch all comments
        const comments = await commentService.receiveComments();
        return res.status(200).json({
            status: 200,
            message: "Comments retrieved successfully.",
            data: comments,
        });
    } catch (err) {
        console.error("Error in getComments:", err.message || err);
        return res.status(500).json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
};

module.exports = { createComment, getComments };
