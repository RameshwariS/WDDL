import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ProfileView from "./components/Profile/ProfileView";
import ProfileEdit from "./components/Profile/ProfileEdit";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;