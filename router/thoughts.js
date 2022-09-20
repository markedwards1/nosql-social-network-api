const User = require('../models/User');
const Thought = require('../models/Thought');
const router = require('express').Router();

// GET all Thoughts
router.get("/get-all", async (req, res) => {
   Thought.find({})
    .then((thoughts) => {
        res.json(thoughts)
    })
})


// GET a single thought by its _id and populated thought and friend data

router.get('/get-by-id/:id', async (req, res) => {
    const thoughts = await Thought.findOne({ _id: req.params.id})
    res.send(thoughts)
    
    });

// POST/create a new thought:

router.post('/create', async (req, res) => {
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
// UPDATE THOUGHT

router.patch("/update/:id", async (req, res) => {
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

router.delete('/delete/:id', async (req, res) => {
    const thoughts = await Thought.deleteOne({ _id: req.params.id})
    res.send(console.log("deleted"))
    
    });



//CREATE A REACTION
router.post('/create-reaction/:id', async (req, res) => {
 await Thought.findOneAndUpdate({ _id: req.params.id },{$push : req.body}
    )
    console.log(req.body)
    res.send(req.body)
})


//DELETE REACTION

router.delete('/delete-reaction/:id/reaction/:reactionId', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, 
    { $pull: { reactions: {reactionId : req.params.reactionId}} },
    
    { runValidators: true, new: true }
    )
    
    res.send({ message : "deleted"})
})



// BONUS: Remove a user's associated thoughts when deleted.

module.exports = router;