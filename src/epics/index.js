import 'rxjs';
import { combineEpics } from 'redux-observable';
import { getFirebase } from 'react-redux-firebase'
import { NoteEpic, NoteOneEpic } from './NoteEpic';
import { PlanEpicData } from './PlanEpic';
import { ProjectEpicData, ProjectEpicLinkCreateOrExtend } from './ProjectEpic';
// import { ChatEpic } from './ChatEpic';

const rootEpic = (... args) => {
	return combineEpics(
		NoteEpic,
		NoteOneEpic,
		PlanEpicData,
		ProjectEpicData,
		ProjectEpicLinkCreateOrExtend
	)(...args, getFirebase);
}

export default rootEpic;