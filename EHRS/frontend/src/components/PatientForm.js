

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientForm = () => {
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      contact: '',
      address: '',
      allergies: '',
      chronicDiseases: '',
      medicationsname: '',
      medicationsdosage: '',
      medicationsfrequency: '',
      bloodType: '',
      medicalHistory: '',
      insuranceprovider: '',
      insurancepolicynumber: ''
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/patients', formData);
      navigate('/dashboard'); // Redirect after successful submission
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full bg-gray-950 shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-blue-300 mb-6">Add Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Phone</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Chronic Diseases</label>
            <input
              type="text"
              name="chronicDiseases"
              value={formData.chronicDiseases}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Medications Name</label>
            <input
              type="text"
              name="medicationsname"
              value={formData.medicationsname}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Medications Dosage</label>
            <input
              type="text"
              name="medicationsdosage"
              value={formData.medicationsdosage}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Medications Frequency</label>
            <input
              type="text"
              name="medicationsfrequency"
              value={formData.medicationsfrequency}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Blood Type</label>
            <input
              type="text"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Medical History</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Insurance Provider</label>
            <textarea
              name="insuranceprovider"
              value={formData.insuranceprovider}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">Insurance Policy Number</label>
            <textarea
              name="insurancepolicynumber"
              value={formData.insurancepolicynumber}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default PatientForm;
