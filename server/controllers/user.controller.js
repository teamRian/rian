import User from '../models/User';
import Plan from '../models/plan';
import url from 'url';

export function userCheck(req,res){
  console.log("USER CHECK::", req.body.form)
  User.findOne({username: req.body.form.username}) 
    .exec((err, user)=>{
      if(err) console.log(err);

      //user가 없을 경우
      if(user === null){
        const newUser = new User(req.body.form);
        console.log("NEW USER!!", newUser);
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
  console.log('USERLOGIN!!!', req.body)
  User.findOne({username: req.body.form.username})
    .exec((err, user)=>{
      if(err) console.log(err);
      console.log("USERRRR LOGIN", user)
      if(user === null){
        res.status(300).send('USER DOESNT EXIST')
      } else {
        res.json(user);
      }
    })
}