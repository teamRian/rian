var ProjectState = {
	loading:false,
	projects:[]
}
 // Project_GET_DATA, Project_REQUEST_DATA, Project_FAIL_DATA 

export function Project(state = ProjectState, action) {
	switch (action.type){
		case "PROJECT_REQUEST_GET":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "PROJECT_SUCCESS_GET":
			return Object.assign({}, state, {
				loading: action.loading,
				projects: [...action.projects]
			})
		case "PROJECT_FAIL_GET":
			return Object.assign({}, state, {
				loading: action.loading,
				projects: action.projects
			})
		case "PROJECT_REQUEST_POST":
			return Object.assign({}, state, {
				loading: action.loading
			})
		case "PROJECT_SUCCESS_POST":
			return Object.assign({}, state, {
				loading: action.loading,
				projects: [...state.projects, action.projects]
			})
		case "PROJECT_FAIL_POST":
			return Object.assign({}, state, {
				loading: action.loading
			})
		default:
			return state
	}
}