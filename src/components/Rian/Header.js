import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
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
      <div id="header">
        <div className='headerMenu' id='home'>RIAN</div>
        {Projects.map((project,i)=>{
        	return (
        		<div key={project.projectName} className='headerMenu'>{project.projectName}</div>
        	)
        })}
        <Button id='addButton' onClick={()=>this.clickNewProject()}>+</Button>

      </div>
    )
  }
}

export default Header;