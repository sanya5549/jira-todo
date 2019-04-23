import _ from 'lodash'
import {ADD_NEW_CARD, REMOVE_CARD, EDIT_CARD} from './config/constants';


const initialState = {
    all: [],
    todo: [],
    inProgress: [],
    done: []
}

const rootReducer = (state=initialState, action) => {
     // if there is no action, return the initial state of the card //
    if(state === null || state === undefined) return {...initialState}; 

    // checking for the type of action chosen by the user. The user can perform three types of actions i.e add a //
    switch(action.type) {      
        // add a new card, edit the previous card and delete the card//        
        case ADD_NEW_CARD: {
            const card = action.payload;
            if(card.columnName === 'All'){
                return {
                    ...state,
                    all: [...state.all, card]
                }   
            }else if(card.columnName === 'In Progress'){
                return {
                    ...state,
                    inProgress: [...state.inProgress, card]
                }   
            }else if(card.columnName === 'ToDo'){
                return {
                    ...state,
                    todo: [...state.todo, card]
                }   
            }else if(card.columnName === 'Done'){
                return {
                    ...state,
                    done: [...state.done, card]
                }   
            }
        }    
        
        /* remove the card present in either of the four columns and restore the rest of the cards*/
        case REMOVE_CARD: {                                                  
            const id = action.payload                                        
            const all = _.filter(state.all, o => o.id !== id)
            const todo = _.filter(state.todo, o => o.id !== id)
            const inProgress = _.filter(state.inProgress, o => o.id !== id)
            const done = _.filter(state.done, o => o.id !== id)
            console.log(id, all)    
            return {
                all, todo, inProgress, done
            }
        }

    

        case EDIT_CARD: {
            const card = action.payload
            let idx =  state.all.findIndex(o => o.id === card.id)
            // if the card is not present in all check in next grid and so on//
            if (idx === -1) {                       
                idx = state.inProgress.findIndex(o => o.id === card.id)
                //if the card is not present in inProgress
                if(idx === -1) {
                    idx = state.todo.findIndex(o => o.id === card.id)
                    //if the card is not present in todo part
                    if(idx === -1) {
                        idx = state.done.findIndex(o => o.id === card.id)
                        //if the card is also not present in done part
                        if(idx === -1) {
                            //card not present anywhere...return the same state
                            return {...state}
                        }
                        //card present in done...replace the old card in done and return the new done list
                        state.done[idx] = {...card};  
                        
                        return {                     
                            ...state,
                            done: [...state.done]  
                        }
                    }
                    //card presetn in todo...replace the old card in todo and return the new todo list
                    state.todo[idx] = {...card};
                    return {
                        ...state,
                        todo: [...state.todo]
                    }
                }
                //card present in inProgress..replace the old card in inProgress and return the inProgress list.
                state.inProgress[idx] = {...card}
                return {
                    ...state,
                    inProgress: [...state.inProgress]
                }
            }
            //card present in all...replace the old card in all and return the all list.
            state.all[idx] = {...card}
            return {
                ...state,
                all: [...state.all]
            }
        }

        default: return {...state};
    }
}

export default rootReducer
