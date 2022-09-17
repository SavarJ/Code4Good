import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/register/SignUp";
import { StudentDashboard } from "./pages/studentDashboard/StudentDashboard";
import Dashboard from "./pages/tutorDashboard";
import TutorDropIn from "./pages/tutorDashboard/TutorDropIn.jsx";
import Profile from "./pages/profile";
import Tutor_Feed from "./pages/studentDashboard/Tutor_Feed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard" element={<Dashboard />} />
        <Route path="/tutorfeed" element={<Tutor_Feed />} />
        <Route path="/tutordropin" element={<TutorDropIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
