import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();
// Import Actions
import { changeMode } from "../actions/ModeActions";
import {
  userCheckAuth,
  userSignUp,
  userLogIn,
  userLogOut
} from "../actions/UserActions";
import { projectGet, projectPost } from "../actions/ProjectActions";

// Import Component
import Header from "../components/Rian/Header";
import {
  MeNavigation,
  ProjectNavigation
} from "../components/Rian/Navigation.js";
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
      changeMode,
      userSignUp,
      userLogIn
    } = this.props;
    return (
      <Router history={history}>
        <Route
          path="/:type?/:subpage?"
          render={({ match }) => (
            <div className="App">
              <Header User={User} />
              {User._id === null || User.loading === true
                ? <div className="loaderWrapper">
                    <div className="loader">Loading...</div>
                  </div>
                : <div className="MainWrapper">
                    <div className="Navigation">
                      <Switch>
                        <Route path="/projectPage" component={ProNav} />
                        <Route path="/me" component={MeNav} />
                      </Switch>
                      <Route path="/me/calendar" component={CalendarSub} />
                      <Route path="/me/editor" component={NoteSub} />
                    </div>
                    <div className="MainContent">
                      <Switch>
                        <Route path="/projectPage" component={ProjectWrapper} />
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

const MeNav = () => {
  return <MeNavigation />;
};

const ProNav = () => {
  return <ProjectNavigation />;
};

const PersonalWrapper = () => {
  return (
    <div className="MainContent">
      <Route exact path="/me" component={MeHome} />
      <Route path="/me/calendar" component={Calendar} />
      <Route path="/me/editor" component={Note} />
      <Route path="/me/newProject" component={NewPro} />
    </div>
  );
};
const ProjectWrapper = () => {
  return (
    <div className="MainContent">
      <Route exact path="/projectPage" component={ProHome} />
      <Route path="/pπrojectPage/whiteBoard" component={WhiteBoard} />
    </div>
  );
};

const WhiteBoard = () => {
  return <WhiteBoardComponent />;
};
const Calendar = match => {
  return <CalendarComponent />;
};
const CalendarSub = () => {
  return <CalendarSubComponent />;
};
const Note = match => {
  return <NoteEditor />;
};
const NoteSub = () => {
  return <NotetimelineContainer />;
};
const MeHome = () => {
  return <div> WELCOME </div>;
};
const ProHome = () => {
  return <div> WELCOME </div>;
};
const NewPro = () => {
  return <NewProject />;
};
function mapState(state) {
  return {
    Mode: state.Mode,
    User: state.User,
    Project: state.Project
  };
}

function mapDispatch(dispatch) {
  return {
    changeMode: mode => {
      dispatch(changeMode(mode));
    },
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
    projectGet: userId => {
      dispatch(projectGet(userId));
    }
  };
}

RianApp = DragDropContext(HTML5Backend)(RianApp);

export default connect(mapState, mapDispatch)(RianApp);
