const shortUrl = require("node-url-shortener");
const urlmodel = require("../model/urlModel")
const {isValid,isValidUrl} =("../validation/validation.js")


const createUrl= async function(req,res){
    try {
        const {longUrl} = req.body;
        
        if(Object.keys(longUrl).length == 0){
            return res.status(400).send({status:false,message:"please provide data"})
        }
    if(!isValid(longUrl)){
        return res.status(400).send({status:false,message:"please provide Url and url should be string"})
    }
    if (!isValidUrl(longUrl)){
        return res.status(400).send({status:false,message:"please provide valid Url"})  
    }
    let short = shortUrl.short(longUrl, function (err, url) {
        if(err) return res.status(400).send({status:false,message:err.message});
    });


    } catch (error) {
        
    }
}