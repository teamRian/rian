import Firepad from 'firepad';
import firebase from 'firebase';
import moment from 'moment'


export function setFirepad(NoteNum, userid, firepad, firepadRef){


    firepad.on('ready', function(){
      console.log("firepad ready")
      firepad.setUserColor("#FF0000")
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rian에서 당신의 꿈을 기록하세요.</span>');
      }

    });

    firepad.on('synced', function(){
      var nowTime = moment().format('MMMM Do YYYY h:mm:ss a')
      var tempText = firepad.getText()
      //updateNote
      var updateNote = {}
      updateNote.finalmodified_at = nowTime 
      updateNote.title = tempText.slice(0, tempText.indexOf('\n'))
      updateNote.content = tempText.slice(tempText.indexOf('\n'), 160)
     
      updateNote.finalmodified_at = nowTime 
      firepadRef.update(updateNote)
      //updateTimeline
      var updateTimeline = {}
      updateTimeline.finalmodified_at = nowTime
      firebase.database().ref('users/' + userid + '/timeline/' + NoteNum)
        .update(updateTimeline)
    })


}