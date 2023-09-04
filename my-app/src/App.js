import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/Store'; // Import your Redux store
import Home from './Pages/Home';
import TutorProfile from './Pages/TutorProfile ';
import SessionBooking from './Pages/SessionBooking';
import Calendar from './Pages/SessionCalendar';
import  { useState } from "react";
import Moment from "moment";
import StudentInfo from './Pages/StudentInfo';
import ConfirmBooking from './Pages/ConfirmBooking';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <Provider store={store}>
      <Router>

        <Routes>
          <Route path="/" element={<Calendar currentDate={currentDate} />} />
          <Route path="/tutorprofile" element={<TutorProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sessionbooking/:id" element={<SessionBooking />} />
          <Route path="/bookSession/:id/:date/:time" element={<StudentInfo/>} />
          <Route path="/confirmBooking/:id/:date/:time" element={<ConfirmBooking/>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
