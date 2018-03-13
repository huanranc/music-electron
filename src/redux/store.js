import {createStore,applyMiddleware} from 'redux'; 
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import musicReducer from './reducer';

//let store=createStore(musicReducer);
// const loggerMiddleware = createLogger()
const middleware = [thunkMiddleware]
let store=createStore(musicReducer,applyMiddleware(...middleware));

export default store;