import React, { useState } from 'react';
import { Sidebar } from '../components/sidebar';  // Importing Sidebar component
import './faq.css';  // Importing CSS file

export default function Help({ user }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [location, setLocation] = useState(null);  // State to hold the user's location

  const articles = [
    "How does the website detect red eyes or yellow skin?",
    "How does the website help with accessibility?",
    "How to use the symptom checker?",
    "How does the symptom checker narrow down possible conditions?",
    "How to get a prescription based on symptoms?",
    "What are the most common symptoms detected on the website?",
    "How accurate is the symptom checker?",
    "Can I trust the prescription generated by the website?",
    "How do I use the visual accessibility tools?",
    "What is the purpose of the accessibility features on the website?",
    "How to update my profile and preferences?",
    "How does the website monitor changes in my condition over time?",
    "How do I contact support for help with the website?",
    "How to manage notifications and alerts?",
    "How does the website ensure privacy and security of my data?",
    "How to integrate with other health tools and apps?",
    "Can I access my prescriptions through the mobile app?",
    "What is the Emergency SOS button and how does it work?"
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Function to get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          alert(`Emergency Location: Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          alert("Unable to retrieve location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto sidebar">
        <Sidebar user={user} /> {/* Sidebar stays for navigation */}
      </div>
      <div className="flex-1 bg-darkGray text-white overflow-y-auto content">
        <div className="help-page">
          <div className="body-content">
            <div className="intro">
              <h1>Hello, how can we help?</h1>
            </div>
            <div className="search-box">
              <p>FAQs, quick fixes, and official info on every healthcare feature. Just a click away.</p>
            </div>
          </div>
          <div className="featured-articles">
            <h1>Commonly asked questions</h1>
            <div className="accordion">
              {articles.map((article, index) => (
                <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                  <div className="accordion-title" onClick={() => handleToggle(index)}>
                    {article} 
                    <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`} />
                  </div>
                  <div className={`accordion-content ${activeIndex === index ? 'open' : ''}`}>
                    <p>This is the content for {article}. NidaanAI is your all-in-one healthcare and accessibility tool for detecting symptoms, managing conditions, and ensuring privacy and security of your data.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-us-button-container">
            <button className="bg-gradient-to-r from-F to-D p-2 rounded-md">
              Contact Us
            </button>
          </div>
          {/* Emergency SOS Button */}
          <div className="emergency-sos-button-container">
           
            {location && (
              <div className="emergency-location">
                <p>Emergency Location: Latitude: {location.latitude}, Longitude: {location.longitude}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
