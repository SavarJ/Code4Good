
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

const Login: React.FC = () => {
  return <div>Login</div>;
};

const Register: React.FC = () => {
  return <div>Register</div>;
};

const Dashboard: React.FC = () => {
  return <div>Dashboard</div>;
};

export default App;
