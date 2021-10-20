const express = require('express')
const router = express.Router()

const Post = require('../models/posts');


router.post('/posts',  (req, res) => {
    const user = new Post(req.body)
     
    user.save().then((result) => {
         return res.status(201).json(result)
     }).catch((err) => {
         res.status(400).json(err)
     })
});

router.get('/posts', (req, res) => {
     Post.find({}).then((user) =>  {
      res.send(user)
    }).catch((err) => {
        res.status(404).send(err)
    })
})

router.get('/posts/:id', (req, res) => {
    const _id = req.params.id
   
     Post.findById(_id).then((result) => {
        if(!result){
            return res.status(404).json('id could not match with given id')
        }
        res.json(result) 
    }).catch((error) => {
        res.status(500).json(error)
    })

});

router.patch('/posts/:id', (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isUpdates = updates.every((update) => allowedUpdates.includes(update))

    if(!isUpdates){
        return res.status(404).json({error: 'Invalid updates'})
    }
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators : true}).then((result) =>{
           res.json(result) 
    }).catch((e) => {
        res.status(500).json(e)
    })
});

router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id).then((result) => {
       return res.json(result)
    }).catch((e) => {
        res.status(500).json(e)
    })
})

module.exports = router