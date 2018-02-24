import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'; 
import musicReducer from './reducer';

const middleware = [thunkMiddleware]
let store=createStore(musicReducer,applyMiddleware(...middleware));

export default store;