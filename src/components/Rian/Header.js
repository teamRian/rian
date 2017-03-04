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
  	browserHistory.push('/newProject');
  }

  componentDidMount(){
  	this.props.projectGet(this.props.User._id)
  }	

  render() {
    const Projects = this.props.Project.projects;

    return (
      <div id="header">
        <div className='headerMenu' id='home'>RIAN</div>
        {Projects.map((project,i)=>{
        	return (
        		<div key={project.projectName }className='headerMenu'>{project.projectName}</div>
        	)
        })}
        <Button id='addButton' onClick={()=>this.clickNewProject()}>+</Button>

      </div>
    )
  }
}

export default Header;