

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaPencilAlt, FaCheck } from "react-icons/fa";
import CircularPulseLoader from './PulseLoader';
import { IoIosLogOut } from "react-icons/io";

const Dashboard = ({ onLogout, username }) => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, [currentPage]);

  const fetchPatients = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found, unauthorized request');
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/patients?page=${currentPage}&limit=10`
      );

      console.log("API Response:", response.data);
      setPatients(response.data.patients);
      setTotalPages(response.data.totalPages);
      console.log("this: ", response.data.patients);
      console.log("patients: ", patients);

    } catch (error) {
      console.log("no flag");
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    console.log("Patients:", patients);
    console.log("Total Pages:", totalPages);
  }, [patients, totalPages]);  


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddPatient = () => {
    navigate('/patientform');
  };

  const fetchPatientDetail = async (patientId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patients/${patientId}`);
      console.log('Patient details:', response.data);

      // Navigate only after successfully fetching data
      navigate(`/patient/${patientId}`);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };


  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const toggleProfileBox = () => {
    setIsProfileBoxOpen(!isProfileBoxOpen);
  };

  const handleEdit = (patientId) => {
    navigate(`/patient/edit/${patientId}`)
  };

  const [verificationStatus, setVerificationStatus] = useState({});

  // const handleVerify = (patientId) => {
  //   setVerificationStatus({
  //     ...verificationStatus,
  //     [patientId]: true, // Set verification status for this patient to true
  //   });

  //   // In a real application, you would make an API call here to update the backend
  //   // and then update the state based on the API response.
  //   console.log(`Verified patient with ID: ${patientId}`);
  // };

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem('verificationStatus')) || {};
    setVerificationStatus(storedStatus);
  }, []);

  const handleVerify = (id) => {
    const updatedStatus = { ...verificationStatus, [id]: !verificationStatus[id] };
    setVerificationStatus(updatedStatus);
    localStorage.setItem('verificationStatus', JSON.stringify(updatedStatus)); // Save to localStorage
  };


  return (
    <div className="p-4 sm:p-8 bg-gradient-to-t from-black via-gray-800 to-black min-h-screen text-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-200">
          Electronic Health Record System
        </h2>
        <div className="relative flex flex-col items-center space-y-4">
          <button onClick={toggleProfileBox} className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full text-white">
            <FiUser size={24} />
          </button>
          {isProfileBoxOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-gray-800">
              <div className="p-4">
                <p className="font-bold text-lg">Hi, {username}!</p>
              </div>
              <div className="border-t border-gray-200 inline">
                <button onClick={handleLogoutClick} className="w-full px-4 py-2 flex items-center justify-start text-red-600 hover:bg-gray-100 rounded-lg transition">
                  Logout
                  <IoIosLogOut className="ml-2 text-red-600" />
                </button>
              </div>
            </div>
          )}
          <button onClick={handleAddPatient} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transition duration-300">
            +
          </button>
        </div>
      </div>
      <div>
        {patients.length > 0 ? (
          <div className="overflow-x-auto">
            {/* <table className="min-w-full bg-none rounded-lg shadow-lg border border-gray-700">
              <thead>
                <tr className="text-blue-300 bg-gray-900">
                  <th className="px-6 py-4 text-left text-sm sm:text-base">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm sm:text-base">Insurance Policy Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-700 transition duration-300">
                    <td className="px-6 py-4 text-sm sm:text-base cursor-pointer text-white" onClick={() => fetchPatientDetail(patient._id)}>
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-base">{patient.insurancepolicynumber}</td>
                    <td>
                      <FaPencilAlt size={14} className="mr-3 cursor-pointer" onClick={() => handleEdit(patient._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

            <table className="min-w-full bg-none rounded-lg shadow-lg border border-gray-700">
              <thead>
                <tr className="text-blue-300 bg-gray-900">
                  <th className="px-6 py-4 text-left text-sm sm:text-base">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm sm:text-base">Insurance Policy Number</th>
                  <th className="px-6 py-4 text-left text-sm sm:text-base">Actions</th> 
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-700 transition duration-300">
                    <td className="px-6 py-4 text-sm sm:text-base cursor-pointer text-white" onClick={() => fetchPatientDetail(patient._id)}>
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm sm:text-base">{patient.insurancepolicynumber}</td>
                    <td className="px-6 py-4 text-sm sm:text-base flex items-center"> 
                    <button
                        onClick={() => handleVerify(patient._id)}
                        className={`flex items-center mr-10 font-medium rounded-lg text-sm px-2 py-1 focus:outline-none transition duration-300 ${
                            verificationStatus[patient._id] 
                                ? 'text-green-500' // Verified
                                : 'text-red-500' // Not Verified
                        }`}
                    >
                        <FaCheck size={16} className="mr-1" />
                        {verificationStatus[patient._id] ? 'Verified' : 'Not Verified'}
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <CircularPulseLoader />
        )}

        <div className="flex flex-wrap justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} className={`px-4 py-2 mx-1 my-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} rounded-md text-sm sm:text-base shadow-md hover:bg-blue-600 transition duration-300`} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
