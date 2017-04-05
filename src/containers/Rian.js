import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Import Actions
import { changeMode } from '../actions/ModeActions';
import { userCheckAuth, userSignUp, userLogIn, userLogOut } from '../actions/UserActions';
import { projectGet, projectPost } from '../actions/ProjectActions';

// Import Component
import Header from '../components/Rian/Header';
import { MeNavigation, ProjectNavigation } from '../components/Rian/Navigation.js'
import CalendarComponent from './Calendar/Calendar.js';
import CalendarSubComponent from './Calendar/CalendarSub.js';
import NoteEditor from './NoteEditor/NoteEditorContainer';
import NotetimelineContainer from './NoteTimeline/NotetimelineContainer';
import WhiteBoardComponent from './WhiteBoard/WhiteBoardContainer.js';
import FirebaseChatContainer from './FirebaseChat/FirebaseChatContainer.js';
import firebase from 'firebase';
import firebaseConfig from '../../config/firebaseConfig';
import LogIn from '../components/Rian/LogIn';
import '../styles/Rian.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class RianApp extends Component {

	constructor(props){
		super(props);
		this.props.userCheckAuth();
		this.state = {   
			showChat: false    
		}    
		this.clickShowChat = this.clickShowChat.bind(this)   
	}   

  componentWillReceiveProps(nextProps) {
    /*----------  파이어베이스 시작하기, 로그인했을때만!  ----------*/
    if(this.props.User._id !== nextProps.User._id && nextProps.User._id){
      firebase.initializeApp(firebaseConfig);
    }
  }	 
	clickShowChat(){  
		this.setState((prevState, props)=>(
			{
				showChat: !prevState.showChat    
			}
		))
	}

	render() {
		if(this.props.User._id === null && this.props.User.loading === false){
			return (
				<LogIn
					userSignUp={(form)=>this.props.userSignUp.bind(this)(form)}
					userLogIn={(form)=>this.props.userLogIn.bind(this)(form)}
				/>
			)
		}
		if(this.props.User.loading){
			return <div>Loading...</div>
		}
		const ShowMe = this.state.showChat ? { visibility: 'visible' } : { visibility: 'hidden' };

		return (
			<Router>

				<div className="App">
					<Header 
						User={this.props.User}
						Project={this.props.Project}
						projectGet={(userId)=>this.props.projectGet.bind(this)(userId)}
						changeMode={this.props.changeMode}
					/>
					<div className="MainWrapper">
						<div className="Navigation">
							<Route path="/projectPage" component={ProNav} />
							<Route path="/me" component={MeNav} />
							<Route path="/me/calendar" component={CalendarSub} />

						</div>
						<div className="MainContent">
							<Route path="/projectPage" component={ProjectWrapper} />
							<Route path="/" component={PersonalWrapper} />
						</div>
					</div>

				</div>

			</Router>
		)
	}

}

							// <div className="classShowChat" style={ShowMe}>		
							// 	<FirebaseChatContainer UserId={this.props.User._id} />		
							// </div>
const MeNav = () => {	
	return <MeNavigation />
}

const ProNav = () => {	
	return <ProjectNavigation />
}

const PersonalWrapper = () => {
	return	<div className="MainContent">
						<Route path="/me/calendar" component={Calendar} />
						<Route path="/me/editor" component={Note} />
				  </div>
}
const ProjectWrapper = () => {
	return 	<div className="MainContent">
							<Route path="/projectPage/whiteBoard" component={WhiteBoard} />
					</div>
}

const WhiteBoard = () => {
	return <WhiteBoardComponent />
}
const Calendar = (match) => {
	console.log(match, "CALENDAR MATCH");
	return <CalendarComponent />
}
const CalendarSub = () => {
	return <CalendarSubComponent />
}
const Note = (match) =>{
	return <NoteEditor />
}

function mapState(state) {
	return {
		Mode: state.Mode,
		User: state.User,
		Project: state.Project
	};
}

function mapDispatch(dispatch) {
	return {
		changeMode: (mode) => {
			dispatch(changeMode(mode))
		},
		userCheckAuth: ()=> {
			dispatch(userCheckAuth())
		},
		userSignUp: (form)=> {
			dispatch(userSignUp(form))
		},
		userLogIn: (form)=>{
			dispatch(userLogIn(form))
		},
		userLogOut: ()=>{
			dispatch(userLogOut())
		},
		projectGet: (userId)=>{
			dispatch(projectGet(userId))
		}
	};
}

RianApp = DragDropContext(HTML5Backend)(RianApp)
export default connect(mapState, mapDispatch)(RianApp);




