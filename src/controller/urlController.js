const urlModel = require("../model/urlModel");
const shortid = require('shortid')


//==================================================Validation===========================================================
const isValid = function (value) {
    if (typeof value !== "string" || value.trim().length == 0) {
        return false
    }
    return true
};


let isValidUrl = (value) => {
    let urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    return urlRegex.test(value)

}
//===============================================short Url=================================================================//
const createUrl = async function (req, res) {
    try {
        let body = req.body;
        if ((Object.keys(body)).length == 0) {
            return res.status(400).send({ status: false, message: "please provide data" })
        }
        let { longUrl } = body
        

        
        if (!isValid(longUrl)) {
            return res.status(400).send({ status: false, message: "please provide Url and url should be string" })
        }

        if (!isValidUrl(longUrl)) {
            return res.status(400).send({ status: false, message: "please provide valid Url" })
        }
        
        let existingLongUrl = await urlModel.findOne({longUrl: longUrl})
        if(existingLongUrl) {  return res.status(400).send({ status: false, message: "longUrl already exists" })}

        let short = shortid.generate(longUrl)


        if (!short) {
            return res.status(400).send({ status: false, msg: short })
        }
        

        let obj = { longUrl, shortUrl: `http://localhost:3000/${short}` }
        obj.urlCode =  short.toLowerCase()
      //  console.log(obj)
 

        let Data = await urlModel.create(obj)
        return res.status(201).send({ status: true, data: obj })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//======================================================get url===========================================================
// ### GET /:urlCode
// - Redirect to the original URL corresponding
// - Use a valid HTTP status code meant for a redirection scenario.
// - Return a suitable error for a url not found
// - Return HTTP status 400 for an invalid request


const getUrl = async function (req, res) {
    let paramId = req.params.urlCode
     

    paramId = paramId.toLowerCase()

    if (!isValid(paramId)){
        return res.status(400).send({ status: false, msg: "Please Enter Valid UrlCode"}) 
    }


    let redirect = await urlModel.findOne({urlCode:paramId}).select({longUrl:true,_id:false})
    if(!redirect){
        return res.status(404).send({ status: false, msg: "No Url Found"})
    }
    return res.status(302).redirect(redirect.longUrl)


}     

module.exports = {createUrl ,getUrl}