// import Data
import todoList from '../components/Todo/testData';

export function TodosListReducer (state = todoList.todos, action) {    
    switch(action.type){
        case 'TODO_ADD':
            return [...state, {
                id: action.newId,
                author: action.author,
                player: [action.player], 
                title: action.title,
                text: action.text,
                index: action.index,
                importance: action.importance,
                status: "created"
            }]
        case 'TODO_REMOVE':
            let removeIndex;

            for(let i = 0; i < state.length; i++) {
                if(state[i].id === action.id) {
                    removeIndex = i;
                    break;
                }
            }

            if(state.length === 1) {
                return [];
            } else {
                return [
                    ...state.slice(0, removeIndex),
                    ...state.slice(removeIndex + 1)
                ]
            }
        case 'TODO_CHANGE_STATUS':
            let changeIndex;

            for(let i = 0; i < state.length; i++) {
                if(state[i].id === action.id) {
                    changeIndex = i;
                    break;
                }
            }
            
            state[changeIndex].status = action.status;
            
            if(action.startdate.length !== 0) {
                state[changeIndex].startdate = action.startdate;
            }

            if(action.enddate.length !== 0) {
                state[changeIndex].enddate = action.enddate;
            }

            return [
                ...state
            ]
        default:
            return state;
    }
}


export function TodosLogsReducer (state = todoList.logs, action) {    
    switch(action.type){
        case 'TODO_ADD':
            return Object.assign({}, state, action.log);
        case 'TODO_REMOVE':
            return Object.assign({}, state, action.log);
        case 'TODO_CHANGE_STATUS':
            return Object.assign({}, state, action.log);
        default:
            return state;
    }
}

