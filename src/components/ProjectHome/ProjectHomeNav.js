import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProjectHomeNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { member, _id } = this.props.Project;
    return (
      <div className="ProjectHomeNav">
        {member.map( (user,i) => {
          return (
            <div className="profileCard" key={i}>
              <div key="name">{user.name}</div>
              <div key="email">{user.email}</div>
            </div>
          );
        })}
        <Link className="addMember" to={`/project/${_id}/add_member`} key="button">
          Add Member
        </Link>
      </div>
    );
  }
}