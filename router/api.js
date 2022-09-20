const User = require('../models/User');
const router = require('express').Router();
// /api/users

// GET all users
router.get('/users', (req, res) => {
    User.find({})
    .populate("thoughts")
    .populate("friends")
    .then((users) => {
        res.json(users);
    });
});

// GET a single user by its _id and populated thought and friend data

router.get('/users/:id', async (req, res) => {
    const user = await User.findOne({ _id: req.params.id})
    res.send(user)
    
    });

// POST a new user:

router.post('/users', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
    })
    await newUser.save()
    res.send(newUser)
})

// PUT to update a user by its _id

router.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id })

        if (req.body.username){
            user.username = req.body.username
            user.email = req.body.email
        }

    
        await user.save()
        res.send(user)
    }catch {
        res.status(404)
        res.send({ error: "user doesn't exist"})
    }
})

// DELETE to remove user by its _id

router.delete("/users/:id", async (req, res) => {
    try{
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send()
    }catch {
        res.status(404)
        res.send({ error: "post doesn't exisit!" })
    }
})

// add friend
router.post('/create-friend/:id/:friendId', async (req, res) => {
    await User.findOneAndUpdate({ _id: req.params.id },
        {$push: {friends :req.params.friendId}}
       )
       
       res.send({ message: "you got a friend"})
   })


// delete friend
router.put('/delete-friend/:id/:friendId', (req, res) => {
    User.findOneAndRemove(
        {_id: req.params.id},
        {$pull: {friends: req.params.friendId}}
        
        
        )
        res.send("no friends")
})

// BONUS: Remove a user's associated thoughts when deleted.

module.exports = router;