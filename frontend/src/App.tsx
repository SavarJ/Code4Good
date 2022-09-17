import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/auth/register/SignUp";
import {StudentDashboard} from "./pages/StudentDashboard";
import { TutorDashboard } from "./pages/TutorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/tutordashboard" element={<TutorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
