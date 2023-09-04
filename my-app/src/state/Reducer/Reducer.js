
import { SET_SELECTED_TUTOR } from "../Action/index";
import { SAVE_TUTOR_PROFILE } from "../Action/index"; // Update the path as needed


const initialState = {
  selectedTutor: null,
};

export const selectedTutorReducer = (state = initialState.selectedTutor, action) => {
  switch (action.type) {
    case SET_SELECTED_TUTOR:
      return action.payload;
    default:
      return state;
  }
};




// tutorReducer.js

const initState = [];

export const tutorReducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_TUTOR_PROFILE:
      return [...state, action.payload];
    default:
      return state;
  }
};






// reducers.js

const iState = {
  tutorData: [],
  // other initial state properties...
};

export const DateReducer = (state = iState, action) => {
  switch (action.type) {
    case SAVE_TUTOR_PROFILE:
      return {
        ...state,
        tutorData: [...state.tutorData, action.payload],
      };
    // other cases...
    default:
      return state;
  }
};

