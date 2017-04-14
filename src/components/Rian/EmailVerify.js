import React, { Component } from "react";
import axios from 'axios';

class EmailVerify extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.refs.email.value, " SUBMIT EMAIL");
    // 이메일 검증 Observable로 SendEmail 시 비활성화 필요 없음
    axios.post('/api/user/registerEmail', { email: this.refs.email.value, _id:this.props.User._id} )
      .then(res=>{
        // Status 200 = 이메일이 사용중이 아닙니다 유저가 들어옵니다 
        // Status 204 = 이메일이 사용중 입니다 이메일이 들어옵니다
        console.log(res);
        console.log(typeof res.status);

        if(res.status === 204){
          alert(`Email:${res.data}는 사용중 입니다`);
        } else if ( res.status === 200){
          this.props.userRegisterEmail(res.data);
        }
      })
      .catch(err=>{
        throw err;
      });
  }

  render() {
    return (
      <div className="EmailVerify">
        <div className="EmailVerifyContent">
          <form onSubmit={e => this.handleSubmit.bind(this)(e)}>
            <input
              ref="email"
              type="email"
              autoComplete="on"
              autoFocus
              required
              className="EmailVerifyInput"
              placeholder="Write us your email"
            />
            <input type="submit" value="Send Email" />
            <input type="submit" value="Skip" />
          </form>
        </div>
      </div>
    );
  }
}

export default EmailVerify;
