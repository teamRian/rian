// import moment from "moment";
// import database from "firebase/database";
// import { 	
// 	CALENDAR_EPIC_REQUEST_DATA,
// 	CALENDAR_EPIC_FAIL_DATA,
// 	CALENDAR_EPIC_SUCCESS_DATA,
// 	CALENDAR_EPIC_CANCLE_DATA 
// } from "../../../epics/CalendarEpic";

// <<<<<<< HEAD
// export function getStampFire ( monthDays, userId, Project, loaded ){
// 	const totalRefs = [];

// =======
// export function getStampFire ( setState, monthDays, userId, Project, loaded, projectsLoaded ){

// 	const totalRefs = [];
// >>>>>>> 2e65c129d9973c9a289983f4b556442f3120f0ec
// 	// TimeStamp 쿼리를 준비한다
// 	const firstDay = monthDays[0][0];
// 	const lastDay = monthDays[monthDays.length-1][6];
// 	const startStamp = moment([firstDay.year, firstDay.month, firstDay.day, 0]).format("X");
// 	const lastStamp = moment([lastDay.year, lastDay.month, lastDay.day, 24]).format("X");

// 	// 유저 자신의 파이어베이스 통신을 준비해요
// 	const db = database();
// 	let ref = db.ref(`duck/users/${userId}/plans`);
// 	ref = ref.orderByChild("timeStamp").startAt(startStamp).endAt(lastStamp);
// 	totalRefs.push(ref);

// 	ref.on("child_added", snap => {
// 		if(loaded){
// <<<<<<< HEAD
// 			console.log("ADDED EVENT!", snap);
// 		} 
// 		console.log("ADDED EVENT,,,,,", snap)
// =======

// 		} 
// >>>>>>> 2e65c129d9973c9a289983f4b556442f3120f0ec
// 	});
// 	ref.on("child_changed", snap => {
// 	});
// 	ref.on("child_removed", snap => {
// 	});
// 	// const refPromise = ref.once("value");

// 	// 유저가 속해 있는 프로젝트들의 통신도 준비해야겠죠?
// 	const projectsRefArray = [];
// 	Project.projects.forEach(item=>{
// 		projectsRefArray.push(db.ref(`duck/projects/${item._id}/plans`));
// 	})

// 	const projectsRefPromises = [];
// 	projectsRefArray.forEach( projectRef => {

// 		projectRef = projectRef.orderByChild("timeStamp").startAt(startStamp).endAt(lastStamp);
// 		totalRefs.push(projectRef);

// 		projectRef.on("child_added", snap => {
// <<<<<<< HEAD
// 			if(loaded){
// =======
// 			if(projectsLoaded){
// >>>>>>> 2e65c129d9973c9a289983f4b556442f3120f0ec

// 			}
// 		});
// 		projectRef.on("child_changed", snap => {
// 		});
// 		projectRef.on("child_removed", snap => {
// 		});
// 	})

//  //  const allPromises = totalRefs.map(ref=>ref.once("value"));
// 	// Promise.all(allPromises)
// 	// 	.then(snaps => {
// 	// 		// snapshots은 array에요!
// 	// 		console.log("HEY", snaps);
// 	// 		console.log("HEY", snaps[0].val());
// 	// 		console.log("HEY", snaps[1].val());
// 	// 		console.log("HEY", snaps[2].val());
// 	// 		loaded = true;
// 	// 		projectsLoaded = true;

// 	// 	})
// 	// 	.catch(err => console.log(err));

// 	return totalRefs;
// }



// export function printStamps (timeObj){

// }