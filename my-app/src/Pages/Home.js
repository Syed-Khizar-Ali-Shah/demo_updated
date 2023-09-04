import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Import the star icon
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedTutor } from "../state/Action/index";
import { useSelector } from "react-redux";
import Calendar from "./SessionCalendar";
import axios from "axios";
import { url } from "../utils/email";

const Home = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPreferredStartDate, setSelectedPreferredStartDate] =
    useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState([]);
  const subjects = [
    "Computer Science",
    "Geology",
    "Agriculture",
    "Software Engineering",
    "Music",
    "Art",
  ];
  const [instructors, setInstructors] = useState([]);
  const [availableDates, setDates] = useState([]);

  const navigate = useNavigate();

  console.log("i", instructors);

  console.log("dt", selectedPreferredStartDate);

  console.log("new", availableDates);

  useEffect(() => {
    axios
      .get(`${url}/user`)
      .then((res) => {
        const filterInstructors = res.data.filter((i) => {
          return i.userType.toLowerCase() == "instructor";
        });

        setInstructors(filterInstructors);
        console.log("ava", filterInstructors[0].availability);
        const dates = filterInstructors[0]?.availability.map((i, index) => {
          const d = i.split(",")[0].trim();
          return d;
        });

        setDates(dates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tutorData = useSelector((state) => state.tutorData);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handlePreferredStartDateChange = (event) => {
    setSelectedPreferredStartDate(event.target.value);
  };

  const handleSkillLevelChange = (event) => {
    const skillLevel = event.target.value;
    setSelectedSkillLevel((prevSelectedSkillLevel) => {
      if (prevSelectedSkillLevel.includes(skillLevel)) {
        return prevSelectedSkillLevel.filter((level) => level !== skillLevel);
      } else {
        return [...prevSelectedSkillLevel, skillLevel];
      }
    });
  };

  const tutor = [
    {
      id: 1,
      skillLevel: "Expert",
      name: "Jessica",
      subject: "Computer Science",
      Country: "Lahore Pakistan",
      TimeZone: "GMT4",
      Students: "6",
      Verification: "ChatGpt",
      Member: "Aug 2023",
      Age: "24 Years",
      Gender: "Female",
      PDDate: "09/31/2023",
    },
    {
      id: 2,
      skillLevel: "Medium",
      name: "White",
      subject: "Geology",
      Country: "Ankara Turkey",
      TimeZone: "GMT4",
      Students: "6",
      Verification: "ChatGpt",
      Member: "Aug 2023",
      Age: "24 Years",
      Gender: "Female",
      PDDate: "08/31/2023",
    },
    {
      id: 3,
      skillLevel: "High",
      name: "Moin",
      subject: "Agriculture",
      Country: "California America",
      TimeZone: "GMT4",
      Students: "6",
      Verification: "ChatGpt",
      Member: "Aug 2023",
      Age: "24 Years",
      Gender: "Male",
      PDDate: "08/31/2023",
    },
    {
      id: 4,
      skillLevel: "Expert",
      name: "Shah",
      subject: "Software Engineering",
      Country: "Sydney Australia",
      TimeZone: "GMT4",
      Students: "6",
      Verification: "ChatGpt",
      Member: "Aug 2023",
      Age: "24 Years",
      Gender: "Male",
      PDDate: "08/31/2023",
    },
    {
      id: 5,
      skillLevel: "Medium",
      name: "Akram",
      subject: "Computer Science",
      Country: "Istanbul Turkey",
      TimeZone: "GMT4",
      Students: "6",
      Verification: "ChatGpt",
      Member: "Aug 2023",
      Age: "24 Years",
      Gender: "Male",
      PDDate: "08/31/2023",
    },
  ];

  console.log(
    "selected",
    selectedPreferredStartDate,
    "in",
    instructors[4]?.availability[0].split(",")[0]
  );

  const filteredTutors = instructors.filter((i) => {
    if (selectedSubject && !i.courses.includes(selectedSubject)) {
      return false;
    }
    if (
      selectedSkillLevel.length > 0 &&
      !selectedSkillLevel.includes(i.skillLevel)
    ) {
      return false;
    }
    if (
      selectedPreferredStartDate &&
      !availableDates?.includes(selectedPreferredStartDate)
    ) {
      return false;
    }
    return true;
  });

  console.log("ft", filteredTutors);

  const dispatch = useDispatch();

  const handleHireClick = (tutor) => {
    dispatch(setSelectedTutor(tutor));
    // Navigate to the Session Booking page...
  };

  const handleRequestDemoClick = (tutor) => {
    dispatch(setSelectedTutor(tutor));
    // Navigate to the Session Booking page...
  };

  const handleBooking = (id) => {
    navigate(`/sessionbooking/${id}`);
  };

  return (
    <>
      <div className="flex justify-start mt-0">
        <div className="w-96 h-screen p-4 bg-gray-100 shadow-lg rounded-lg mr-8">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Tutor Profile
          </h2>
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="subject" className="block font-semibold">
                Select Subject:
              </label>
              <select
                id="subject"
                name="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block font-semibold">
                Preferred Start Date:{" "}
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={selectedPreferredStartDate}
                onChange={handlePreferredStartDateChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Skill Level:</label>
              <div>
                <label htmlFor="low">Low</label>
                <input
                  type="checkbox"
                  id="low"
                  name="skillLevel"
                  value="Low"
                  checked={selectedSkillLevel.includes("Low")}
                  onChange={handleSkillLevelChange}
                />
              </div>
              <div>
                <label htmlFor="medium">Medium</label>
                <input
                  type="checkbox"
                  id="medium"
                  name="skillLevel"
                  value="Medium"
                  checked={selectedSkillLevel.includes("Medium")}
                  onChange={handleSkillLevelChange}
                />
              </div>
              <div>
                <label htmlFor="high">High</label>
                <input
                  type="checkbox"
                  id="high"
                  name="skillLevel"
                  value="High"
                  checked={selectedSkillLevel.includes("High")}
                  onChange={handleSkillLevelChange}
                />
              </div>
              <div>
                <label htmlFor="expert">Expert</label>
                <input
                  type="checkbox"
                  id="expert"
                  name="skillLevel"
                  value="Expert"
                  checked={selectedSkillLevel.includes("Expert")}
                  onChange={handleSkillLevelChange}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap">
          {filteredTutors.map((tutor, index) => (
            <div key={tutor.id} className="w-64 mx-2 my-2 shadow-lg rounded-lg">
              <div className="relative">
                <div className="w-full h-40 overflow-hidden rounded-t-lg">
                  <img
                    src={tutor.image ? tutor.image : "./profile.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {tutor.firstName + " " + tutor.lastName}
                </h2>
                <h2 className="text-lg font-semibold text-gray-600">
                  {tutor.courses[0]}
                </h2>

                <div className="flex items-center mt-2">
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-500"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-500"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-500"
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-500"
                    />
                    <FontAwesomeIcon icon={faStar} className="text-gray-300" />
                  </div>
                  <span className="ml-2">4.5</span>
                </div>
                <p className="mt-2">{tutor.skillLevel}</p>
                <div className="flex justify-between mt-4">
                  <li
                    style={{ listStyle: "none" }}
                    onClick={() => handleBooking(tutor._id)}
                  >
                    <button
                      className="bg-purple-500 text-white px-4 py-1 rounded-3xl"
                      onClick={() => handleRequestDemoClick(tutor)}
                    >
                      Request Demo
                    </button>
                  </li>
                  <li
                    style={{ listStyle: "none" }}
                    onClick={() => handleBooking(tutor._id)}
                  >
                    <button
                      className="bg-purple-500 text-white px-5 py-1 rounded-3xl -ml-1"
                      onClick={() => handleHireClick(tutor)}
                    >
                      Hire
                    </button>
                  </li>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          <div className="fixed bottom-4 right-4">
            <div className="w-48 h-48 flex-shrink-0 rounded-xl bg-white shadow-lg p-4">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-600 mt-2">
                Become a Tutor
              </h2>
              <Link to="/tutorprofile">
                <button className="bg-purple-500 text-white px-2 py-1 rounded-xl mt-2">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Display tutor cards for existing tutors */}
        {tutorData.map((tutor) => (
          <div key={tutor._id} className="w-64 mx-2 my-2 shadow-lg rounded-lg">
            <div className="relative">
              <div className="w-full h-40 overflow-hidden rounded-t-lg">
                <img
                  src={tutor.photo}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {tutor.firstName} {tutor.lastName}
              </h2>
              <h2 className="text-lg font-semibold text-gray-600">
                {tutor.courses}
              </h2>

              {/* Other details... */}

              <div className="flex justify-between mt-4">
                <Link to="/sessionbooking">
                  <button className="bg-purple-500 text-white px-4 py-1 rounded-3xl">
                    Request Demo
                  </button>
                </Link>
                <Link to="/sessionbooking">
                  <button className="bg-purple-500 text-white px-5 py-1 rounded-3xl -ml-1">
                    Hire
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
