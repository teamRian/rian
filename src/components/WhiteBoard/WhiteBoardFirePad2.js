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
		
    // this.otherUsers = {};
    this.takenLines = {};
    this.projectId = 1;
    this.userId = this.props.user.username;

    //this.firepadRef = firebase.database().ref('chan/whiteboard/'+projectId);
    this.firepadRef = firebase.database().ref('chan/whiteboard/test/local/'+this.projectId);
    this.codeMirror = {}
    this.firepad = {}
    this.firepadUserList = {}
    
  }

	componentDidMount() {
    
    let wbfp = this;

    wbfp.codeMirror = CodeMirror(document.getElementById('firepad'), { 
      gutters: ["codemirror-username"],
      lineWrapping: true,
      lineNumbers: true,
    });
    
    wbfp.firepad = Firepad.fromCodeMirror(wbfp.firepadRef, wbfp.codeMirror, {
                     userId: wbfp.userId,
                     richTextShortcuts: true,
                     //richTextToolbar: true,
                     //defaultText: 'Hello, World!'
                   });
    
    wbfp.firepadUserList = FirepadUserList.fromDiv(wbfp.firepadRef.child('users'), document.getElementById('userlist'), wbfp.userId, wbfp.userId);

    // 한번만 초기에 실행해서 initial값 셋팅
    wbfp.firepadRef.child('users').once('value', function(snapshot){      
      
      var users = snapshot.val();

      for(var key in users){
        wbfp.takenLines[key] = users[key].customCursor || { line : undefined, ch : undefined };
      }
      
    });

    // whiteboard 사용하던 user가 나가면 takenLine도 지워줌 
    wbfp.firepadRef.child('users').on('child_removed', function(snapshot){
      
      var user = snapshot.val();
      delete wbfp.takenLines[user.name];
      
    });


    
    // Initialize contents.
    wbfp.firepad.on('ready', function() {
    	

      // users에 변화가 생기면 감지함
      wbfp.firepadRef.child('users').on('child_changed', function(snapshot){
      	
      	var user = snapshot.val();
        
        //customCursor가 있으면 takenLines에 추가해줌
        if(!!user.customCursor){
          wbfp.takenLines[user.name] = user.customCursor;
        }
      	
      });

      wbfp.codeMirror.on('mousedown', function(cm, e){

        console.log('mousedown clicked ::: ', cm, e);
      })

      wbfp.firepad.editor_.on('cursorActivity', function(editor){

        console.log('wbfp.takenLines ::: ', wbfp.takenLines);
        var nowCursor = wbfp.firepad.editor_.doc.getCursor();
        var ableSelect = true;
        
        //takenLines을 체크함
        for(var key in wbfp.takenLines){

          // 내가 지금 클릭한 라인이 이미 선택되어있는 경우
          if(key !== wbfp.userId && wbfp.takenLines[key].line === nowCursor.line){ 
            var originCursor = { line : wbfp.takenLines[wbfp.userId].line , ch : wbfp.takenLines[wbfp.userId].ch };
            if(!!originCursor.line){ //원래 선택해둔 라인이 있으면 그 곳으로 보내주고
              wbfp.firepad.editor_.doc.setCursor(originCursor); 
            }else{ // 원래 선택해둔 라인이 없으면 그 아래 라인으로 보내줌
              var nextLine = { line : nowCursor.line+1, ch: 0 }
              wbfp.firepad.editor_.doc.setCursor(nextLine);
              wbfp.firepadRef.child('users').child(wbfp.userId).child('customCursor').set(nextLine);
            }
            console.log('someone took this line')
            ableSelect = false;
          }
        }

        if(ableSelect){ // 내가 지금 클릭한 라인이 선택되지 않은 경우에만 선택할 수 있도록 설정
          console.log('cursor changed')
          wbfp.firepadRef.child('users').child(wbfp.userId).child('customCursor').set(nowCursor);
        }

      });

    }); // firepad.on('ready') end


		wbfp.firepad.on('synced', function(isSynced) {
			  if(isSynced){}
		});

	}

	componentWillUnmount() {

    //해당 유저에 대한 firebase정보를 모두 삭제함
    this.firepadRef.child('users').child(this.userId).remove();
    console.log('componenetWillUnmout fired');
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