import { Link } from "react-router-dom";
import TutorProfile from "./Pages/TutorProfile ";
import React from "react";
import Home from "./Pages/Home";

const Navbar =() =>{
    return(
        <div className="navbar">
      <Link to ="/home">Home</Link>
    <Link to ="/tutorprofile">TutorProfile</Link>
    </div>
        
    )
}

export default Navbar;