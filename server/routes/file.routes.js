import { Router } from 'express';
const busboy = require('connect-busboy');
const fs = require('fs-extra');
const router = new Router();

router.route('/upload').post((req,res) => {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {    
    fstream = fs.createWriteStream( __dirname + '/../files/' + filename);
    file.pipe(fstream);
    fstream.on('close', function() {
      res.redirect('/todolist');
    })
  })
});

router.route('/download/:filename').get((req,res) => {
  let file = __dirname + '/../files/' + req.params.filename;
  res.download(file); // Set disposition and send it.
});

router.route('/delete/:filename').get((req,res) => {
  let filePath = __dirname + '/../files/' + req.params.filename;
  fs.unlink(filePath, function() {
    res.send ({
      status: "200",
      responseType: "string",
      response: "success"
    });     
  });
});


export default router;
