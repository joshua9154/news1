 var express = require("express");
 var router = express.Router();
 let request = require('request');
 
 
const cors = require('cors');


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));


router.get("/", function(req, res, next) {
   res.render("404", { title: "404" });
 });
 
 
module.exports = router;