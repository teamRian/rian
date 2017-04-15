import {
	PROJECT_EPIC_REQUEST_DATA,
	PROJECT_EPIC_SUCCESS_DATA,
	PROJECT_EPIC_FAIL_DATA,
	PROJECT_EPIC_CANCLE_DATA,
  PROJECT_REQUEST_POST,
  PROJECT_SUCCESS_POST,
  PROJECT_FAIL_POST,
  PROJECT_REQUEST_DELETE,
  PROJECT_SUCCESS_DELETE,
  PROJECT_FAIL_DELETE,
  PROJECT_DETACH,
  PROJECT_LINK_MAKE_OR_EXTEND
} from "../constants";

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
};
// Project_GET_DATA, Project_REQUEST_DATA, Project_FAIL_DATA

export function Project(state = ProjectState, action) {
  switch (action.type) {
  	case PROJECT_EPIC_REQUEST_DATA: 
      return Object.assign({}, state, {
        loading: action.loading,
      });
    case PROJECT_EPIC_SUCCESS_DATA:
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
      });
    case PROJECT_EPIC_FAIL_DATA:
      return Object.assign({}, state, {
        loading: action.loading
      });
    case PROJECT_EPIC_CANCLE_DATA:
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
      });
    case PROJECT_LINK_MAKE_OR_EXTEND:
    	return Object.assign({}, state, {
    		link:action.link
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
      return state;
  }
}
