const {comments, validateComments, replies} = require('../models/youtube-player-schema');
const express = require('express');
const { required } = require('joi');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try{
        const videoComments = await comments.find({videoId: req.params.id});
        console.log(videoComments)
        if(!videoComments)
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        return res.send(videoComments);
    } catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/', async (req, res) => {
    try{
        const videoComments = await comments.find();
        console.log(videoComments)
        if(!videoComments)
        return res.status(400).send(`The comment with id "${req.params}" does not exist.`);
        return res.send(videoComments);
    } catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}
);

router.post('/', async (req, res) => {
    try{
        const { error } = validateComments(req.body);
        if(error)
            return res.status(400).send(error);

        const comment = new comments({
            videoId: req.body.videoId,
            text: req.body.text,
        });

await comment.save();

return res.send(comment);
} catch(ex){
    console.log(ex);
 return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

router.put('/:id', async (req, res) => {
    try{
        const{ error } = validateComments(req.body);
        if(error) return res.status(400).send(error);

        const comment = await comments.findByIdAndUpdate(
            req.params.id,
            {
                videoId: req.body.videoId,
                text: req.body.text,
            },
            {new: true}
        );
        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            await comment.save();

            return res.send(comment);
          } catch(ex) {
              return res.status(500).send(`Internal Server Error: ${ex}`);
          }
});

router.delete('/:id', async (req, res) => {
    try{

        const comment = await comments.findByIdAndRemove(req.params.id);

        if (!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

        return res.send(comment);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/like/:id', async (req, res) => {
    comments.findOneAndUpdate({
        _id: req.params.id, 
         $inc: { like : 1 }},
        {new: false})
    });

router.get('/dislike/:id', async (req, res) => {
    comments.findOneAndUpdate({
        _id: req.params.id,
        $inc: { like: -1 }},
        {new: false})
    });

module.exports = router;

