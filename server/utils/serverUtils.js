import Project from '../models/Project';
import { projectCheckMember } from '../controllers/Project.ctrl';

export function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log('LOG IN CHECK')
      return next();
    } else {
      console.log('LOG IN FAILED', req.path); 
      req.session.returnTo = req.path; 
      res.redirect('/login');
    }

    // if they aren't redirect them to the home page
}

export function checkSessionCheckProject(req, res, next) {
  req.isAuthenticated()
  ? // 프로젝트 가입되있는지 확인
    projectCheckMember(req, res, next)
  : (// 다시 돌려보냄 
    req.session.returnTo = req.path,
    res.redirect('/login')
    )
}
