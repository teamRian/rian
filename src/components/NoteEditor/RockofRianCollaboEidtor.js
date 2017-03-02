import React, { Component } from 'react';
import Firepad from 'firepad'
import firebase from 'firebase'
// var headless = new Firepad.Headless('https://<DATABASE_NAME>.firebaseio.com');

var config = { 
			   apiKey: "AIzaSyCr-xd_s4NGQ3z8FWq0VwEG8loZQ9EypkI",
               authDomain: "samplefirepad.firebaseapp.com",
               databaseURL: "https://samplefirepad.firebaseio.com",
               storageBucket: "samplefirepad.appspot.com",
               messagingSenderId: "842518987644"
             };
firebase.initializeApp(config);



class RockofRianEditor extends Component {

	componentWillMount() {
		
	}

	componentDidMount() {

		  

              var firepadRef = firebase.database().ref();
            
              var codeMirror = CodeMirror(this.refs.firepadContainer, { lineWrapping: 
                true });
            
              var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
                richTextShortcuts: true,
                richTextToolbar: true,
                defaultText: 'Hello, World!'
              });


              firepad.on('ready', function() {
                console.log("firepad ready")
                if (firepad.isHistoryEmpty()) {
                  firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.');
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




