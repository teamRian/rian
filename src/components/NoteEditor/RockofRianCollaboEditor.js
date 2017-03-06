import React, { Component } from 'react';
import Firepad from 'firepad';
import firebase from 'firebase';
import './css/RockofRianStyle.css';
import './css/firepad.css';
// var headless = new Firepad.Headless('https://<DATABASE_NAME>.firebaseio.com');

// var config = { 
// 			   apiKey: "AIzaSyCr-xd_s4NGQ3z8FWq0VwEG8loZQ9EypkI",
//                authDomain: "samplefirepad.firebaseapp.com",
//                databaseURL: "https://samplefirepad.firebaseio.com",
//                storageBucket: "samplefirepad.appspot.com",
//                messagingSenderId: "842518987644"
//              };
// firebase.initializeApp(config);



class RockofRianEditor extends Component {

	componentWillMount() {
		
	}

	componentDidMount() {

        var firepadRef = firebase.database().ref('testrock/1');
        var codeMirror = CodeMirror(this.refs.firepadContainer, { lineWrapping: 
          true });
      
        var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
          richTextShortcuts: true,
          richTextToolbar: true,
          defaultText: 'Hello, World!'
        });

        firepad.on('ready', function() {
          console.log("firepad ready")
          console.log(firepad.getText())
          firepad.setUserColor("#FF0000")
          if (firepad.isHistoryEmpty()) {
            firepad.setHtml('<span style="font-size: 24px;">Rian에서 당신의 꿈을 기록하세요.</span>');
          }
        });
      

        
	}

	render(){

		return (
			<div ref='firepadContainer' id='firepad-container'>
			</div>
		)

	}

}

export default RockofRianEditor




