const mongoose = require('mongoose');
const Joi = require('joi');
const { join } = require('path');
const config = require('config');


const replySchema = new mongoose.Schema({
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
        likes: Joi.number(). default(),
        dislikes: Joi.number(). default(),
        text: Joi.string().required(),
        replies: Joi.string().required().default().number(),
    });
    return schema.validate(comments);
}

exports.replySchema = replySchema;
exports.validate;
exports.comments;
exports.replies;
