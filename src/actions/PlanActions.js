import {
	PLAN_UPDATE_CHILD_ADDED, PLAN_UPDATE_CHILD_REMOVED, 
	PLAN_UPDATE_CHILD_CHANGED, PLAN_UPDATE_COMPLETE
} from "../constants";

/*====================================
=            PLAN ACTIONS            =
====================================*/

/*----------  PLAN FIREBASE UPDATE  ----------*/
export function planChildAdded(newChild){
	return {
		type: PLAN_UPDATE_CHILD_ADDED,
		value: newChild,
		update: 'ADD'
	};
}
export function planChildRemoved(removedChild){
	return {
		type: PLAN_UPDATE_CHILD_REMOVED,
		value: removedChild,
		update: 'REMOVE'
	};
}
export function planChildChanged(changedChild){
	return {
		type: PLAN_UPDATE_CHILD_CHANGED,
		value: changedChild,
		update: 'CHANGE'
	};
}
export function planUpdateComplete(changedChild){
	return {
		type: PLAN_UPDATE_COMPLETE,
		update: false
	};
}
