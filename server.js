const express = require("express");
const app = express();
const user = require("./route/user");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");

require("./model/User");


const PORT = process.env.PORT || 1000;
const mongodbURL = "mongodb://127.0.0.1:27017/loginDb"

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/",user);



mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
    .then(() => console.log(`mongoose is running..`))
    .catch((error) => console.log(error));



app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})

