import { Router } from 'express';
const busboy = require('connect-busboy');
const fs = require('fs-extra');

const router = new Router();

router.route('/upload').post((req,res)=>{

  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {    
    fstream = fs.createWriteStream( __dirname + '/../files/' + filename);
    file.pipe(fstream);
    fstream.on('close', function() {
      res.redirect('/todolist');
    })
  })
});

export default router;
