import User from "../models/User";
import Project from "../models/Project";
import Link from "../models/Link";
import url from "url";

export function projectGet(req, res) {
  // query === User._id
  let query = url.parse(req.url, true).query._id;
  Project.findById(query)
    .populate("member", "email last_login name picture _id")
    .then(project => res.json(project))
    .catch(err => console.log(err));
}

export function projectPost(req, res) {
  // Project Add
  const post = new Project(req.body.project);
  post
    .save()
    .then(project => {
       const newLink = {
        creator: req.body.project.creator,
        projectId
      }
      User.findByIdAndUpdate(
        project.creator,
        { $push: { projects: project._id } },
        () => res.json(project)
      );
    })
    .catch(err => console.log(err));
}

export function projectCheckMember(req, res, next) {
  const sessionUser = req.session.passport.user;
  Project.findById(req.path.split("/")[2], (err, project) => {
    const check = project.member.includes(sessionUser);
    check
      ? //  프로젝트의 멤버라면
        next()
      : // 프로젝트의 멤버가 아니라면 가입시켜준다
        (project.member.push(
          sessionUser
        ), User.findById(sessionUser, (err, user) => {
          user.projects.push(project._id);
          Promise.all([user.save(), project.save()])
            .then((user, project) => {
              next();
            })
            .catch(err => {
              console.error(err);
            });
        }));
  });
}

// export function projectDelete(req,res){
//   Project.findByIdAndRemove()
//   User.findById(req.body.form._userId)
//     .populate('project')
//     .then(user=>res.json(user))
//     .catch(err=>console.log(err));
// }
