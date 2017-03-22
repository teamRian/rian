import React, { Component } from 'react';
import SignUpModal from './SignUpModal';
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import firebase from 'firebase';

export default class LogIn extends Component {
  constructor(props){
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.username.value.length === 0) {
      alert("아이디를 입력하세요")
    } else {
      this.props.userLogIn({username:this.username.value})
    }
  }

  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleSubmit(e)
    }
  }

  /*----------  FIREBASE AUTH CANT RECEIVE ADDITIONAL SCOPE (EMAIL, ID) = USELESS  ----------*/
  
  // handleFacebookLogin(e){

  //   var config = {
  //     apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
  //     authDomain: "riandev-d7a54.firebaseapp.com",
  //     databaseURL: "https://riandev-d7a54.firebaseio.com",
  //     storageBucket: "riandev-d7a54.appspot.com",
  //     messagingSenderId: "559609159517" 
  //   }

  //   firebase.initializeApp(config);
  //   e.preventDefault();
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   provider.addScope('email');
  //   firebase.auth().signInWithPopup(provider).then(function(result) {
  //     console.log(result);
  //   }).catch(function(error) {
  //     console.log(error);
  //   });
  // }


  render() {
    return (
      <div id="logIn">
        <div>
            <FormControl 
              autoFocus
              componentClass="input" 
              placeholder="아이디" 
              onKeyPress={(e)=>this.handleKeyPress(e)}
              inputRef={ref => {this.username = ref}} />
        </div>
            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e)}>로그인</Button>
            <a href="/auth/facebook" className="btn btn-primary">Facebook</a>
            <SignUpModal
              userSignUp={(form)=>this.props.userSignUp(form)}
              userLogIn={(form)=>this.props.userLogIn(form)}
            />
      </div>
    );
  }
}
