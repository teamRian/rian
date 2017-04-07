import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import moment from 'moment';

import '../../styles/Header.css';

class Header extends React.Component {

  constructor(props){
  	super(props);
  	// projectGet(this.props.User._id);
  }
  clickNewProject(){
    //onClick 이벤트로 뉴프로젝트 컴포넌트를 쏴줌
  	browserHistory.push('/newProject');
  }
  clickProject(projectID){
    // browserHistory.push('/project');
    const projectAction = {
      isProject: true,
      currentProject: projectID
    }
    this.props.changeMode(projectAction);
  }
  clickHome(){
    const projectAction = {
      isProject: false,
      currentProject: null
    }
    this.props.changeMode(projectAction);
  }
  componentDidMount(){
    // 헤더가 마운트 될때 프로젝트를 가져온다
  	this.props.projectGet(this.props.User._id)
  }	

  // componentWillReceiveProps(nextProps){
  // 	if(this.props.Project.projects.length !== nextProps.Project.projects.length){
  // 		this.props.projectGet(this.props.User._id);
  // 	}
  // }

  render() {
    const Projects = this.props.Project.projects;

    return (
      <div className="Header">
        <NavLink to="/me" className='headerMenu' id='home'>RIAN</NavLink>
        {Projects.map((project,i)=>{
        	return (
        		<NavLink to="/projectPage" key={project.projectName} className='headerMenu'></NavLink>
        	)
        })}
        <NavLink id='addButton' to="/newProject">+</NavLink>
      </div>
    )
  }
}

export default Header;