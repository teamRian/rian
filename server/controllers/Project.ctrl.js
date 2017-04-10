import User from '../models/User';
import Project from '../models/Project';
import url from 'url';

export function projectGet(req,res){
  // query === User._id
  let query = url.parse(req.url, true).query._id;
  console.log("PROJECT GET QUERY : ", query);
  User
    .findById(query)
    .populate('projects')
    .then(user=>{
      // user = User
      res.json(user.projects)
    })
    .catch(err=>console.log(err));
}

export function projectPost(req,res){
  var post = new Project(req.body.project);

  post.save()
    .then(project=>{
      User.findByIdAndUpdate(project.creator,
        {$push: {projects: project._id}},
        ()=>res.json(project))
    })
    .catch(err=>console.log(err))
}

// export function projectDelete(req,res){
//   Project.findByIdAndRemove()
//   User.findById(req.body.form._userId)
//     .populate('project')
//     .then(user=>res.json(user))
//     .catch(err=>console.log(err));
// }