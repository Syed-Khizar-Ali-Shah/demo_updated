import React, { useState } from "react";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";
import { useNavigate } from "react-router-dom";


const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()


  const handleCreateSession = () => {
      navigate(`/bookSession/${props?.instructor._id}/${date}/${time}`)
  }

  const Modal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          {/* <button className="close-button" onClick={closeModal}>
            &times;
          </button> */}
          <p>Date: {date}</p>
          <p>Time: {time}</p>
           <button onClick={() => handleCreateSession()}>Book Session</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    );
  };

  console.log('c',props.instructor?.availability)

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleBooking = (isAvailable, date, time) => {
    console.log("a", isAvailable, "d", date, "t", time)

    if(isAvailable === true) {
         setShowModal(true);
         setDate(date);
         setTime(time);
    }
  }

  const handleForwardButtonClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleBackwardButtonClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const getDaysInWeek = (weekStart) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getTimes = () => {
    const times = [];
    for (let i = 8; i < 17; i++) {
      times.push(`${i}:00 AM`, `${i}:30 AM`);
    }
    return times;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const renderCell = (day, time) => {
    
    console.log('day',day, "time", time )
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const dayy = String(day.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${dayy}`;
    console.log("formated", formattedDate)
    // console.log('d', formattedDate, 'time', time)
    // Logic to determine if slot is available or not
    let isAvailable
    for(let i=0; i<props.instructor?.availability?.length ; i++) {
    if(props.instructor?.availability[i]?.split(',')[0].trim() === formattedDate.trim() && props.instructor?.availability[i].split(',')[1].trim() === time.trim()) {// Replace with your logic
    isAvailable=true;
    break
    }
    }
    return (
      <td onClick={() => handleBooking(isAvailable, formattedDate, time)} key={`${day.getTime()}-${time}`} className="border px-4 py-2">
        {isAvailable ? "Available" : ""}
      </td>
    );
  
  };

  return (
    <div className="p-4 relative">
      {showModal && <Modal />}
      <h1 className="text-2xl font-semibold mb-4">Book your online session</h1>
      <h1 className="text-black-600 mb-4">
         {currentDate.toDateString()} 
        </h1>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleBackwardButtonClick}
        >
           <FontAwesomeIcon icon={faArrowLeft} /> 
        </button>
        <div className="w-2"></div>
        <button
          className="bg-blue-500 text-white px-4  rounded"
          onClick={handleForwardButtonClick}
        >
         <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2"></th>
            {getDaysInWeek(currentDate).map((day) => (
              <th
                key={day.getDay()}
                className="border p-2 text-center whitespace-nowrap"
              >
                {formatDate(day)}
                <br />
                {daysOfWeek[day.getDay()]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getTimes().map((time) => (
            <tr key={time} className="border">
              <th className="border p-2 text-center">{time}</th>
              {getDaysInWeek(currentDate).map((day) =>
                renderCell(day, time,)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
