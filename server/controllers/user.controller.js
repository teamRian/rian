import User from '../models/User';
import Plan from '../models/Plan';
import url from 'url';

export function userCheck(req,res){
  User.findOne({username: req.body.form.username}) 
    .exec((err, user)=>{
      if(err) console.log(err);

      //user가 없을 경우
      if(user === null){
        const newUser = new User(req.body.form);
        newUser.save()
          .then(user=>{
            res.json(user);
          })
          .catch(err=>console.log(err))
      } else {
          res.status(300).send('USER EXISTS');
      }
    })
}

export function userLogIn(req,res){
  User.findOne({username: req.body.form.username})
    .exec((err, user)=>{
      if(err) console.log(err);
      if(user === null){
        res.status(300).send('USER DOESNT EXIST')
      } else {
        res.json(user);
      }
    })
}