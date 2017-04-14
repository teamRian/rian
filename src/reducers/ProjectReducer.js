import { 
	PROJECT_REQUEST_GET, PROJECT_SUCCESS_GET, PROJECT_FAIL_GET,
	PROJECT_REQUEST_POST, PROJECT_SUCCESS_POST, PROJECT_FAIL_POST,
	PROJECT_REQUEST_DELETE, PROJECT_SUCCESS_DELETE, PROJECT_FAIL_DELETE, 
	PROJECT_DETACH
} from '../constants';

var ProjectState = {
	loading: false,
	_id: null,
  name: null,
  creator: null,
  member: [],
  link: null,
  chatroom: null,
  whiteboard: [],
  created_at: null
}
 // Project_GET_DATA, Project_REQUEST_DATA, Project_FAIL_DATA 

export function Project(state = ProjectState, action) {
	switch (action.type){
		case PROJECT_REQUEST_GET:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case PROJECT_SUCCESS_GET:
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
			  name: action.name,
			  creator: action.creator,
			  member: action.member,
			  link: action.link,
			  chatroom: action.chatroom,
			  whiteboard: action.whiteboard,
			  created_at: action.created_at
			})
		case PROJECT_FAIL_GET:
			return Object.assign({}, state, {
				loading: action.loading
			})
		case PROJECT_DETACH:
			return Object.assign({}, state, {
				loading: action.loading,
				_id: action._id,
			  name: action.name,
			  creator: action.creator,
			  member: action.member,
			  link: action.link,
			  chatroom: action.chatroom,
			  whiteboard: action.whiteboard,
			  created_at: action.created_at
			})
		// case "PROJECT_REQUEST_POST":
		// 	return Object.assign({}, state, {
		// 		loading: action.loading
		// 	})
		// case "PROJECT_SUCCESS_POST":
		// 	return Object.assign({}, state, {
		// 		loading: action.loading,
		// 		projects: [...state.projects, action.projects]
		// 	})
		// case "PROJECT_FAIL_POST":
		// 	return Object.assign({}, state, {
		// 		loading: action.loading
		// 	})
		default:
			return state
	}
}