const User = require('../models/User');
const Thought = require('../models/Thought');
const router = require('express').Router();

// GET all Thoughts
router.get("/thoughts", async (req, res) => {
   Thought.find({})
    .then((thoughts) => {
        res.json(thoughts)
    })
})


// GET a single thought by its _id and populated thought and friend data

router.get('/thoughts/:id', async (req, res) => {
    const thoughts = await Thought.findOne({ _id: req.params.id})
    res.send(thoughts)
    
    });

// POST a new thought:

router.post('/thoughts', async (req, res) => {
    const newThought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        reactions: [
            {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            }
        ]
    })
    await newThought.save()
    res.send(newThought)
})

// PUT to update a user by its _id

router.patch("/thoughts/:id", async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id })

        if (req.body.thoughtText){
            thought.thoughtText = req.body.thoughtText
        }

        if (req.body.username) {
            thought.username = req.body.username
        }

        await thought.save()
        res.send(thought)
    }catch {
        res.status(404)
        res.send({ error: "user doesn't exist"})
    }
})

// DELETE to remove user by its _id

router.delete("/thoughts/:id", async (req, res) => {
    try{
        await Thought.deleteOne({ _id: req.params.id })
        res.status(204).send().then({message: "deleted"})
  
    }catch {
        res.status(404)
        res.send({ error: "post doesn't exisit!" })
    }
})

// router.post('/thoughts/reactions/:id', async (req, res) => {
//     const thoughts = new Thought;
//     const reaction = new reactions {
//         reactionBody: 
//         [
//         {
//             reactionBody: req.body.reactionBody,

//         }
//     ]
//     }

//     await reaction.save()
//     res.send(reaction)
// })

// BONUS: Remove a user's associated thoughts when deleted.

module.exports = router;