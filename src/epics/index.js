import 'rxjs';
import { combineEpics } from 'redux-observable';
import { getFirebase } from 'react-redux-firebase'
import { NoteEpic, NoteOneEpic } from './NoteEpic';
import { CalendarEpicData } from './CalendarEpic';
// import { ChatEpic } from './ChatEpic';

const rootEpic = (... args) => {
	return combineEpics(
		NoteEpic,
		NoteOneEpic,
		CalendarEpicData
	)(...args, getFirebase);
}

export default rootEpic;