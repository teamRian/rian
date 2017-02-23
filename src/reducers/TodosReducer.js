// import Data
import todoList from '../components/Todo/testData';

export function TodosReducer (state = todoList, action) {    
    switch(action.type){
        case 'TODO_ADD':
            return [...state, {
                id: action.newId,
                author: action.author,
                player: action.player, 
                title: action.title,
                text: action.text,
                index: action.index,
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

            return [
                ...state
            ]
        default:
            return state;
    }
}
