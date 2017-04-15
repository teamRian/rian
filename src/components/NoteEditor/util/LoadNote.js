import setFirepad from './setFirepad.js'

const LoadNote = async (userAddress, Firepad, notelocation, indexlocation, inforlocation)=>{

	const firepadRef = await firebase.database().ref(userAddress + '/' + 'note' + '/' + notelocation)
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
		'/' + 'index' + '/' + indexlocation, 
		'/' + 'infor' + '/' + inforlocation
	)	
}

export default LoadNote