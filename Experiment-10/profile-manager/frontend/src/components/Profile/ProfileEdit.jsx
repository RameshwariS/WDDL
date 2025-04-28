import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentProfilePic, setCurrentProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { "x-auth-token": token },
        });
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || ""
        });
        if (res.data.profile_picture) {
          setCurrentProfilePic(`http://localhost:5000/${res.data.profile_picture}`);
        }
      } catch (err) {
        alert("Failed to fetch profile data!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (profilePicture) data.append("profile_picture", profilePicture);

    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/profile", data, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      alert("Failed to update profile!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        {currentProfilePic && (
          <div className="current-profile-pic">
            <img src={currentProfilePic} alt="Current Profile" width="100" />
            <p>Current Profile Picture</p>
          </div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEdit;