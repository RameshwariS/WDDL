import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ProfileView.css'

const ProfileView = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { "x-auth-token": token },
        });
        console.log(res.data); // <-- Check if all fields are present
        setUser(res.data);
        
      } catch (err) {
        alert("Failed to fetch profile!");
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email || "Not Provided"}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        {user.profile_picture && (
          <img
            className="profile-picture"
            src={`http://localhost:5000/${user.profile_picture}`}
            alt="Profile"
          />
        )}
      </div>
      <Link className="edit-link" to="/profile/edit">Edit Profile</Link>
    </div>
  );
};

export default ProfileView;