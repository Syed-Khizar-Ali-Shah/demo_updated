import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Import the star icon
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/email";

const ConfirmBooking =() =>{
    const {id, date, time} = useParams();
  const [instructor, setInstructor] = useState();
const navigate = useNavigate();

    const [isBookingCanceled, setBookingCanceled] = useState(false);

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

    const handleCancelBooking = () => {
      setBookingCanceled(true);

      setTimeout(() => {
        setBookingCanceled(false);
        navigate(`/bookSession/${instructor._id}/${date}/${time}`)

      }, 2000); 
    };

    const handleEdit = () => {
        navigate(`/bookSession/${instructor._id}/${date}/${time}`)
    }

    return(
<>

<div className="relative">
<div className="flex justify-end mt-8 mr-8">

    <button onClick={handleEdit} className="bg-purple-500 text-white px-8 py-2 rounded-lg mr-4">Edit</button>
  
  
    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg"   onClick={handleCancelBooking} >Cancel Booking</button>
  </div>

  {isBookingCanceled && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white text-4xl rounded-lg px-8 py-4"
        >
          BOOKING CANCELED 
        </div>
      )}

  </div>
  <div className="relative">
  <h2 className="text-3xl font-bold text-blue-500 mt-4 capitalize">
    BOOKING CONFIRMED
  </h2>
  </div>

<div className="flex justify-center items-center h-full">
  {/* Picture */}
  <div className="w-1/4 mt-4  rounded-lg p-2">
    <div className="w-50 h-50 overflow-hidden rounded-full bg-gray-300">
      <img
        src={instructor?.image}
        alt="Profile"
        className="w-full h-full object-cover  rounded-full"
      />
    </div>
  </div>

  {/* Initial Information */}
  <div className="w-1/4 mt-8 ml-4"> 
    <h2 className="text-lg font-semibold">{instructor?.firstName + " " + instructor?.lastName}</h2>
    <h2 className="text-lg font-semibold text-gray-600">{instructor?.courses[0]}</h2>
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

  {/* Vertical Line */}
  <div className="border-r border-gray-300 h-40 mx-4"></div>

  {/* Additional Information */}
  <div className="w-1/4">
    <p>
      <span className="font-semibold">Country:</span> United States
    </p>
    <p>
      <span className="font-semibold">Students:</span> 50
    </p>
    <p>
      <span className="font-semibold">Verification:</span> Verified
    </p>
    <p>
      <span className="font-semibold">Member:</span> Gold
    </p>
    <p>
      <span className="font-semibold">Age:</span> 35
    </p>
    <p>
      <span className="font-semibold">Gender:</span> Male
    </p>
    <p>
      <span className="font-semibold">Available From:</span> 9 AM - 5 PM
    </p>


  </div>
</div>

</>
    )
}

export default ConfirmBooking;