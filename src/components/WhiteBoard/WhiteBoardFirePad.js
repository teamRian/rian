import React from 'react';
import firebase from 'firebase';
import Firepad from 'firepad';
import '../../styles/Firepad.css';
import FirepadUserList from '../../lib/firepad-userlist.js';

// var config = {
//     apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
//     authDomain: "riandev-d7a54.firebaseapp.com",
//     databaseURL: "https://riandev-d7a54.firebaseio.com",
//     storageBucket: "riandev-d7a54.appspot.com",
//     messagingSenderId: "559609159517"	
// }


// firebase.initializeApp(config);


class WhiteBoardFirePad extends React.Component{

	constructor(props) {
		super(props);
		
	}

	componentDidMount() {

			// 선택되어있는 line들
			var allUsers = {};
			var takenLines = [];
			var prevCursor = {};
			var projectId = 1;
			// Get Firebase Database reference.
			// firebase.database().ref() => 이렇게 생성할 경우 default root ( / )에 생성된다.

      var firepadRef = firebase.database().ref('chan/whiteboard/'+projectId);

			// Create CodeMirror (with lineWrapping on).
			var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

			// Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
			var userId = Math.floor(Math.random() * 10).toString();

			// Create Firepad (with rich text toolbar and shortcuts enabled).
			var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
				userId: userId,
			  richTextShortcuts: true,
			  richTextToolbar: true,
			  defaultText: 'Hello, World!'
			});
			

      // Create FirepadUserList (with our desired userId).
      var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'), document.getElementById('userlist'), userId);			
      
      // Initialize contents.
      firepad.on('ready', function() {
      	//firepad 준비되면 처음 커서는 맨 마지막 줄에 셋팅해주기!
      	firepad.editor_.doc.setCursor( { line : 14 , ch : 0 } );
        if (firepad.isHistoryEmpty()) {
          firepad.setHtml(
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
        firepadRef.on('child_changed', function(snapshot){
        	
        	var users = snapshot.val();
        			allUsers = users;
        	var lines = [];
        	
        	// users의 chid들이 변화할때마다, takenLines를 최신으로 업데이트 해줌
        	for(var key in users){
        		if(key !== userId && !!users[key].customCursor){
        			lines.push(users[key].customCursor.line);
        		}
        	}

        	takenLines = lines;

        });



        firepad.editor_.on('cursorActivity', function(editor){
        	
        	//데이터베이스에 저장된 커서
        	var nowCursor = firepad.editor_.doc.getCursor();        		
        	var nowLine = nowCursor.line;       	

        	//line이 이미 있는지 없는지 체크
        	var ableTakeThisLine = takenLines.every(function(line){
        		return line !== nowLine;
        	})

        	if(ableTakeThisLine){ // 현재 line을 take할 수 있으면
        		//database에 현재 커서 정보 저장
        		firepadRef.child('users').child(userId).child('customCursor').set(nowCursor);	
        	}else{ // 현재 line을 누가 take하고 있다면
        		
        		// setCursor를 통해서 원래있던 커서 위치로 되돌려보냄!
        		firepad.editor_.doc.setCursor({ line : allUsers[userId].customCursor.line, ch : allUsers[userId].customCursor.ch });
        	}
        	



        	// console.log(editor);
        	// console.log(firepad);


        	// firebase.database().ref('/users/'+userId).once('value').then(function(snapshot){
        	// 	var val = snapshot.val()
        	// 	console.log('snapshot val ::: ', val);
        	// });

        	// console.log('userlist ::: ', firepadRef.child('users'));
        	// console.log('firepadUserList ::: ', firepadUserList);

        	// firepadRef.child('users').child(userId).once('value').then(function(snapshot){
        	// 	var userObj = snapshot.val();
        	// 	console.log('userObj ::: ', userObj);
        	// 	console.log('cursor ::: ', userObj.cursor);
        	// })

        });

        firepad.editor_.on('beforeChange', function(editor, changeObj){
        	//이때 확인해서 누군가 차지하고 있으면 튕겨냄

      //   	debugger;
			  	// firepadRef.child('users').child(userId).child('cursor').set(1);
			  	// debugger;
        });

      });


			firepad.on('synced', function(isSynced) {
			  // isSynced will be false immediately after the user edits the pad,
			  // and true when their edit has been saved to Firebase.



			  if(isSynced){
			  	//내가 뭔가 작업하려는 커서가 stor에 저장되어있는 커서와 line이 같으면 

			  	//다른 사람이 사용중이라는 팝업을 띄워주고

			  	//다시 원래 커서가 있던 자리로로 셋팅!
			  	//firepad.editor_.doc.setCursor({line:0, ch:5});

			  	//console.log(firepad.editor_.doc.getCursor());
			  		
			  	//{ line: 0부터 시작(줄) , ch: 1부터 시작(칸) } 
				

			  }
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