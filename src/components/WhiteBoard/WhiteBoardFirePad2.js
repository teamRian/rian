import React from 'react';
import firebase from 'firebase';
import Firepad from 'firepad';
import FirepadUserList from '../../lib/firepad-userlist.js';
import '../../styles/Firepad.css';


var config = {
    apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
    authDomain: "riandev-d7a54.firebaseapp.com",
    databaseURL: "https://riandev-d7a54.firebaseio.com",
    storageBucket: "riandev-d7a54.appspot.com",
    messagingSenderId: "559609159517"	
}


firebase.initializeApp(config);


class WhiteBoardFirePad extends React.Component{

	constructor(props) {

		super(props);
		
    this.allUsers = {};
    this.takenLines = [];
    this.projectId = 1;
    this.userId = Math.floor(Math.random() * 10).toString();

    //this.firepadRef = firebase.database().ref('chan/whiteboard/'+projectId);
    this.firepadRef = firebase.database().ref('chan/whiteboard/test/'+this.projectId);
    this.codeMirror = {}
    this.firepad = {}
    this.firepadUserList = {}
    
  }

	componentDidMount() {
    
    let wbfp = this;

    wbfp.codeMirror = CodeMirror(document.getElementById('firepad'), { 
      lineWrapping: true
    });
    
    wbfp.firepad = Firepad.fromCodeMirror(wbfp.firepadRef, wbfp.codeMirror, {
                     userId: wbfp.userId,
                     richTextShortcuts: true,
                     richTextToolbar: true,
                     defaultText: 'Hello, World!'
                   });
    
    wbfp.firepadUserList = FirepadUserList.fromDiv(wbfp.firepadRef.child('users'), document.getElementById('userlist'), wbfp.userId);
    

    // default line setting
    wbfp.firepadRef.child('users').once('value', function(snapshot){
    	
    	var users = snapshot.val();
    			wbfp.allUsers = users;
    	var lines = [];
    	
    	// users의 chid들이 변화할때마다, takenLines를 최신으로 업데이트 해줌
    	for(var key in users){
    		if(key !== wbfp.userId && !!users[key].customCursor){
    			lines.push(users[key].customCursor.line);
    		}
    	}

    	wbfp.takenLines = lines;

    });

    // Initialize contents.
    wbfp.firepad.on('ready', function() {
    	
      if (wbfp.firepad.isHistoryEmpty()) {
        wbfp.firepad.setHtml(
            '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/>\n' +
            '<br/>' +
            '<div style="font-size: 18px">' +
            'Supports:<br/>' +
            '<ul>' +
              '<li>Different ' +
                '<span style="font-family: impact">fonts,</span>' +
                '<span style="font-size: 24px;"> sizes, </span>' +
                '<span style="color: blue">and colors.</span>' +
              '</li>' +
              '<li>' +
                '<b>Bold, </b>' +
                '<i>italic, </i>' +
                '<u>and underline.</u>' +
              '</li>' +
              '<li>Lists' +
                '<ol>' +
                  '<li>One</li>' +
                  '<li>Two</li>' +
                '</ol>' +
              '</li>' +
              '<li>Undo / redo</li>' +
              '<li>Cursor / selection synchronization.</li>' +
              '<li><checkbox></checkbox> It supports customized entities.</li>' +
              '<li>And it\'s all fully collaborative!</li>' +
            '</ul>' +
            '</div>');
      }

        
      // users에 변화가 생기면 감지함
      wbfp.firepadRef.on('child_changed', function(snapshot){
      	
      	var users = snapshot.val();
      			wbfp.allUsers = users;
      	var lines = [];
      	
      	// users의 chid들이 변화할때마다, takenLines를 최신으로 업데이트 해줌
      	for(var key in users){
      		if(key !== wbfp.userId && !!users[key].customCursor){
      			lines.push(users[key].customCursor.line);
      		}
      	}

      	wbfp.takenLines = lines;

      });


      wbfp.firepad.editor_.on('cursorActivity', function(editor){
      	//console.log('getAllMarks ::: ', wbfp.firepad.editor_.doc.getAllMarks())
      	//데이터베이스에 저장된 커서
      	var nowCursor = wbfp.firepad.editor_.doc.getCursor();        		
      	var nowLine = nowCursor.line;       	

      	//line이 이미 있는지 없는지 체크
      	var ableTakeThisLine = wbfp.takenLines.every(function(line){
      		return line !== nowLine;
      	})

      	if(ableTakeThisLine){ // 현재 line을 take할 수 있으면
      		//database에 현재 커서 정보 저장
      		wbfp.firepadRef.child('users').child(wbfp.userId).child('customCursor').set(nowCursor);
      	}else{ // 현재 line을 누가 take하고 있다면
      		
      		// setCursor를 통해서 원래있던 커서 위치로 되돌려보냄!
      		if(!!wbfp.allUsers[wbfp.userId].customCursor){ // customCursor에 대한 정보가 있는경우 해당 원위치로 이동시킴
      			wbfp.firepad.editor_.doc.setCursor({ line : wbfp.allUsers[wbfp.userId].customCursor.line, ch : wbfp.allUsers[wbfp.userId].customCursor.ch });	
      		}else{ // // customCursor에 대한 정보가 없는 경우 맨 마지막줄로 보내고 firebase에 업데이트
      			var willMoveCursor = { line : wbfp.firepad.editor_.doc.lastLine() + 1, ch : 0 };
      			wbfp.firepadRef.child('users').child(wbfp.userId).child('customCursor').set(willMoveCursor);
      			wbfp.firepad.editor_.doc.setCursor(willMoveCursor);
      		}
      		
      	}

      });

    }); // firepad.on('ready') end


		wbfp.firepad.on('synced', function(isSynced) {
			  if(isSynced){}
		});

	}

	componentWillUnmount() {
    		
	}

	render(){
		
		return (
			<div>
				<div id="userlist"></div>
				<div id="firepad"></div>
				
			</div>
		)

	}

}

export default WhiteBoardFirePad;