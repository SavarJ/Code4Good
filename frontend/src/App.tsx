import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/dashboard";
import StudentSignUp from "./pages/auth/register/StudentSignUp";
import TutorSignUp from "./pages/auth/register/TutorSignUp";
import DropIn from "./pages/dashboard/TutorLayout/DropIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/tutorsignup" element={<TutorSignUp />} />
        <Route path="/auth/studentsignup" element={<StudentSignUp />} />
        <Route path="/dropin" element={<DropIn/>} />
      </Routes>
    </Router>
  );
}

export default App;
