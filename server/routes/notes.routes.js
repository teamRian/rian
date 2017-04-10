import { Router } from 'express';
import { Observable } from 'rxjs';
const router = new Router();
import firebase from 'firebase';
import firebaseConfig from '../../config/firebaseConfig';
// Get all Project
router.route('/timeline').get((req,res)=>{
	let sorting
	if (req.query.sorting === 'final_modified_at' ) {
		sorting = 'final_modified_at' 
	} 
	if (req.query.sorting === 'created_at' ) {
		sorting = 'created_at' 
	} 
	firebase.database().ref('/notes' + '/' + req.query.q + '/index')
		.orderByChild(sorting)
		.once('value')
		.then((snapshot)=>{
			var total = Object.keys(snapshot.val()).length-1
			var timelineArray = []
			var count = 0
			snapshot.forEach((childSnapshot)=>{
			  var data = childSnapshot.val()
			  var indexInstance = {}
			  indexInstance.index_location = data.index_location
			  indexInstance.infor_location = data.infor_location
			  indexInstance.note_location = data.note_location
			  indexInstance.timelineNum = total
			  timelineArray.unshift(indexInstance)
			  total--
			})

			console.log(timelineArray)
			res.json(timelineArray)
		})


});


export default router;
