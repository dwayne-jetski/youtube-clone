const mongoose = require('mongoose');
const Joi = require('joi');
const { join } = require('path');
const config = require('config');


const searchResultsSchema = new mongoose.Schema({
    videoId: {type: String, required: true},
    views: {type: Number, default: 0},
    postDate: {type: Date, default: Date.now()},
    videoName: {type: String, required: true},
    channelName: {type: String, required: true},
});

function validateSearchResults(product){
    const schema = Joi.object({
        videoId: Joi.string().required(),
        views: Joi.number().default(),
        videoName: Joi.string().required(),
        channelName: Joi.number().required(),
    });
    return schema.validate(searchResults);
}

exports.validate;
exports.searchResults;
