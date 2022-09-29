const express = require('express');
const bodyParser = require('body-parser');
const route =require("./route/route.js");
const mongoose  = require('mongoose');

const app = express();

app.use(bodyParser.json()); 


mongoose.connect("mongodb+srv://ShailyTripathi:ShailyCompass2125@shailytripathi.ifjbsp5.mongodb.net/group54Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


 app.use('/', route);





app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


