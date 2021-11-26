const express = require('express');
const router = express.Router();
const Info = require('../models/info');

router.get('/info/:userId', async(req, res)=> {
    const {userId} = req.params;

    const info = await Info.findOne({userId}).exec();
    if(!info){
        res.status(400).send({message: "info doesn't exist"});
        return;
    }

    res.send({payload: info,
        message: 'get info success'});
})


// create rating
router.post('/info', async(req, res)=> {
    console.log(req.body)
    const {userId, dog, cat, bear, fox, dino, rabbit} = req.body;
    if(!userId){
        res.status(400).send({message: 'userId 없음'});
        return;
    }
    const check = await Info.find({userId}).exec();
    if(check.length){
        res.send({message: 'already info exist'});
        return;
    }
    const info = new Info({userId, dog, cat, bear, fox, dino, rabbit});
    await info.save();
    res.send({message: 'info create success'});
})


// //rating delete 
// router.delete('/ratings/:userId', async(req, res)=> {
//     const {userId} = req.params;
//     const rating = await Rating.findOne({userId}).exec();
//     if(!rating){
//         res.send({message: 'rating 정보 없음'});
//         return;
//     }
//     await rating.delete();
//     res.send({message: 'rating delete 성공'});

// })

module.exports = router;