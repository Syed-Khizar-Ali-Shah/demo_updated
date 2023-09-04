import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Import the star icon
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../utils/email";

const StudentInfo = () => {
  const {id, date, time} = useParams();
  const [instructor, setInstructor] = useState();
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');

  const selectedTutor = useSelector((state) => state.selectedTutor);
  const navigate = useNavigate();

  const handleBooking = () => {
    const data = {
        recievers : [instructor?.email, email],
        title : 'Session Booking Message',
        message : "Your session have been booked succefully"
    }
     axios.post(`${url}/email`, data).then(res => {
        console.log(res.data)

        navigate(`/confirmBooking/${instructor._id}/${date}/${time}`)
     }).catch(err => {
        console.log(err)
     })
        navigate(`/confirmBooking/${instructor._id}/${date}/${time}`)
  }

  useEffect(() => {
    axios
      .get(`${url}/user/getIntructorDetailsById/${id}`)
      .then((res) => {
        setInstructor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="w-1/4 mt-4  rounded-lg p-2">
          <div className="w-50 h-50 overflow-hidden rounded-full bg-gray-300">
            <img
              src={instructor?.image}
              alt="Profile"
              className="w-full h-full object-cover  rounded-full"
            />
          </div>
        </div>

        <div className="w-1/4 mt-8 ml-4">
          <h2 className="text-lg font-semibold">
            {instructor?.firstName} {instructor?.lastName}
          </h2>
          <h2 className="text-lg font-semibold text-gray-600">
            {instructor?.courses[0]}
          </h2>
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
        </div>

        <div className="border-r border-gray-300 h-40 mx-4"></div>

        <div className="w-1/4">
          <p>
            <span className="font-semibold">Country:</span>{" "}
            {selectedTutor?.Country || "test"}
          </p>
          <p>
            <span className="font-semibold">Students:</span>{" "}
            {selectedTutor?.Students || "test"}
          </p>
          <p>
            <span className="font-semibold">Verification:</span>{" "}
            {selectedTutor?.Verification || "test"}
          </p>
          <p>
            <span className="font-semibold">Member:</span>{" "}
            {selectedTutor?.Member || "test"}
          </p>
          <p>
            <span className="font-semibold">Age:</span>{" "}
            {selectedTutor?.Age || "test"}
          </p>
          <p>
            <span className="font-semibold">Gender:</span>{" "}
            {selectedTutor?.Gender || "test"}
          </p>
          <p>
            <span className="font-semibold">Available From:</span>{" "}
            {selectedTutor?.PDDate || "test"}
          </p>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex">
          <div className="w-1/2 pr-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="w-1/2 pl-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Grade / Class"
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-1/2 pr-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Start Time"
              value={time}
            />
          </div>
          <div className="w-1/2 pl-2">
            <input
              type="text"
              value={date}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Choose Session Date"
            />
          </div>
        </div>
        <div className="mt-2">
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full mt-4 flex justify-end">
        <Link to="/sessionbooking">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back
          </button>
        </Link>
          <button onClick={handleBooking} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
            Confirm Booking
          </button>
      </div>
    </>
  );
};

export default StudentInfo;
