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

function getExampleRef() {

  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
      ref = ref.child(hash);
  } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
  }
    return ref;

}



class RockofRianEditor extends Component {

	componentWillMount() {
		
	}

	componentDidMount() {

		   var config = {
                apiKey: "AIzaSyCr-xd_s4NGQ3z8FWq0VwEG8loZQ9EypkI",
                authDomain: "samplefirepad.firebaseapp.com",
                databaseURL: "https://samplefirepad.firebaseio.com",
                storageBucket: "samplefirepad.appspot.com",
                messagingSenderId: "842518987644"
              };
              firebase.initializeApp(config);

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
           


            function getExampleRef() {

              var ref = firebase.database().ref();
              var hash = window.location.hash.replace(/#/g, '');
              if (hash) {
               ref = ref.child(hash);
              } else {
               ref = ref.push(); // generate unique location.
               window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
              }
              if (typeof console !== 'undefined') {
                console.log('Firebase data: ', ref.toString());
              }
              return ref;
            }
		
	}

	render(){

		return (
			<div ref='firepadContainer' id='firepad-container'>
			</div>
		)

	}

}

export default RockofRianEditor



 // <!doctype html>
 //    <html>
 //      <head>
 //        <meta charset="utf-8" />
 //        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
 //        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
 //        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
 //        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
 //        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        
 //        <script src="https://www.gstatic.com/firebasejs/3.6.10/firebase.js"></script>
 //        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js"></script>
 //        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.css"/>
        
 //        <link rel="stylesheet" href="https://cdn.firebase.com/libs/firepad/1.4.0/firepad.css" />
 //        <script src="https://cdn.firebase.com/libs/firepad/1.4.0/firepad.min.js"></script>

 //        <style>
 //           html { height: 100%; }
 //           body { margin: 0; height: 100%; position: relative; }
            
 //           #firepad-container {
 //             width: 100%;
 //             height: 100%;
 //           }
 //        </style>

 //      </head>
 //      <body>
 //        <div id="firepad-container"></div>
 //        <div id="root"></div>
 //        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/manifest.js'] : '/manifest.js'}'></script>
 //        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
 //        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
 //        <script>
          
 //              var config = {
 //                apiKey: "AIzaSyCr-xd_s4NGQ3z8FWq0VwEG8loZQ9EypkI",
 //                authDomain: "samplefirepad.firebaseapp.com",
 //                databaseURL: "https://samplefirepad.firebaseio.com",
 //                storageBucket: "samplefirepad.appspot.com",
 //                messagingSenderId: "842518987644"
 //              };
 //              firebase.initializeApp(config);

 //              var firepadRef = firebase.database().ref();
            
 //              var codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: 
 //                true });
            
 //              var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
 //                richTextShortcuts: true,
 //                richTextToolbar: true,
 //                defaultText: 'Hello, World!'
 //              });


 //              firepad.on('ready', function() {
 //                console.log("firepad ready")
 //                if (firepad.isHistoryEmpty()) {
 //                  firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.');
 //                }
 //              });
           


 //            function getExampleRef() {

 //              var ref = firebase.database().ref();
 //              var hash = window.location.hash.replace(/#/g, '');
 //              if (hash) {
 //               ref = ref.child(hash);
 //              } else {
 //               ref = ref.push(); // generate unique location.
 //               window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
 //              }
 //              if (typeof console !== 'undefined') {
 //                console.log('Firebase data: ', ref.toString());
 //              }
 //              return ref;
 //            }
 //        </script>                
 //      </body>
 //    </html>
 //  `

