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
	
	}
		
	
	componentDidMount() {
		this.firePadrender.bind(this)()
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.nowRenderedNote !== nextProps.nowRenderedNote) {
			if (this.firepad) {
			this.firepad.dispose()
			console.log("Dispose firepad")
			//타임라인 재로딩
    		this.props.allofTimelineGet('final_modified')
		}
			// this.firePadrender.bind(this)()	
		}
		
}
	componentWillUnmount() {
		console.log("Diirepad")

		if (this.firepad) {
			this.firepad.dispose()
			console.log("Dispose firepad")
		}
		
	}

	

	firePadrender(){

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

		  				var codeMirror = CodeMirror(that.refs.firepadContainer, { 
      						lineWrapping: true 
    					});

						var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
						  richTextShortcuts: true,
						  richTextToolbar: true,
						  defaultText: 'Hello, World!'
						});

						that.firepad = firepad
		          	  	setFirepad.bind(that)(newCount, that.props.user, firepad, firepadRef)
		          	})

          		})
          
         
          })

        } else {
        	console.log("Change note")

            var firepadRef = firebase.database().ref('users/' + that.props.user + '/notes/' + that.props.nowRenderedNote)

		    var codeMirror = CodeMirror(that.refs.firepadContainer, { 
      						lineWrapping: true 
			});

			var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
			  richTextShortcuts: true,
			  richTextToolbar: true,
			  defaultText: 'Hello, World!'
			});

			that.firepad = firepad	
		    setFirepad.bind(that)(that.props.nowRenderedNote, that.props.user, firepad, firepadRef)
        }
        


	}

	renderContainer(){
		return (
		
				<div ref='firepadContainer' id='firepad-container'>
				</div>
		
		)
	}
	
	render(){

		return this.renderContainer()

	}

}

export default RockofRianEditor




