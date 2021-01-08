const {comments, validateComments, replies, validateReplies} = require('../models/youtube-player-schema');
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
        console.log(req.body);

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
    const updatedLike = await comments.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $inc: {likes: 1}
    });
        return res.send(updatedLike);
    });

router.get('/dislike/:id', async (req, res) => {
    const updatedLike = await comments.findOneAndUpdate({
        _id: req.params.id
    },
    {
        $inc: {dislikes: 1}
    });
        return res.send(updatedLike);
    });
//replies endpoint
// router.get('/:id', async (req, res) => {
//     try{
//         const videoReplies = await replies.find({commentId: req.params.id});
//         console.log(videoReplies)
//         if(!videoReplies)
//         return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
//         return res.send(videoReplies);
//     } catch (ex){
//         return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
// });

// router.get('/', async (req, res) => {
//     try{
//         const videoReplies = await replies.find();
//         console.log(videoReplies)
//         if(!videoReplies)
//         return res.status(400).send(`The comment with id "${req.params}" does not exist.`);
//         return res.send(videoReplies);
//     } catch (ex){
//         return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
// }
// );

router.post('/replies/', async (req, res) => {
    try{
        const { error } = validateReplies(req.body);
        if(error){
        console.log(error)
                    return res.status(400).send(error);
    }     
        const comment = comments.findById(req.body.commentId);
        if(!comment){
        return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
    }        
        const reply = new replies({
            commentId: req.body.commentId,
            text: req.body.text,
        });
    
await reply.save();

return res.send(reply);
} catch(ex){
    console.log(ex);
 return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

router.put('/replies/:id', async (req, res) => {

    try{
        const{ error } = validateReplies(req.body);
        if(error) return res.status(400).send(error);

        const reply = await replies.findByIdAndUpdate(
            req.params.id,
            {
                commentId: req.body.commentId,
                text: req.body.text,
            },
            {new: true}
        );
        if (!reply)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            await reply.save();

            return res.send(reply);
          } catch(ex) {
              return res.status(500).send(`Internal Server Error: ${ex}`);
          }
});

router.delete('/replies/:id', async (req, res) => {
    try{

        const reply = await replies.findByIdAndRemove(req.params.id);

        if (!reply)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

        return res.send(reply);
    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});
    
module.exports = router;

