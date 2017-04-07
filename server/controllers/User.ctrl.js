import User from '../models/User';
import url from 'url';

export function userCheck(req,res){
  console.log("BODY FORM::: ", req.body.form)
  User.findOne({email: req.body.form.username}) 
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

export function userLogIn(body,res){
  User.findOne({email: body.form.email})
    .exec((err, user)=>{
      if(err) console.log(err);
      if(user === null){
        res.status(300).send('USER DOESNT EXIST')
      } else {
        res.json(user);
      }
    })
}

export function userFacebookLogIn(body,res){
  User.findOne({_id: body.passport.user})
    .exec((err, user)=>{
      if(err) console.log(err);
      if(user === null){
        res.status(300).send('USER DOESNT EXIST')
      } else {
        res.json(user);
      }
    })
}