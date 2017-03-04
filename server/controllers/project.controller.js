import User from '../models/User';
import Project from '../models/Project';
import url from 'url';

export function projectGet(req,res){
  let query = url.parse(req.url, true).query.userId;
  User.findById(query)
    .populate('projects')
    .then(projects=>res.json(projects))
    .catch(err=>console.log(err));
}

export function projectPost(req,res){
  console.log("POST:::", req.body.project)
  var post = new Project(req.body.project);

  post.save()
    .then(project=>{
      console.log("INSIDE PROJECT POST SERVER::", project)
      User.findByIdAndUpdate(project._creatorId,
        {$push: {projects: project._id}},
        ()=>res.json(project))
    })
    .catch(err=>console.log(err))
}

export function projectDelete(req,res){
  Project.findByIdAndRemove()
  User.findById(req.body.form._userId)
    .populate('project')
    .then(user=>res.json(user))
    .catch(err=>console.log(err));
}