import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();
// Import Actions
import {
  userCheckAuth,
  userSignUp,
  userLogIn,
  userLogOut
} from "../actions/UserActions";
import { projectGet, projectPost } from "../actions/ProjectActions";

// Import Component
import Header from "../components/Rian/Header";
import MeNavigation from "../components/Rian/MeNavigation.js";
import ProjectNavigation from "../components/Rian/ProjectNavigation.js"
import CalendarComponent from "./Calendar/Calendar.js";
import CalendarSubComponent from "./Calendar/CalendarSub.js";
import NoteEditor from "./NoteEditor/NoteEditorContainer";
import NotetimelineContainer from "./NoteTimeline/NotetimelineContainer";
import WhiteBoardComponent from "./WhiteBoard/WhiteBoardContainer.js";
import FirebaseChatContainer from "./FirebaseChat/FirebaseChatContainer.js";
import firebase from "firebase";
import firebaseConfig from "../../config/firebaseConfig";
import LogIn from "../components/Rian/LogIn";
import NewProject from "../components/Rian/NewProject";
import "../styles/Rian.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

class RianApp extends Component {
  constructor(props) {
    super(props);
    console.log(props, "RIAN APP PROPS");
    this.props.userCheckAuth();
    this.state = {
      showChat: false
    };
    this.clickShowChat = this.clickShowChat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /*----------  파이어베이스 시작하기, 로그인했을때만!  ----------*/
    if (this.props.User._id !== nextProps.User._id && nextProps.User._id) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  clickShowChat() {
    this.setState((prevState, props) => ({
      showChat: !prevState.showChat
    }));
  }

  render() {
    const {
      User,
      Project,
      projectGet,
      userSignUp,
      userLogIn
    } = this.props;
    return (
      <Router history={history}>
        <Route
          path="/:type?/:subpage?"
          render={(props) => (
            <div className="App">
              <Header User={User} />
              {User._id === null || User.loading === true
                ? <div className="loaderWrapper">
                    <div className="loader">Loading...</div>
                  </div>
                : <div className="MainWrapper">
                    <div className="Navigation">
                      <Switch>
                        <Route path="/project/:projectId" render={ props =>(
                            <ProjectNavigation {...props} />
                        )} />
                        <Route path="/me" render={ props =>(
                            <MeNavigation {...props} />
                        )} />
                      </Switch>
                      <Switch>
                        <Route path="/me/calendar" render={ props=>(
                          <CalendarSubComponent />
                        )} />
                        <Route path="/me/note" render={ props=>(
                          <NotetimelineContainer />
                        )} />
                      </Switch>
                    </div>
                    <div className="MainContent">
                      <Switch>
                        <Route exact path="/me" render={ props=>(
                          <div> WELCOME </div>
                        )} />
                        <Route exact path="/me/calendar" render={ props=>(
                          <CalendarComponent />
                        )} />
                        <Route exact path="/me/note" render={ props=>(
                          <NoteEditor />
                        )} />
                        <Route exact path="/me/new_project" render={ props=>(
                          <NewProject />
                        )} />
                        <Route exact path="/project/:projectId" render={ props=>(
                          <div> Project Home </div>
                        )} />
                        <Route exact path="/project/:projectId/whiteboard" render={ props=>(
                          <WhiteBoardComponent />
                        )} />
                        <Route exact path="/project/:projectId/file" render={ props=>(
                          <div> Project File </div>
                        )} />
                        <Route path="/" component={PersonalWrapper} />
                      </Switch>
                    </div>
                  </div>}
            </div>
          )}
        />
      </Router>
    );
  }
}

const PersonalWrapper = () => {
  return (
    <div className="MainContent">
      <Route exact path="/me" component={MeHome} />
      <Route path="/me/calendar" component={Calendar} />
      <Route path="/me/note" component={Note} />
      <Route path="/me/new_project" component={NewPro} />
    </div>
  );
};

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project
  };
}

function mapDispatch(dispatch) {
  return {
    userCheckAuth: () => {
      dispatch(userCheckAuth());
    },
    userSignUp: form => {
      dispatch(userSignUp(form));
    },
    userLogIn: form => {
      dispatch(userLogIn(form));
    },
    userLogOut: () => {
      dispatch(userLogOut());
    },
    projectGet: projectId => {
      dispatch(projectGet(projectId));
    }
  };
}

RianApp = DragDropContext(HTML5Backend)(RianApp);

export default connect(mapState, mapDispatch)(RianApp);
