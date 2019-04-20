import {ADD_NEW_CARD, REMOVE_CARD, EDIT_CARD} from './config/constants'
import { ok } from 'assert';

// by the action of adding card, we are returning the whole card with all its properties 
export const addCard = (card) => {      
    //return everything you want to be caught by the root reducer in action 
    return {
        type: ADD_NEW_CARD,
        payload: card                
    }
}

// by the action of deleting card, we only need its id to check which card was chosen by the user
export const removeCard = (cardId) => {   
    return {
        type: REMOVE_CARD,
        payload: cardId
    }
}

//for the action of edit card also we need its properties to change and update them
export const editCard = (card) => { 
    return {
        type: EDIT_CARD,
        payload: card
    }
}

