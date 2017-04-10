import moment from 'moment'


export function setFirepad(firepad, firepadRef, userAddress, firebaseIndex, firebaseInfor){

    firepad.on('ready', function(){
      console.log("firepad ready")
      firepad.setUserColor("#FF0000")
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rian에서 당신의 꿈을 기록하세요.</span>');
      }

    });

    firepad.on('synced', function(){
    
    
       var timestamp = moment().unix()
       var tempText = firepad.getText()

        //updateIndex // 업데이트 노트랑 한번에 할 수 없을까요?
        const indexUpdate = {}
        indexUpdate.final_modified_at = timestamp
        firebase.database().ref(userAddress + firebaseIndex)
          .update(indexUpdate)
          .then(()=>{
              //updateNoteInfor
              var inforUpdate = {}
              inforUpdate.final_modified_at = timestamp
              inforUpdate.title = tempText.slice(0, tempText.indexOf('\n'))
              inforUpdate.snippet = tempText.slice(tempText.indexOf('\n'), 160)
              firebase.database().ref(userAddress + firebaseInfor)
                .update(inforUpdate) 
                .then(()=>{
                    console.log("UpdateNoteInfor", inforUpdate, firebaseInfor)

                })


          })

  
              
    });
   


}


