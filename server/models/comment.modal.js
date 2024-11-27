const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^[6-9]\d{9}$/.test(v), // Validates Indian mobile numbers
                message: (props) => `${props.value} is not a valid mobile number.`,
            },
        },
        utterance: {
            type: String, 
            required: true,
        },
        score: {   // 1 to 5 star point (changed to Number)
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        image: { 
            type: String,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
