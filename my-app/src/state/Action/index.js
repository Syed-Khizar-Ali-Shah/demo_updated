// src/state/Actions/index.js
export const SET_SELECTED_TUTOR = 'SET_SELECTED_TUTOR';

export const setSelectedTutor = (tutor) => ({
  type: SET_SELECTED_TUTOR,
  payload: tutor,
});

export const addTutor = (tutorData) => ({
  type: 'ADD_TUTOR',
  payload: tutorData,
});


// actions.js
export const SAVE_TUTOR_PROFILE = 'SAVE_TUTOR_PROFILE';

export const saveTutorProfile = (tutorData) => {
  return {
    type: SAVE_TUTOR_PROFILE,
    payload: tutorData,
  };
};

