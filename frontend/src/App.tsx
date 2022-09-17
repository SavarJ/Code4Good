import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/register/SignUp";
import { StudentDashboard } from "./pages/studentDashboard/StudentDashboard";
import Dashboard from "./pages/tutorDashboard";
import TutorDropIn from "./pages/tutorDashboard/TutorDropIn.jsx";
import Profile from "./pages/profile";
import TutorFeed from "./pages/studentDashboard/TutorFeed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard" element={<Dashboard />} />
        <Route path="/tutorfeed" element={<TutorFeed />} />
        <Route path="/tutordropin" element={<TutorDropIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
