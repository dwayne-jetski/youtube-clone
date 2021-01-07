const mongoose = require('mongoose');
const Joi = require('joi');
const { join } = require('path');
const config = require('config');


const replySchema = new mongoose.Schema({
    commentId: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    text: {type: String, required: true},
    postDate: {type: Date, default: Date.now()},
});

const commentSchema = new mongoose.Schema({
    videoId: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    text: {type: String, required: true},
    replies: [replySchema],
    postDate: {type: Date, default: Date.now()},
});

const comments = mongoose.model('comments', commentSchema)
const replies = mongoose.model('replies', replySchema)

function validateComments(comments){
    const schema = Joi.object({
        videoId: Joi.string().required(),
        text: Joi.string().required(),
    });
    return schema.validate(comments);
}

//replies endpoint 
function validateReplies(replies){
    const schema = Joi.object({
        commentId: Joi.string().required(),
        text: Joi.string().required(),
    });
    return schema.validate(replies);
}

exports.replySchema = replySchema;
exports.comments = comments;
exports.replies = replies;
exports.validateComments = validateComments;
exports.validateReplies = validateReplies;