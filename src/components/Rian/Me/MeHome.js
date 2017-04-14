import React, { Component } from "react";
import EmailVerify from "./EmailVerify";
import "../../../styles/Home.css";

export default class MeHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Home">
        {!this.props.User.email_verified &&
          <EmailVerify
            userRegisterEmail={this.props.userRegisterEmail}
            User={this.props.User}
          />}
      </div>
    );
  }
}
