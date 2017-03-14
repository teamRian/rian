import React, { Component } from 'react';
import Firepad from 'firepad';
import firebase from 'firebase';
import { setFirepad } from './util/setFirepad.js'
import './css/RockofRianStyle.css';
import './css/firepad.css';
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

		if (this.props.nowRenderedNote !== nextProps.nowRenderedNote) {
			//이전 파이어패드 종
			this.firepad.dispose()
			//코드미러 초기화
			this.codeMirror.setValue("");
			this.codeMirror.clearHistory()
			this.codeMirror.toTextArea()
				
		}
		
	}
	componentWillUnmount() {
		console.log("Diirepad")

		if (this.firepad) {
			this.firepad.dispose()
			console.log("Dispose firepad")
		}
		
	}

	shouldComponentUpdate(nextProps){
		if (this.props.nowRenderedNote !== nextProps.nowRenderedNote) {
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

        var that = this
        if ( !that.props.nowRenderedNote ) { 
 
    
          var firepadCount = firebase.database().ref('users/' + that.props.user + '/notes/count')

          firepadCount.once('value').then(function(snapshot){
          	var newCount = snapshot.val() + 1
          	var firepadCount = firebase.database().ref('users/' + that.props.user + '/notes/count')
          		.set(newCount).then(function(){

		          	var NowMoment = moment().format('MMMM Do YYYY h:mm:ss a')
		          	var addnewTimeline = {
		          		create_at: NowMoment,
		          		finalmodified_at: NowMoment,
		          		id: newCount
		          	}


		          	var count 
		          	var firepadRefTimeline = firebase.database().ref('users/' + that.props.user + '/timeline/' + newCount)
		          	firepadRefTimeline.set(addnewTimeline).then(function(){
		  				

		  				var firepadRef = firebase.database().ref('users/' + that.props.user + '/notes/' + newCount)

		  				that.codeMirror = CodeMirror.fromTextArea(that.refs.firepadContainer, { 
      						lineWrapping: true 
						})

						that.firepad = Firepad.fromCodeMirror(firepadRef, that.codeMirror, {
						  richTextShortcuts: true,
						  richTextToolbar: true,
						  defaultText: 'Hello, World!'
						});

						
		          	  	setFirepad.bind(that)(newCount, that.props.user, that.firepad, firepadRef)
		          	})

          		})
          
         
          })

        } else {
        	console.log("Change note")
        	
            var firepadRef = firebase.database().ref('users/' + this.props.user + '/notes/' + this.props.nowRenderedNote)
			this.codeMirror = CodeMirror.fromTextArea(this.refs.firepadContainer, { 
      						lineWrapping: true 
			})



			this.firepad = Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
			  richTextShortcuts: true,
			  richTextToolbar: true,
			  defaultText: 'Hello, World!'
			});

			
		    setFirepad.bind(this)(that.props.nowRenderedNote, this.props.user, this.firepad, firepadRef)
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




