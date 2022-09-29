const express = require('express');
const route = express.route();

const urlController = require("../controller/urlController");


route.post("/url/shorten",urlController.createUrl)

route.get("/:urlCode",urlController.getUrl)



router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "The api you request is not available"
    })
})
module.exports = route;