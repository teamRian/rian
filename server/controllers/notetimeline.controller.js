import User from '../models/User';
import url from 'url';
import mongoose from 'mongoose';
import Promise from 'bluebird'
mongoose.Promise = Promise


export function getnoteTimeline(req,res){
  var parsed = url.parse(req.url, true).query; // true parse queryString
    console.log(parsed["0"])
    User.findOne({id : parsed["0"]})
      .then( response => {
        console.log('response from database: ', response)
        res.json(response)
      })
      .catch( err => console.log(err) )

}


export function saveNote(req,res){
	console.log("req", req.body)
   
      User.findOne({ id: 'testrock' }).exec(function(err, user){
      // console.log("user", user)
   
      // user.note.push(req.body.data)
      // user.save()
      res.sendStatus(200)
    }).catch(function(err){
      console.log(err)
    })




}



