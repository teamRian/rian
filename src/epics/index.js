import 'rxjs';
import { combineEpics } from 'redux-observable';
import { getFirebase } from 'react-redux-firebase'
import { NoteEpic, NoteOneEpic } from './NoteEpic';
import { PlanEpicData } from './PlanEpic';
// import { ChatEpic } from './ChatEpic';

const rootEpic = (... args) => {
	return combineEpics(
		NoteEpic,
		NoteOneEpic,
		PlanEpicData
	)(...args, getFirebase);
}

export default rootEpic;