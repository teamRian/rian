import 'rxjs';
import { combineEpics } from 'redux-observable';
import { getFirebase } from 'react-redux-firebase'
import { NoteEpic } from './NoteEpic';
// import { ChatEpic } from './ChatEpic';

const rootEpic = (getFirebase) => {
	return combineEpics(
		NoteEpic
	)(getFirebase);
}

export default rootEpic;