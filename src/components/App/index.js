import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

/*----------  ACTIONS  ----------*/
import {
  userCheckAuth,
  userSignUp,
  userLogIn,
  userLogOut,
  userRegisterEmail,
  userAddProject
} from "../../actions/UserActions";
import {
  projectPost,
  projectDetach,
  projectLinkMakeOrExtend
} from "../../actions/ProjectActions";
import {
  projectEpicRequestData,
  projectEpicCancleData,
  projectEpicRequestLink
} from "../../epics/ProjectEpic";
/*============================
=            RIAN            =
============================*/
import Header from "./Header/HeaderContainer";
import Body from "./Body/BodyContainer";
// import Header from "../components/Rian/Header";
// import FirebaseChatContainer from "./FirebaseChat/FirebaseChatContainer.js";

// /*----------  ME NAVIGATION  ----------*/
// import MeNavigation from "../components/Rian/Me/MeNavigation.js";
// import MeNavHome from "../components/Rian/Me/MeNavHome.js";
// import CalendarSubComponent from "./Calendar/CalendarSub.js";
// import NotetimelineContainer from "./NoteTimeline/NotetimelineContainer";

// /*----------  PROJECT NAVIGATION  ----------*/
// import ProjectNavigation from "../components/Rian/Project/ProjectNavigation.js";
// import ProjectNavHome from "../components/Rian/Project/ProjectNavHome";
// import ProjectNavNote from "../components/Rian/Project/ProjectNavNote";
// import ProjectNavFile from "../components/Rian/Project/ProjectNavFile";

// /*----------  ME MAIN  ----------*/
// import MeHome from "../components/Rian/Me/MeHome";
// import CalendarComponent from "./Calendar/Calendar.js";
// import NoteEditor from "./NoteEditor/NoteEditorContainer";

// /*----------  PROJECT MAIN  ----------*/
// import WhiteBoardComponent from "./WhiteBoard/WhiteBoardContainer.js";
// import NewProject from "../components/Rian/Project/NewProject";
// import ProjectAddMember from "../components/Rian/Project/ProjectAddMember";

/*----------  EXTRA  ----------*/
import "./Rian.css";

@DragDropContext(HTML5Backend)
@connect(mapState)
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 3
    }
    console.log("app: ", props);
  }

  render() {
    return ( 
      <Router history={history}>
        <div className={`app-3`}>
          <Header />
          <Body />
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
  };
}


function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
  };
}

