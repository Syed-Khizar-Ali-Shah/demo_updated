// src/state/Reducers/CombineReducer.js
import { combineReducers } from 'redux';
import {selectedTutorReducer,tutorReducer,DateReducer} from './Reducer';

 const rotReducer = combineReducers({
  selectedTutor: selectedTutorReducer,
  tutorData: tutorReducer,
  Dreducer: DateReducer,
  
});
 export default rotReducer;

