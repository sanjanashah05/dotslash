import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaBrain, FaDna, FaUserMd } from "react-icons/fa";
import axios from "axios";

const MiraAIForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    response: "yes",
    symptoms: "",
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/mira_predict", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url);
    } catch (error) {
      console.error("Error in diagnosis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-xl animate-pulse" />
        <div className="absolute top-40 right-40 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-500 rounded-full opacity-10 blur-xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">AI-Powered Disease Prediction</h1>
          <div className="flex justify-center space-x-12 text-blue-200">
            <div className="flex items-center">
              <FaBrain className="mr-2" />
              <span>ML-Driven</span>
            </div>
            <div className="flex items-center">
              <FaDna className="mr-2" />
              <span>High Accuracy</span>
            </div>
            <div className="flex items-center">
              <FaStethoscope className="mr-2" />
              <span>Medical Grade</span>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Input Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <label className="block text-white font-medium mb-2 text-2xl">
                      Patient Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter age"
                      className="w-full bg-white/10 border border-blue-300/30 rounded-xl p-4 text-white placeholder-blue-200/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <label className="block text-white text-2xl font-medium mb-2">
                      Patient Gender
                    </label>
                    <select
                      name="gender"
                      className="w-full bg-white/10 border border-blue-300/30 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" className="bg-blue-900">Select Gender</option>
                      <option value="Male" className="bg-blue-900">Male</option>
                      <option value="Female" className="bg-blue-900">Female</option>
                      <option value="Other" className="bg-blue-900">Other</option>
                    </select>
                  </motion.div>
                </div>

                {/* Symptoms Input */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <label className="block text-white text-2xl font-medium mb-2">
                    Symptoms Description
                  </label>
                  <div className="relative">
                    <textarea
                      name="symptoms"
                      placeholder="Describe all symptoms in detail, including duration and severity..."
                      className="w-full bg-white/10 border border-blue-300/30 rounded-xl p-4 min-h-[200px] text-white placeholder-blue-200/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      value={formData.symptoms}
                      onChange={handleChange}
                      required
                    />
                    <FaUserMd className="absolute right-4 bottom-4 text-2xl text-blue-200/40" />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Diagnosis...</span>
                    </>
                  ) : (
                    <>
                      <FaBrain className="text-xl" />
                      <span>Generate AI Diagnosis</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Download Section */}
              {pdfUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <a
                    href={pdfUrl}
                    download="diagnosis.pdf"
                    className="flex items-center justify-center space-x-2 text-blue-200 hover:text-white font-medium group"
                  >
                    <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Diagnostic Report</span>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MiraAIForm;  