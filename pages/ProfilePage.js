import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [activeTab, setActiveTab] = useState('account');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched profile details:', response.data); // Debugging log
        setProfileDetails(response.data);
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/profile-picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile picture updated:', response.data);
      setProfileDetails({ ...profileDetails, profilePicture: response.data.profilePicture });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="profile-info">
          <img src={`http://localhost:5000${profileDetails.profilePicture}`} alt="Profile" />
          <h2>{profileDetails.name}</h2>
        </div>
        <ul>
          <li className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>Account</li>
          <li className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">
        {activeTab === 'account' && (
          <div className="account-details">
            <h1>Account Details</h1>
            <form>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                <button type="button" onClick={handleProfilePictureUpload}>Upload</button>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={profileDetails.name || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={profileDetails.phone || ''}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={profileDetails.email || ''}
                  readOnly
                />
              </div>
            </form>
          </div>
        )}
        {activeTab === 'events' && (
          <div className="event-details">
            <h1>Event Details</h1>
            {/* Display user's event details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;