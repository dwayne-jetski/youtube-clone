const {comments, validate} = require('../models/youtube-player-schema');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try{
        const videoComments = await comments.findById(req.params.id);

        if(!comments)
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
        return res.send(videoComments);
    } catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/', async (req, res) => {
    try{
        const videoComments = await comments.findAll();

        if(!comments)
        return res.status(400).send(`The comment with id "${req.params}" does not exist.`);
        return res.send(videoComments);
    } catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}
);

router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body);
        if(error)
            return res.status(400).send(error);

        const comments = new comments({
            videoId: req.body.videoId,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            text: req.body.text,
            replies: req.body.replies,
        });

await comments.save();

return res.send(comments);
} catch(ex){
 return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

router.put('/:id', async (req, res) => {
    try{
        const{ error } = validate(req.body);
        if(error) return res.status(400).send(error);

        const comments = await comments.findByIdAndUpdate(
            req.params.id,
            {
                videoId: req.body.videoId,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                text: req.body.text,
                replies: req.body.replies,
            },
            {new: true}
        );
        if (!comments)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            await comments.save();

            return res.send(comments);
          } catch(ex) {
              return res.status(500).send(`Internal Server Error: ${ex}`);
          }
});

router.delete('/:id', async (req, res) => {
    try{

        const comments = await comments.findByIdAndRemove(req.params.id);

        if (!comments)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

        return res.send(comments);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;
