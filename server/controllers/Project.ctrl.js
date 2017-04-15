import User from "../models/User";
import Project from "../models/Project";
import Link from "../models/Link";
import url from "url";

export function projectGet(req, res) {
  // query === User._id
  let query = url.parse(req.url, true).query._id;
  Project.findById(query)
    .populate("member", "email last_login name picture _id")
    .populate("link")
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

export async function projectIsMember(req, res, next) {
  // console.log("PROJECT IS MEMBER");
  try {
    const sessionUser = req.session.passport.user;
    const project = await Project.findById(req.path.split("/")[2])
    const user = await User.findById(sessionUser).populate("projects", "name chatroom");
    const member = project.member.map(objectId=>objectId.toString());
    const check = member.includes(sessionUser);
    res.locals.Project = project;
    res.locals.User = user;
    next();
  } catch (e) {
    res.redirect('/me');
  }
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

export async function projectLink(req, res, next) {
  const { _id, link, creator } = req.body;
  let newLink;
  newLink = link === undefined
  ? await Link.create({creator, project_id:_id})
  : await Link.update({_id}) 
  await Project.update({_id}, { $set: {link: newLink}});
  return next()
}

// export function projectDelete(req,res){
//   Project.findByIdAndRemove()
//   User.findById(req.body.form._userId)
//     .populate('project')
//     .then(user=>res.json(user))
//     .catch(err=>console.log(err));
// }
