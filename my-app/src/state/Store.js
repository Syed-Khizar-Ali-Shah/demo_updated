// src/state/Store.js
import { configureStore } from '@reduxjs/toolkit';
import rotReducer from './Reducer/CombineReducer';


const store = configureStore({
  reducer: rotReducer,
}); 

export default store;
