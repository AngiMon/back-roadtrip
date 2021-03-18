const express = require('express');
var router = express.Router();
const bodyparser = require ('body-parser');
const multiparty = require('connect-multiparty');
const { error } = require('console');

const path = require('path');

const fs = require('fs');

var app = require('../app');

const MuiltiPartyMiddleware = multiparty({uploadDir:"./uploads"});
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

 app.use(express.static("uploads"));

app.post('/ck/uploads', MuiltiPartyMiddleware, (req, res) =>{
    
    var TempFile = req.files.upload;
    var TempPathfile = TempFile.path;

   const targetPathUrl = path.join(__dirname,"../uploads/"+TempFile.name);

   if(path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg"){
     
    fs.rename(TempPathfile, targetPathUrl, err =>{

        res.status(200).json({
         uploaded: true,
          url: `http://localhost:8080/${TempFile.originalFilename}`
        });

        if(err) return console.log(err);
    })
   }
    //console.log(req.files);
})



module.exports = router;