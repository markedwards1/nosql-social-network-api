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

// POST/create a new thought:

router.post('/thoughts', async (req, res) => {
    const newThought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        // reactions: [
        //     {
        //         reactionBody: req.body.reactionBody,
        //         username: req.body.username
        //     }
        // ]
    })
    await newThought.save()
    res.json(newThought)
})


// POST - REACTION
router.post("/thoughts/reaction/:id", async (req, res) => {
    try {
        const reaction = await Thought.findOne({ _id: req.params.id })
        
        if (req.body.reactionBody){
            reaction.reactionBody = req.body.reactionBody
        }
        
        if (req.body.username) {
            reaction.username = req.body.username
        }
        
        await reaction.save()
        res.send(reaction)
    }catch {
        res.status(404)
        res.send({ error: "user doesn't exist"})
    }
})


// UPDATE THOUGHT

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

//REACTION

router.patch("/reaction/:id", async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id })


        if (req.body.reactionBody){
            thought.reactions.reactionbody = req.body.reactionBody
        }
        
        //       reactions: [
        //     {
        //         reactionBody: req.body.reactionBody,
        //         username: req.body.username
        //     }
        // ]

        

        // if (req.body.reactionBody){
        //     thought.reactionBody = req.body.reactionBody
        // }
        
        // if (req.body.username) {
        //     thought.username = req.body.username
        // }
        
        await thought.reactions.save()
        res.send(thought.reactions)
    }catch {
        res.status(404)
        res.send({ error: "user doesn't exist"})
    }
})


// DELETE to remove user by its _id

router.delete('/thoughts/:id', async (req, res) => {
    const thoughts = await Thought.deleteOne({ _id: req.params.id})
    res.send(console.log("deleted"))
    
    });

// router.delete("/:id", async (req, res) => {
//     try{
//         await User.deleteOne({ _id: req.params.id })
        
//         res.status(204).send()
//     }catch {
//         res.status(404)
//         res.send({ error: "post doesn't exisit! but we are in the right place" })
//     }
// })



// BONUS: Remove a user's associated thoughts when deleted.

module.exports = router;