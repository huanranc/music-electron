import {createStore} from 'redux';
import musicReducer from './reducer';

let store=createStore(musicReducer);

export default store;