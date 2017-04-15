import { createStore } from "redux";
import rootReducer from "../../src/reducers";
import User from "../models/User";
import Project from "../models/Project";
import {
  projectIsMember,
  projectCheckMember
} from "../controllers/Project.ctrl";

export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.returnTo = req.path;
    res.redirect("/login");
  }
}
export async function isUser(req, res, next) {
  try {
    const sessionUser = req.session.passport.user;
    const user = await User.findById(sessionUser).populate("projects", "name chatroom");
    res.locals.User = user;
    next();
  } catch (e) {
    res.redirect("/login");
  }
}
export function isMember(req, res, next) {
  return projectIsMember(req, res, next);
}

export function checkSessionCheckProject(req, res, next) {
  req.isAuthenticated()
    ? // 프로젝트 가입되있는지 확인
      projectCheckMember(req, res, next)
    : // 다시 돌려보냄
      ((req.session.returnTo = req.path), res.redirect("/login"));
}

export function handleRender(req, res, next) {
  const preloadedState = { ...res.locals };
  const store = createStore(rootReducer, preloadedState);
  const finalState = store.getState();
  res.send(renderFullPage(finalState));
}

function renderFullPage(finalState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        ${process.env.NODE_ENV === "production" ? `<link rel='stylesheet' href='${assetsManifest["/app.css"]}' />` : ""}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <!-- Codemirror
         -->        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
        
        <!-- Firepad Css-->
        <link rel="stylesheet" href="https://cdn.firebase.com/libs/firepad/1.4.0/firepad.css" />

        <style>
           html { height: 100%; }
           body { margin: 0; height: 100%; position: relative; }
            
           #firepad-container {
             width: 100%;
             height: 100%;
           }

          #userlist {
            position: absolute; left: 0; top: 0; bottom: 0; height: auto;
            width: 175px;
          }          

        </style>
        
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, "\\u003c")}
        </script>
        <script src='${process.env.NODE_ENV === "production" ? assetsManifest["/manifest.js"] : "/manifest.js"}'></script>
        <script src='${process.env.NODE_ENV === "production" ? assetsManifest["/vendor.js"] : "/vendor.js"}'></script>
        <script src='${process.env.NODE_ENV === "production" ? assetsManifest["/app.js"] : "/app.js"}'></script>
              
      </body>
    </html>`;
}
