import User from "../models/User";
import url from "url";

export function userCheck(req, res) {
  User.findOne({ email: req.body.form.username }).exec((err, user) => {
    if (err) console.log(err);

    //user가 없을 경우
    if (user === null) {
      res.status(200).send("OK")

    } else {
      res.status(300).send("USER EXISTS");
    }
  });
}

export function emailCheck(req, res) {

  const { email, _id } = req.body;
  User.findOne({ email })
    .exec((err, user) => {
      if (err) console.log(err);
      //user가 없을 경우
      if (user === null) {
        emailRegister(_id, email, res);
      } else {
        res.status(204).send(email);
      }
    });
}

export function emailRegister(_id, email,res) {
  User.findById(_id, (err, user)=>{
    user.email = email;
    user.email_verified = true;
    user.save((err, updatedUser)=>{
          if (err) throw err;
          res.status(200).send(updatedUser);
        });
  })
}

export function userLogIn(body, res) {
  User.findOne({ email: body.form.email }).exec((err, user) => {
    if (err) console.log(err);
    if (user === null) {
      res.status(300).send("USER DOESNT EXIST");
    } else {
      res.json(user);
    }
  });
}

export function userFacebookLogIn(body, res) {
  User.findById(body.passport.user)
    .populate("projects", "name chatroom")
    .then(user => {
      if (user === null) {
        res.status(300).send("USER DOESNT EXIST");
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res.status(300).send("FB LOGIN ERROR");
    });
}
