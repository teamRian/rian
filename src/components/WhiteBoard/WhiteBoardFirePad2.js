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
    this.userInfo = {};
    // userInfo value 형태 ( firebase event로 받아서 결정되는 값 )
    // { 'dev' : { blockingLine : null, customCursor : { line : 1, ch : 1 }, name : 'dev', color : '#ffff' } }
    this.lineInfo = {}; 
    // lineInfo value 형태 ( firebase event로 받아서 결정되는 값 )
    // { isBlocking : true(이미선택됨)/false(선택가능), nowWriter : 'dev' , writer : { 'chan' : true, 'dev': true }  }

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
    // userInfo 받는일해야됨
    //  - line child_add 또는 change 될때
    let wbfp = this;

    wbfp.codeMirror = CodeMirror(document.getElementById('firepad'), { 
      gutters: ["codemirror-username"],
      lineWrapping: true,
      lineNumbers: true,
      dragDrop : true,
    });
    
    wbfp.firepad = Firepad.fromCodeMirror(wbfp.firepadRef, wbfp.codeMirror, {
                     userId: wbfp.userId,
                     richTextShortcuts: true,
                     //richTextToolbar: true,
                     //defaultText: 'Hello, World!'
                   });
    
    wbfp.firepadUserList = FirepadUserList.fromDiv(wbfp.firepadRef.child('users'), document.getElementById('userlist'), wbfp.userId, wbfp.userId);

    // 처음 firebase에 lines 라는 property가 없으면 default로 생성해주기
    wbfp.firepadRef.child('lines').once('value', function(snapshot){
      var key = snapshot.key;
      var lines = snapshot.val();

      if(!lines){
        var lineObj = { isBlocking : false, nowWriter : false, writer : false }
        wbfp.firepadRef.child('lines').child(0).set(lineObj);
      }else{ // lineInfo init
        wbfp.lineInfo = lines;
      }

    });

    // 한번만 초기에 실행해서 initial값 셋팅
    wbfp.firepadRef.child('users').once('value', function(snapshot){      
      var key = snapshot.key; // projectId      
      var users = snapshot.val();
      
      // userInfo init
      wbfp.userInfo = users;
      
    });

    // Initialize contents.
    wbfp.firepad.on('ready', function() {

      //init customCursor For User
      wbfp.firepadRef.child('users').child(wbfp.userId).update({ blockingLine : false, customCursor : { line : false, ch : false } });

      /*** #### firebase "lines" event handler #### ***/

      // lines에 하위 property들이 추가되는 것을 감지함
      wbfp.firepadRef.child('lines').on('child_added', function(snapshot){
        
        //1. setup
        var key = snapshot.key;
        var line = snapshot.val();
        wbfp.lineInfo[key] = line; // { isBlocking : false, writer: [] }
        console.log('lines child added :: ', key, line);
        
        //2. if 지금 라인이 blocking 됐고 && 지금 추가된 line이 내가 가진 line과 같은 라인인지 비교
        if(line.isBlocking && key === wbfp.userInfo[wbfp.userId].customCursor.line){
          // 잠시 customCursor 준비해놓고 다시올게
        }

      });

      // lines에 하위 property에 변환를 감지함
      wbfp.firepadRef.child('lines').on('child_changed', function(snapshot){
        
        //1. setup
        var key = snapshot.key;
        var line = snapshot.val();
        wbfp.lineInfo[key] = line; // { isBlocking : false, writer: [] }
        console.log('lines child changed :: ', key, line);

      });

      // lines에 하위 property들이 삭제되는 것을 감지함
      wbfp.firepadRef.child('lines').on('child_removed', function(snapshot){
        var key = snapshot.key;
        // var line = snapshot.val();
        delete wbfp.lineInfo[key];
        console.log('lines child removed :: ', key, line);
      });
    	
      /*** #### firebase "users" event handler #### ***/

      // users가 추가되면 감지함
      wbfp.firepadRef.child('users').on('child_added', function(snapshot){
        var key = snapshot.key; // 'dev'
        var user = snapshot.val();
        wbfp.userInfo[key] = user; // { name : 'dev', color: '#fff' }
        console.log('users child added :: ', key, user);

      });

      // users에 변화가 생기면 감지함
      wbfp.firepadRef.child('users').on('child_changed', function(snapshot){
        var key = snapshot.key;
        var user = snapshot.val();
        wbfp.userInfo[key] = user; 
        console.log('users child changed :: ', key, user);

      });

      // users가 삭제되면 감지함
      wbfp.firepadRef.child('users').on('child_removed', function(snapshot){
        var key = snapshot.key;
        delete wbfp.userInfo[key];
        console.log('users child removed :: ', key, user);
      });

      /* #### codemirror event hanlder #### */

      wbfp.codeMirror.on('blur', function(cm, e){
        
      });

      wbfp.codeMirror.on('mousedown', function(cm, e){

        //1. codemirror line 추출하기
        var clickedLine = cm.lineAtHeight( e.y );
        //2. lineInfo에서 해당 라인이 blocking 되어있으면 커서 이동못하게 방지
        if(wbfp.lineInfo[clickedLine] && wbfp.lineInfo[clickedLine].isBlocking){
          e.preventDefault();
        }

      });

      wbfp.codeMirror.on('keyHandled', function(cm, name, e){

        var nowLine = cm.getCursor().line;

        //Left, Right, Up, Down
        if(name === "Left"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineUp'); }
        }else if(name === "Right"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineDown'); }
        }else if(name === "Up"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineUp'); }
        }else if(name === "Down"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineDown'); }
        }

        //Cmd + Left, Right, Up, Down
        else if(name === "Cmd-Left"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineUp'); } 
        }else if(name === "Cmd-Right"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineDown'); } 
        }else if(name === "Cmd-Up"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineDown'); }
        }else if(name === "Cmd-Down"){
          if(wbfp.lineInfo[nowLine].isBlocking){ cm.execCommand('goLineUp'); }
        }
        
      });

/*

1) 두명이서 동시에 같은곳에 커서가 위치할 수 있는지 => 같이 위치할 수 있음
2) 커서위치때문에 잠금이 되는것이 아니라 한글자라도 쓴경우에 잠금이 되는건지 => 한글자 쓴경우 잠금됨
3) 같이 곳에 커서를 위치하고있는데 다른사람이 먼저 글자를 쓴경우 내 커서는 어떻게 되는지 => 내 커서는 블러처리됨
4) => 커서옮기면 바로 잠금 풀림

lineInfo를 만들기 위해서
// { nowState : true(이미선택됨)/false(선택가능), writer : ['chan', 'dev'],  }
이런 형태를 지니고 있어야 하는데
inputRead가 실행될때 => firebase에

*/
      
      wbfp.codeMirror.on('renderLine', function(cm, line, el){
        
        var nowLine = cm.getCursor().line;
        
        if(!wbfp.lineInfo[nowLine]){ //nowLine에 대한 정보가 lineInfo에 없다면 firebase에 init 값을 update해줌
          console.log('renderLine init to firebase', nowLine);
          wbfp.firepadRef.child('lines').child(nowLine).set({ isBlocking : false, nowWriter: false, writer : false });
        }

      });


      //blocking을 설정하는 set/update는 inputRead event에서 실행한다.
      //blocking을 해제하는 set/update는 cursorActivity, blur event 에서 실행한다.
      wbfp.codeMirror.on('inputRead', function(cm, changeObj){

        var nowLine = cm.getCursor().line;
        var nowText = changeObj.text;
        var lineInfo = wbfp.lineInfo[nowLine];
        
        // 1. lineInfo에서 먼저 현재 라인에 대해서 비교한 후에 lineInfo의 firebase update를 할지말지 결정함
        if(lineInfo.nowWriter !== wbfp.userId && !lineInfo.isBlocking){ // blocking 안되있는 경우 firebase lineInfo 정보 업데이트 실행
          
          // writerInfo update
          var writerInfo = wbfp.lineInfo[nowLine].writer;
          if(!writerInfo){
            writerInfo = { };
            writerInfo[wbfp.userId] = true;
          }else{
            writerInfo[wbfp.userId] = true;
          }

          // 단, 내가 변경하려할때 이미 누군가 변경하고 있을 수 있으므로 transaction을 사용해서 변경
          wbfp.firepadRef.child('lines').child(nowLine).transaction(

          function(ingLineInfo){ // transaction으로 처리할 경우 먼저 들어온 정보가 있을때 그것을 넘겨주는것이고, 그런것이 없으면 null값을 넘겨줌!!
            //ingLineInfo가 없거나 ingLineInfo.isBlocking이 false이면 실행
            if(!ingLineInfo || !ingLineInfo.isBlocking){
              //firebase에 정보 update하기
              return { isBlocking : true, nowWriter : wbfp.userId, writer : writerInfo };

            }else{ // lines->nowLine->ingLineInfo가 있다는것은 누군가 해당 라인을 건드리고 있다는 것이기 때문에 지금 수정을 불가능하게 처리해야함
              
              console.log('someone is updating ' + nowLine + '-line info // ingLineInfo ::: ', ingLineInfo);
              //그리고는 현재 커서를 새로운 line을 만들어서 보내주기
              cm.execCommand('newlineAndIndent'); // blur 해주는 방법 찾으면 그걸로 변경해줄것!
              return;
            }

          },function(error, committed, snapshot) { //lineInfo 업데이트가 성공적으로 되면 userInfo는 즉각 update
            //snapshot.val(); // 현재 값
            if (error) {
              console.log('Transaction failed abnormally!', error);
            } else if (!committed) {
              console.log('We aborted the transaction (because ada already exists).');
            } else {
              console.log('success update');
              //user 정보 업데이트
              wbfp.firepadRef.child('users').child(wbfp.userId).update({ 'blockingLine' : nowLine });    
            }
            
          }); // lines transaction end

        }else if(lineInfo.nowWriter === wbfp.userId){ // blocking되어있는곳이 내가 쓰고 있는 경우!

        }else{ // blocking 되어 있는 경우
          
          cm.execCommand('newlineAndIndent'); // blur 해주는 방법 찾으면 그걸로 변경해줄것!  
        }

      });


      //blocking을 해제하는 set/update는 cursorActivity, blur event 에서 실행한다.      
      //blocking을 설정하는 set/update는 inputRead event에서 실행한다.

      //cursorActivity는 내용생기는 경우, 커서 이동 생기는 경우 등 all users에 자동 발생되는 event이다.
      wbfp.codeMirror.on('cursorActivity', function(cm){
        console.log('cursorActivity fired :::');
        var nowCursor = cm.getCursor();
        var nowLine = nowCursor.line;
        var userCursorLine = wbfp.userInfo[wbfp.userId].customCursor.line; 
        var blockingLine = wbfp.userInfo[wbfp.userId].blockingLine;
        //if 현재 사용자가 blocking Line을 갖고 있는데 && 지금 라인과 blocking Line이 동일하지 않다면 blocking 해제!
        if(Number.isInteger(blockingLine) && blockingLine !== nowLine){
          wbfp.firepadRef.child('lines').child(blockingLine).update({ isBlocking : false, nowWriter: false }); 
          wbfp.firepadRef.child('users').child(wbfp.userId).update({ blockingLine : false, customCursor: nowCursor });
        }else{
          wbfp.firepadRef.child('users').child(wbfp.userId).update({ customCursor: nowCursor });
        }

      });

      //blocking을 해제하는 set/update는 cursorActivity, blur event 에서 실행한다.      
      //blocking을 설정하는 set/update는 inputRead event에서 실행한다.
      //나중에 테스트하기위해서 comment처리
      wbfp.codeMirror.on('blur', function(cm, e){

        /*
        //if 현재 사용자가 blocking하던 라인이 존재한다면
        if(Number.isInteger(wbfp.userInfo[wbfp.userId].blockingLine)){
          // 해제가 먼저 실행되야하므로 update로 바로 실행
          var blockingLine = wbfp.userInfo[wbfp.userId].blockingLine;
          wbfp.firepadRef.child('lines').child(blockingLine).update({ isBlocking : false, nowWriter: false }); 
          wbfp.firepadRef.child('users').child(wbfp.userId).update({ 'blockingLine' : false });
        }
        */

      });

      // renderLine event는 커서 이동에는 영향받지 않는다.
      // 하지만 글자 입력이나 line 생성에는 all users에 자동 발생되는 event이다
      wbfp.codeMirror.on('renderLine', function(cm, line, el){

      });


      /* 
        #########################################
        ##### RICH TOOL BOX SHOW - FUNCTION #####
        #########################################
                                                 */

      // keyup 됐을때 rich tool box가 띄워지도록 설정
      wbfp.codeMirror.on('keyup', function(cm, e){
        var selText = cm.getSelection();
        if(selText !== ""){
          console.log('rich tool box show!!!');
        }
      });

      // mouse가 up됐을때 rich tool box가 띄워지도록 설정
      document.getElementById('firepad').addEventListener('mouseup', function(e){        
        var selText = wbfp.codeMirror.getSelection();
        if(selText !== ""){
          console.log('rich tool box show!!!');
        }                
      });

      // mouse가 firepad 영역을 벗어났을때 rich tool box가 띄워지도록 설정
      document.getElementById('firepad').addEventListener('mouseleave', function(e){
        var selText = wbfp.codeMirror.getSelection();
        if(selText !== ""){
          console.log('rich tool box show!!!');
        }
      })       

    }); // firepad.on('ready') end


		wbfp.firepad.on('synced', function(isSynced) {
			 
		});

	}

	componentWillUnmount() {

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