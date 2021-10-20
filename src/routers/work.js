const express = require('express')
const router = express.Router()

const Work = require('../models/works')


//    Creat work
router.post('/works', (req, res) => {
    const user = new Work(req.body)
    user.save().then((result) => {
      return  res.status(201).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});

//    Get work
router.get('/works', async(req, res) => {
    
    try{
         const user = await Work.find({})
        res.json(user)
     }catch(e){
         res.status(400).json(e)
     }
});
    //    Get work by their ID
router.get('/works/:id', async(req, res) => {
    const _id = req.params.id

    try{
      const user = await Work.findById({_id})
      if(!user){
         return res.status(404).json({message: "Id did not match with given id"})
      }
      res.json(user)
    }catch(e){
        res.status(400).json(e)
    }
});

router.patch('/works/:id', async(req, res) => {
       const updates = Object.keys(req.body)
       const allowedUpdates = ['title', 'description']
       const isValidateOperation = updates.every((update) =>allowedUpdates.includes(update))
          
       
       if(!isValidateOperation){
           return res.status(404).json({message : "Invalid Updates"})
       }
    
       try{
           const user = await Work.findByIdAndUpdate(req.params.id, req.body,{new :true, isValidate: true})
           if(!user){
               return res.status(404).json()
           }
            res.json(user)
       }catch(e){
            res.status(404).json(e)
       }
    
       });

       
       router.delete('/works/:id', async (req, res) => {
           try{
            const user = await Work.findByIdAndDelete(req.params.id)
            if(!user){
               return res.status(404).json({message : 'try another id'})
            }
            res.json({user})
        }catch(e){
             res.status(400).json({e})
        }
    })
    


module.exports = router