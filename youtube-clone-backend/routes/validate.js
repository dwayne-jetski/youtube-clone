const {comments, validateComments, replies} = require('../models/youtube-player-schema');
const express = require('express');
const { required } = require('joi');
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
        const videoComments = await comments.find();

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
        const { error } = validateComments(req.body);
        if(error)
            return res.status(400).send(error);

        const comments = new comments({
            videoId: req.body.videoId,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            text: req.body.text,
        });

await comments.save();

return res.send(comments);
} catch(ex){
    console.log(ex);
 return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

router.put('/:id', async (req, res) => {
    try{
        const{ error } = validateComments(req.body);
        if(error) return res.status(400).send(error);

        const comments = await comments.findByIdAndUpdate(
            req.params.id,
            {
                videoId: req.body.videoId,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                text: req.body.text,
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

router.get('/like/:id', async (req, res) => {
    comments.findOneAndUpdate({
        _id: req.params.id, 
<<<<<<< HEAD
         $inc: { like : 1 }},
=======
        $inc: { like : 1 }},
>>>>>>> 87482625603d55557b66dc1abd79e8fb8ea78988
        {new: false})
    });

router.get('/dislike/:id', async (req, res) => {
    comments.findOneAndUpdate({
        _id: req.params.id,
<<<<<<< HEAD
         $inc: { like: -1 }},
        {new: false})
    });

=======
        $inc: { like: -1 }},
        {new: false})
    });
>>>>>>> 87482625603d55557b66dc1abd79e8fb8ea78988

module.exports = router;

