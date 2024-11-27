const commentModal = require('../models/comment.modal');

// Function to add a new comment
const createComment = async (mobile, utterance, score, image) => {
    try {
        // Validate input
        if (!mobile || !utterance || !score) {
            throw new Error("All fields (mobile, utterance, score) are required.");
        }

        // Validate score range (1 to 5)
        if (score < 1 || score > 5) {
            throw new Error("Score must be between 1 and 5.");
        }

        // Create a new comment record
        const data = await commentModal.create({ mobile, utterance, score, image });

        return data;
    } catch (err) {
        console.error("Error in createComment service:", err.message || err);
        // Rethrow the error to let the controller handle it
        throw err;
    }
};

// Function to get comments by mobile number
const receiveComments = async () => {
    try {

        // Find the comments for the provided mobile number
        const data = await commentModal.find();
        return data;
    } catch (err) {
        console.error("Error in receiveComments service:", err.message || err);
        // Rethrow the error to let the controller handle it
        throw err;
    }
};

module.exports = { createComment, receiveComments };
