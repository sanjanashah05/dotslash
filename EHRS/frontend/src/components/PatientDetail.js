

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStethoscope, FaFirstAid, FaRegHospital } from 'react-icons/fa';

const PatientDetail = () => {
  const { patientId } = useParams();
  const [patientDetail, setPatientDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${patientId}`);
        console.log('flag')
        console.log(response.data);
        setPatientDetail(response.data);
        console.log('flag2')
      } catch (error) {
        console.error('Error fetching patient details:', error);
        setError('Unable to fetch patient details.');
      }
    };

    fetchPatientDetail();
  }, [patientId]);

  return (
    <div className="bg-gradient-to-tr from-gray-800 to-gray-700 min-h-screen text-white overflow-x-hidden">
      <div className="container mx-auto py-4 px-4 sm:px-6 max-w-full">
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : !patientDetail ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-gray-700 shadow-lg rounded-lg p-4 sm:p-6 text-center w-full">
              <FaUser className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-blue-950 rounded-full mx-auto mb-4 object-contain" />
              <h1 className="text-lg sm:text-xl font-bold">{patientDetail.firstName} {patientDetail.lastName}</h1>
              <p className="text-sm sm:text-base">{patientDetail.gender}, {new Date(patientDetail.dateOfBirth).toLocaleDateString()}</p>
              <hr className="my-4 border-gray-500" />
              <table className="w-full table-auto">
                <tbody>
                  <tr className="text-white">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-white" />
                        <span className="font-bold tracking-wider">Contact</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-white" />
                        <span className="font-bold tracking-wider">Address</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-white">
                    <td className="p-2 text-left">{patientDetail.contact}</td>
                    <td className="p-2 text-left">{patientDetail.address}</td>
                  </tr>
                  <tr className="text-white">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <FaStethoscope className="text-white" />
                        <span className="font-bold tracking-wider">Allergies</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <FaFirstAid className="text-white" />
                        <span className="font-bold tracking-wider">Chronic Diseases</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <FaRegHospital className="text-white" />
                        <span className="font-bold tracking-wider">Medical History</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-white">
                    <td className="p-2 text-left">{patientDetail.allergies || 'None'}</td>
                    <td className="p-2 text-left">{patientDetail.chronicDiseases || 'None'}</td>
                    <td className="p-2 text-left">{patientDetail.medicalHistory || 'No records available'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            {/* Medications */}
            <div className="bg-gray-700 shadow-lg rounded-lg p-4 sm:p-6 w-full">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-300">Medications</h2>
              <p className="text-sm sm:text-base mb-4">
                <strong>Name:</strong> {patientDetail.medicationsname || 'N/A'} <br />
                <strong>Dosage:</strong> {patientDetail.medicationsdosage || 'N/A'} <br />
                <strong>Frequency:</strong> {patientDetail.medicationsfrequency || 'N/A'}
              </p>
  
              {/* Insurance Details */}
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-300">Insurance Details</h2>
              <p className="text-sm sm:text-base mb-4">
                <strong>Provider:</strong> {patientDetail.insuranceprovider || 'N/A'} <br />
                <strong>Policy Number:</strong> {patientDetail.insurancepolicynumber || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default PatientDetail;

