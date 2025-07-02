import {applyMiddleware, createStore} from 'redux'
import rootReducer from './Reducers';
import {thunk} from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))


export default store;