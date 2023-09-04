import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTutor } from '../state/Action/index'; 
import { useNavigate } from 'react-router-dom';
import { saveTutorProfile } from '../state/Action/index';
import axios from "axios"
import { url } from '../utils/email';

const TutorProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [formData, setFormData] = useState({
    userType: '',
    courses: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',
    skillLevel: '',
    image: '',
    experience: '',
    training: '',
    education: '',
    certification: '',
    availability: '',
    __v: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  
const addUser = async () => {
  
  formData = {
    userType : formData?.userType,
    firstName : formData?.firstName,
    lastName : formData?.lastName,
    password : formData?.password,
    email : formData?.email,
    phoneNumber : formData?.phoneNumber,
    skillLevel : formData?.skillLevel,
    image : formData?.image,
    education : formData?.education?.split(','),
    experience : formData?.experience?.split(','),
    availability : formData?.availability?.split('|'),
    training : formData?.training?.split(','),
    courses : formData?.courses?.split(','),
    certification : formData?.certification?.split(',')
  }

  // console.log("f",formData);
  // return

  try {
    const res = await axios.post(`${url}/user`, formData);
      console.log("Request was successful:", res.data);
      navigate('/home')
  } catch (error) {
    console.error("Axios Error:", error);
  }
};

  

  // const handleSave = () => {
  //   console.log("f",formData);
  //   addUser();
  // dispatch(saveTutorProfile(formData));
  //   // navigate('/home');
  //   // Dispatch the action to add tutor
  //   // Redirect to Home page or do whatever is needed
  // };

  // useEffect(() => {
  //   // Fetch instructor details using the API endpoint
  //   axios.get('http://127.0.0.1:5000/user/getInstructorDetailsByld/64ae582c5ae85525e4dc4372')
  //     .then(response => {
  //       setFormData(response.data.instructor);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching instructor details:', error);
  //     });
  // }, []);

  // const handleSave = () => {
  //   // Update instructor details using the same API endpoint
  //   axios.put('http://127.0.0.1:5000/user/updateInstructorProfile/64ae582c5ae85525e4dc4372', formData)
  //     .then(response => {
  //       console.log('Updated instructor details:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error updating instructor details:', error);
  //     });
  // };


  return (

    <div className="max-w-9xl mx-auto ">
         <div className="fixed top-4 left-4">
        <Link to="/home" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
          Home
        </Link>
      </div>
      <div className="p-4 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Tutor Profile</h2>
        <div className="flex flex-col items-center py-4">
          {/* Display fields */}
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">userType</label>
            <input
              type="text"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">Skill Level:</label>
            <input
              type="text"
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">Image url:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-2/3 mt-4">
            <label className="block mb-2 font-semibold">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
                  <label className="block mb-2 font-semibold">Password:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
                <label className="block mb-2 font-semibold">Courses:</label>
            <input
              type="text"
              name="courses"
              value={formData.courses}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

    <label className="block mb-2 font-semibold">Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

    <label className="block mb-2 font-semibold">Training:</label>
            <input
              type="text"
              name="training"
              value={formData.training}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

<label className="block mb-2 font-semibold">Education:</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
    <label className="block mb-2 font-semibold">Certification:</label>
            <input
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
    <label className="block mb-2 font-semibold">Availiability: format(yyyy-mm-dd, 10:00 AM | yyyy-mm-dd, 12:00 PM)</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
   {/* <label className="block mb-2 font-semibold">photo</label>
            <input
              type="file"
              name="Availiability"
              value={formData.photo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
             */}

          </div>

      
          
          <div className="w-full mt-4 flex justify-end">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              onClick={addUser}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;


