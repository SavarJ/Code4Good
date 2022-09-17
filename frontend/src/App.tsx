import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/tutorDashboard";
import SignUp from "./pages/auth/register/SignUp";
import { StudentDashboard } from "./pages/studentDashboard/StudentDashboard";
import { TutorDashboard } from "./pages/tutorDashboard/TutorDashboard";
import TutorDropIn from "./pages/tutorDashboard/TutorDropIn.jsx";
<<<<<<< Updated upstream
import Profile from "./pages/profile";
=======
import Leaderboard from "./pages/tutorDashboard/Leaderboard";
import Tutor_Feed from "./pages/studentDashboard/Tutor_Feed";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard" element={<TutorDashboard />} />
        <Route path="/tutorleaderboard" element={<Leaderboard/>}/>
        <Route path="/tutorfeed" element={<Tutor_Feed/>}/>
        <Route path="/tutorprofile" element={<TutorDashboard />} />
        <Route path="/tutordropin" element={<TutorDropIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
