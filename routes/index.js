const express = require('express');
const router = express.Router();

const Url = require('../models/url')

router.get('/:code' , async function(req , res){
    try {
        const url = await Url.findOne({urlCode : req.params.code}).orFail()
        if(url){
            res.redirect(url.longUrl)
        }else{
            res.status(404).json('no url found')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('server error')
    }
})


module.exports = router;