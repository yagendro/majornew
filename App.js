import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomePageAfterLogin from './pages/HomePageAfterLogin';
import EventPage from './pages/EventPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/home-after-login') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/events-after-login') || location.pathname.startsWith('/about-after-login') ? (
        <NavbarAfterLogin />
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-after-login" element={<HomePageAfterLogin />} />
        <Route path="/events-after-login" element={<EventPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-after-login" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/organize" element={<EventPage />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;