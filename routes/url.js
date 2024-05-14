const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const baseUrl = config.get('baseUrl');

const Url = require('../models/url');

router.post('/shorten' , async function(req , res){
    const { longUrl } = req.body;
   
    const urlCode = shortId.generate();

      if(!validUrl.isUri(baseUrl)){
          res.status(401).json('invalid base url')
      }

      if(validUrl.isUri(longUrl)){
         try {
            
            let url = await Url.findOne({longUrl})
             
               if(url){
                   console.log('url exist')
                   res.status(200).json(url)
               }else{

                    const shortUrl = baseUrl + '/' + urlCode;

                    const newUrl = new Url({
                         urlCode,
                         longUrl,
                         shortUrl
                    })

                    await newUrl.save();
                    console.log('new url created')
                    res.status(200).json(newUrl)
               }
            
         } catch (err) {
            console.log('failed to procced');
            
         }
      }else{

        
      }
})

module.exports = router;