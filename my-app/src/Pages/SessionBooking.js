import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { setSelectedTutor } from '../state/Action/index';
import Calendar from './SessionCalendar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/email';

const SessionBooking = () => {
  const [instructor, setInstructor] = useState();
  const {id} = useParams();



  useEffect(() => {
      axios.get(`${url}/user/getIntructorDetailsById/${id}`).then(res => {
        setInstructor(res.data);
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const selectedTutor = useSelector((state) => state.selectedTutor);

  const dispatch = useDispatch();
  const handleHireClick = (tutor) => {
    dispatch(setSelectedTutor(tutor));
    // Navigate to the Session Booking page...
  };

  const handleRequestDemoClick = (tutor) => {
    dispatch(setSelectedTutor(tutor));
    // Navigate to the Session Booking page...
  };


  if (!selectedTutor) {
    return null; 
  }

  return (
    <>
     <div className="flex">
    <div className="flex flex-wrap">
      <div className="w-64 mx-2 my-2 shadow-lg rounded-lg ml-10">
        <div className="relative">
          <div className="w-full h-40 overflow-hidden rounded-t-lg">
            <img src={instructor?.image} alt="Profile" className="w-full h-full object-cover rounded-t-lg" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{instructor?.firstName + ' ' + instructor?.lastName}</h2>
          <h2 className="text-lg font-semibold text-gray-600">{selectedTutor?.courses[0]}</h2>
          

          <div className="flex items-center mt-2">
            <div className="flex">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <FontAwesomeIcon icon={faStar} className="text-gray-300" />
            </div>
            <span className="ml-2">4.5</span>
          </div>
          <p className="mt-2">Skill level: {instructor?.skillLevel}</p>
          <div className="flex justify-between mt-4">
         
          </div>
        </div>
      </div>
      
    </div>

    


    <div className="additional-card w-64 mx-2 my-2 rounded-lg ml-10 absolute bottom-0 left-0">
  <div className="absolute bg-gray-100 p-4 bottom-0 left-0 right-0 rounded-b-lg">
    <p className="mb-2">
      <span className="font-semibold">Country:</span> {selectedTutor.Country}
    </p>
    <p className="mb-2">
      <span className="font-semibold">TimeZone:</span> {selectedTutor.TimeZone}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Students:</span> {selectedTutor.Students}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Verification:</span> {selectedTutor.Verification}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Member:</span> {selectedTutor.Member}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Age:</span> {selectedTutor.Age}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Gender:</span> {selectedTutor.Gender}
    </p>
    <p className="mb-2">
      <span className="font-semibold">Available From </span> {selectedTutor.PDDate}
    </p>
    {/* You can add more details here */}
  </div>
</div>

<div className="ml-8 flex-grow">
  
        <Calendar instructor={instructor}/>
      </div>
</div>

</>
    
  );
};

export default SessionBooking;
