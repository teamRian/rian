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


      //
      wbfp.codeMirror.on('blur', function(cm, e){
        console.log('blur fired ', cm, e);
      })

      wbfp.codeMirror.on('mousedown', function(cm, e){
        //1. codemirror line 추출하기
        var clickedLine = cm.lineAtHeight( e.y );
        //2. 현재 takenLines에 해당 라인이 존재하는지 확인하기
        for( var key in wbfp.takenLines){
          if(key !== wbfp.userId && wbfp.takenLines[key].line === clickedLine){ 
            //존재하면 다른라인으로 옮기기
            e.preventDefault();
          }
        }

      });

      wbfp.codeMirror.on('keyHandled', function(cm, name, e){

        console.log('keyHandled', cm, name, e);
        console.log(cm.getCursor().line);
        
        var nowLine = cm.getCursor().line;

        //Left, Right, Up, Down
        if(name === "Left"){
          console.log('Left')
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 위 라인으로 커서 옮기기
              cm.execCommand('goLineUp');
            }
          }
        }else if(name === "Right"){
          console.log('Right')
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 아래 라인으로 커서 옮기기
              cm.execCommand('goLineDown');
            }
          }
        }else if(name === "Up"){
          console.log('Up')
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 위 라인으로 커서 옮기기
              cm.execCommand('goLineUp');
            }
          }          
        }else if(name === "Down"){
          console.log('Down')
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 아래 라인으로 커서 옮기기
              cm.execCommand('goLineDown');
            }
          }
        }
        //Cmd + Left, Right, Up, Down
        else if(name === "Cmd-Left"){
          console.log('Cmd-Left')
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 위 라인으로 커서 옮기기
              cm.execCommand('goLineUp');
            }
          }          
        }else if(name === "Cmd-Right"){
          console.log('Cmd-Right');
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 아래 라인으로 커서 옮기기
              cm.execCommand('goLineDown');
            }
          }          
        }else if(name === "Cmd-Up"){
          console.log('Cmd-Up')
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 아래 라인으로 커서 옮기기
              cm.execCommand('goLineDown');
            }
          }          
        }else if(name === "Cmd-Down"){
          console.log('Cmd-Down');
          for( var key in wbfp.takenLines){
            if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
              //존재하면 한단계 위 라인으로 커서 옮기기
              cm.execCommand('goLineUp');
            }
          }          
        }
        


      });

      wbfp.codeMirror.on('inputRead', function(cm, changeObj){
        console.log('inputRead', cm, changeObj);
      });

      wbfp.codeMirror.on('keydown', function(cm, e){

        //cm.execCommand('goLineUp');
        //cm.execCommand('goLineDown');
        
        //1. codeMirror 현재 line 추출하기
        var nowLine = cm.coordsChar({ left : e.target.parentElement.offsetLeft, top : e.target.parentElement.offsetTop + 1 });

        //2. e.keyCode에 따라서 상,하,좌,우 이동 체크하기
        if( e.keyCode === 37 ){ // left
          console.log('keydown ::: ', cm.getCursor());
          console.log('keydown ::: ', e.target.selectionStart);
          //
          // for( var key in wbfp.takenLines){
          //   if(key !== wbfp.userId && wbfp.takenLines[key].line === clickedLine){ 
          //     e.preventDefault();
          //   }
          // }

        }else if( e.keyCode === 38 ){ // up

        }else if( e.keyCode === 39 ){ // right

        }else if( e.keyCode === 40 ){ // down

        }

      });


      wbfp.codeMirror.on('beforeChange', function(cm){
        console.log('beforeChange fired');
      }); 

      // cmd + up 으로 라인 이동하는 경우
      // arrow left, right, up, down 으로 라인 이동하는 경우
      // 마우스 클릭으로 라인 이동하는 경우
      // 다양한 방법으로 라인 이동하는 경우가 있기 때문에
      // 결론적으로 cursorActivity에서 라인 이동이 불가능하도록 처리해주는 것이 가장 좋은 것 같다.
      // cursorActivity에서 enter를 치면 
      // cursor 움직임이 발생할때 마다 firebase customCursor에 업데이트 해줌
      // 반복문은 엄청많이 돌려도 됨!!
      wbfp.codeMirror.on('cursorActivity', function(cm){
        console.log('cursorActivity fired')
        var nowLine = cm.getCursor().line;

        for(var key in wbfp.takenLines){
          if(key !== wbfp.userId && wbfp.takenLines[key].line === nowLine){ 
            
          }
        }

        wbfp.firepadRef.child('users').child(wbfp.userId).child('customCursor').set(cm.getCursor());
        
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