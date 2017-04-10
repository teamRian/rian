import React, { Component } from 'react';
import Firepad from 'firepad';
import firebase from 'firebase';
import { setFirepad } from './util/setFirepad.js'
//import './css/RockofRianStyle.css';
//import './css/firepad.css';
import moment from 'moment'





class RockofRianEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderCheck: true
		}
		this.firepad
		this.codeMirror 
		this.firePadrender = this.firePadrender.bind(this)
	}	
		
	
	componentDidMount() {
		this.firePadrender.bind(this)()
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.notelocation !== nextProps.notelocation) {
			//이전 파이어패드 종
			this.firepad.dispose()
			//코드미러 초기화
			this.codeMirror.setValue("");
			this.codeMirror.clearHistory()
			this.codeMirror.toTextArea()
				
		}
		
	}
	componentWillUnmount() {
		console.log("Got rid of firepad")

		if (this.firepad) {
			this.firepad.dispose()
			console.log("Dispose firepad")
		}
		
	}

	shouldComponentUpdate(nextProps){
		if (this.props.notelocation !== nextProps.notelocation) {
			console.log("Change Render Note")
			return true
		} else {
			console.log("Did not change Render Note")
			return false
		}
	}

	componentDidUpdate(prevProps, prevState) {
	   //Component 업데이트 후 파이어패드 재설정	
	   this.firePadrender.bind(this)()
	}

	

	firePadrender(props){
		
		const { user } = this.props
        const that = this
        const userAddress = 'notes/' + user

        if ( !that.props.notelocation ) { 
    	  	

		  const timestamp =  moment().unix()
		  const noteUpdate = {}
	      noteUpdate.share= {}
	      noteUpdate.share[user] = true

      		

    	  //make First Note
  		  const newNotePush = firebase.database().ref(userAddress + '/' + 'note').push()
  		  const newNotekey = newNotePush.key
  		  const firepadRef = firebase.database().ref(userAddress + '/' + 'note' + '/' + newNotekey)
  		  var firebaseIndex
  		  var firebaseInfor
  		  firepadRef.set(noteUpdate)
  			.then(()=>{
  			   var newInforkey = firebase.database().ref(userAddress + '/' + 'infor').push().key
  		
  			   firebaseInfor = '/' + 'infor' + '/' + newInforkey	
  			   
  			   const inforUpdate = {}
  			   inforUpdate.title = "Rian에 오신 것을 환영합니다."
			   inforUpdate.created_at = timestamp
			   inforUpdate.final_modified_at = timestamp
			   inforUpdate.snippet = "환영합니다."
			   inforUpdate.thumbnailUrl = ""
			   inforUpdate.share = {}
			   inforUpdate.share[user] = true  
			   console.log("newInforkey", userAddress + firebaseInfor, inforUpdate)
  			   firebase.database().ref(userAddress + firebaseInfor)
  			       .set(inforUpdate)
  			       .then(()=>{

  			       	   const indexUpdate = {}
  			       	   var newIndexkey = firebase.database().ref(userAddress + '/' + 'index').push().key
  			    
  			       	   firebaseIndex = '/' + 'index' + '/' + newIndexkey
  			       	  
  			       	   indexUpdate.index_location = newIndexkey
	      			   indexUpdate.infor_location = newInforkey
					   indexUpdate.note_location = newNotePush.key
					   indexUpdate.created_at = timestamp
					   indexUpdate.final_modified_at = timestamp
					   indexUpdate.author = user
					   indexUpdate.share = {}
					   indexUpdate.share[user] = true
				       //make First Note's Timeline Instance
				        console.log("newIndexkey", userAddress + firebaseIndex, indexUpdate)
	      			   firebase.database().ref(userAddress + firebaseIndex)
	      			       .set(indexUpdate)
	      			       .then(()=>{

	      			       	   that.codeMirror = CodeMirror.fromTextArea(that.refs.firepadContainer, { 
										lineWrapping: true 
							   })

							   that.firepad = Firepad.fromCodeMirror(firepadRef, that.codeMirror, {
									  richTextShortcuts: true,
									  richTextToolbar: true,
									  defaultText: 'Hello, World!'
							   });

		  	  	  			   setFirepad.bind(that)(
			  	  	  			   	that.firepad, 
			  	  	  			   	firepadRef, 
			  	  	  			   	userAddress, 
			  	  	  			   	firebaseIndex, 
			  	  	  			   	firebaseInfor
		  	  	  			   )

	      			       })    
  			       
	      			   	
       
  			       })
  		  })






        } else {
            var firepadRef = firebase.database().ref(userAddress + '/' + 'note' + '/' + this.props.notelocation)
			this.codeMirror = CodeMirror.fromTextArea(this.refs.firepadContainer, { 
      						lineWrapping: true 
			})

			this.firepad = Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
			  richTextShortcuts: true,
			  richTextToolbar: true,
			  defaultText: 'Hello, World!'
			});

			setFirepad.bind(this)(
				this.firepad, 
				firepadRef, 
				userAddress, 
				'/' + 'index' + '/' + this.props.indexlocation, 
				'/' + 'infor' + '/' + this.props.inforlocation
			)	
        }
        


	}

	renderContainer(){
		return (
				<textarea ref='firepadContainer' id='firepad-container'>

				</textarea >
				
				

		
		)
	}
	
	render(){

		return (
			this.renderContainer()
		)

	}

}

export default RockofRianEditor




