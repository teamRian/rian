const makeNoteInitialState = async (done, newUser, userid, timestamp, firebase)=>{
					const noteUpdate = {}
		      		noteUpdate.share= {}
		      		noteUpdate.share[userid] = true
			    	const newNotePush = await firebase.database().ref('notes/' + userid + '/' + 'note').push().key
			    	await firebase.database().ref('notes/' + userid + '/' + 'note' + '/' + newNotePush).set(noteUpdate)

			    	const newInforkey = firebase.database().ref('notes/' + userid + '/' + 'infor').push().key
			    	const inforUpdate = {}
      			    inforUpdate.title = "Rian에 오신 것을 환영합니다."
				    inforUpdate.created_at = timestamp
				    inforUpdate.final_modified_at = timestamp
 				    inforUpdate.snippet= "환영합니다."
  				    inforUpdate.thumbnailUrl= ""
  				    inforUpdate.share= {}
  				    inforUpdate.share[userid] = true
  				
  				    await firebase.database().ref('notes/' + userid + '/' + 'infor' + '/' + newInforkey).set(inforUpdate)
			        const indexUpdate = {}
			      	const newIndexkey = firebase.database().ref('notes/' + userid + '/' + 'index').push().key
			      	indexUpdate.index_location = newIndexkey
      			    indexUpdate.infor_location = newInforkey
				    indexUpdate.note_location = newNotePush
				    indexUpdate.created_at = timestamp
				    indexUpdate.final_modified_at = timestamp
				    indexUpdate.author = userid
				    indexUpdate.share = {}
				    indexUpdate.share[userid] = true
			       //make First Note's Timeline Instance
      			    await firebase.database().ref('notes/' + userid + '/' + 'index' + '/' + newIndexkey).set(indexUpdate)    
					return done(null, newUser);
}

export default makeNoteInitialState