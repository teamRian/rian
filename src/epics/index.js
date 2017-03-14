import 'rxjs';
import { combineEpics } from 'redux-observable';
import { getFirebase } from 'react-redux-firebase'
import { NoteEpic, NoteOneEpic } from './NoteEpic';
import { CalendarEpic } from './CalendarEpic';
// import { ChatEpic } from './ChatEpic';

const rootEpic = (... args) => {
	return combineEpics(
		NoteEpic,
		NoteOneEpic,
		CalendarEpic,
	)(...args, getFirebase);
}

export default rootEpic;