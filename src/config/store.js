import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers';

//redux store to store all the states at one place
const store = createStore(rootReducer)

export default store