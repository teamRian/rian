import React, { Component, PropTypes } from "react";
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
  userRegisterEmail
} from "../actions/UserActions";
import {
  projectPost,
  projectDetach,
  projectLinkMakeOrExtend
} from "../actions/ProjectActions";
import {
  projectEpicRequestData,
  projectEpicCancleData,
  projectEpicRequestLink
} from "../epics/ProjectEpic";
/*============================
=            RIAN            =
============================*/
import Header from "../components/Rian/Header";
import FirebaseChatContainer from "./FirebaseChat/FirebaseChatContainer.js";

/*----------  ME NAVIGATION  ----------*/
import MeNavigation from "../components/Rian/Me/MeNavigation.js";
import MeNavHome from "../components/Rian/Me/MeNavHome.js";
import CalendarSubComponent from "./Calendar/CalendarSub.js";
import NotetimelineContainer from "./NoteTimeline/NotetimelineContainer";

/*----------  PROJECT NAVIGATION  ----------*/
import ProjectNavigation from "../components/Rian/Project/ProjectNavigation.js";
import ProjectNavHome from "../components/Rian/Project/ProjectNavHome";
import ProjectNavNote from "../components/Rian/Project/ProjectNavNote";
import ProjectNavFile from "../components/Rian/Project/ProjectNavFile";

/*----------  ME MAIN  ----------*/
import MeHome from "../components/Rian/Me/MeHome";
import CalendarComponent from "./Calendar/Calendar.js";
import NoteEditor from "./NoteEditor/NoteEditorContainer";

/*----------  PROJECT MAIN  ----------*/
import WhiteBoardComponent from "./WhiteBoard/WhiteBoardContainer.js";
import NewProject from "../components/Rian/Project/NewProject";
import ProjectAddMember from "../components/Rian/Project/ProjectAddMember";

/*----------  EXTRA  ----------*/
import "../styles/Rian.css";


class RianApp extends Component {
  constructor(props) {
    super(props);
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
    const { User, Project, projectGet, userSignUp, userLogIn } = this.props;
    return (
      <Router history={history}>
        <Route
          path="/:type?/:subpage?"
          render={props => (
            <div className="App">
              <Header
                User={User}
                Project={Project}
                projectDetach={this.props.projectDetach}
                projectEpicRequestData={this.props.projectEpicRequestData}
                projectEpicCancleData={this.props.projectEpicCancleData}
              />
              {User._id === null || User.loading === "AUTH"
                ? <div className="loaderWrapper">
                    <div className="loader">Loading...</div>
                  </div>
                : <div className="MainWrapper">
                    <div className="Navigation">
                      <Switch>
                        <Route
                          exact
                          path="/me"
                          render={props => <MeNavHome />}
                        />
                        <Route
                          exact
                          path="/me/calendar"
                          render={props => <CalendarSubComponent />}
                        />
                        <Route
                          exact
                          path="/me/note"
                          render={props => <NotetimelineContainer />}
                        />
                        <Route
                          exact
                          path="/project/:projectId"
                          render={props => (
                            <ProjectNavHome User={User} Project={Project} />
                          )}
                        />
                        <Route
                          exact
                          path="/project/:projectId/note"
                          render={props => <ProjectNavNote />}
                        />
                        <Route
                          exact
                          path="/project/:projectId/file"
                          render={props => <ProjectNavFile />}
                        />
                      </Switch>
                    </div>
                    <div className="MainContent">
                      <Switch>
                        <Route
                          exact
                          path="/me"
                          render={props => (
                            <MeHome
                              User={User}
                              userRegisterEmail={this.props.userRegisterEmail}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/me/calendar"
                          render={props => <CalendarComponent />}
                        />
                        <Route
                          exact
                          path="/me/note"
                          render={props => <NoteEditor />}
                        />
                        <Route
                          exact
                          path="/me/new_project"
                          render={props => <NewProject />}
                        />
                        <Route
                          exact
                          path="/project/:projectId"
                          render={props => <div> Project Home </div>}
                        />
                        <Route
                          exact
                          path="/project/:projectId/whiteboard"
                          render={props => <WhiteBoardComponent />}
                        />
                        <Route
                          exact
                          path="/project/:projectId/file"
                          render={props => <div> Project File </div>}
                        />
                        <Route
                          exact
                          path="/project/:projectId/add_member"
                          render={props => (
                            <ProjectAddMember 
                              User={User} 
                              Project={Project}
                              projectEpicRequestLink={this.props.projectEpicRequestLink}
                            />
                          )}
                        />
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
    },
    projectDetach: () => {
      dispatch(projectDetach());
    },
    userRegisterEmail: user => {
      dispatch(userRegisterEmail(user));
    },
    linkMakeOrExtend: link => {
      dispatch(linkMakeOrExtend(link));
    },
    projectEpicRequestData: _id => {
      dispatch(projectEpicRequestData(_id));
    },
    projectEpicCancleData: () => {
      dispatch(projectEpicCancleData());
    },
    projectEpicRequestLink: (link, _id, creator) => {
      dispatch(projectEpicRequestLink(link, _id, creator));
    }
  };
}

RianApp = DragDropContext(HTML5Backend)(RianApp);

export default connect(mapState, mapDispatch)(RianApp);
