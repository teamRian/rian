import moment from 'moment'
import setFirepad from './setFirepad.js'
const makeNewNote = async (user, userAddress, firebase, Firepad) => {

	const timestamp =  moment().unix()

	//make First Note
	const newNotePush = await firebase.database().ref(userAddress + '/' + 'note').push()
	const newNotekey = await newNotePush.key
    const firepadRef = await firebase.database().ref(userAddress + '/' + 'note' + '/' + newNotekey)

    const noteUpdate = {}
	noteUpdate.share= {}
	noteUpdate.share[user] = true
    await firepadRef.set(noteUpdate)

    let newInforkey = firebase.database().ref(userAddress + '/' + 'infor').push().key
    const firebaseInfor = '/' + 'infor' + '/' + newInforkey
    const inforUpdate = {}
    inforUpdate.title = "Rian에 오신 것을 환영합니다."
	inforUpdate.created_at = timestamp
	inforUpdate.final_modified_at = timestamp
	inforUpdate.snippet = "환영합니다."
	inforUpdate.thumbnailUrl = ""
	inforUpdate.share = {}
	inforUpdate.share[user] = true  
	await firebase.database().ref(userAddress + firebaseInfor).set(inforUpdate)

	let newIndexkey = await firebase.database().ref(userAddress + '/' + 'index').push().key
	const firebaseIndex = '/' + 'index' + '/' + newIndexkey
	const indexUpdate = {}
	indexUpdate.index_location = newIndexkey
	indexUpdate.infor_location = newInforkey
	indexUpdate.note_location = newNotePush.key
	indexUpdate.created_at = timestamp
	indexUpdate.final_modified_at = timestamp
	indexUpdate.author = user
	indexUpdate.share = {}
	indexUpdate.share[user] = true
	await firebase.database().ref(userAddress + firebaseIndex).set(indexUpdate)

	this.codeMirror = CodeMirror.fromTextArea(this.refs.firepadContainer, { 
								lineWrapping: true 
	})

	this.firepad = Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
							  richTextShortcuts: true,
							  richTextToolbar: true,
							  defaultText: 'Hello, World!'
	});

	setFirepad(
		this.firepad, 
		firepadRef, 
		userAddress, 
		firebaseIndex, 
		firebaseInfor
	)

}


  		

export default makeNewNote;


