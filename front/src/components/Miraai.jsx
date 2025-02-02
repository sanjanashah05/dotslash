import { useState } from "react";
import axios from "axios";

const MiraAIForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    response: "",
    symptoms: "",
  });
  const handleMiraAI = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/mira_predict", formData, {
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };
  
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
        responseType: "blob", // Important for downloading PDFs
      });
      
      // Create a URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Mira AI Health Check</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          className="w-full p-2 border rounded mb-2"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="w-full p-2 border rounded mb-2"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="response"
          className="w-full p-2 border rounded mb-2"
          value={formData.response}
          onChange={handleChange}
          required
        >
          <option value="">Do you have any pre-existing conditions?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <textarea
          name="symptoms"
          placeholder="Describe your symptoms"
          className="w-full p-2 border rounded mb-2"
          value={formData.symptoms}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {pdfUrl && (
        <a
          href={pdfUrl}
          download="prescription.pdf"
          className="block mt-4 text-blue-600 text-center"
        >
          Download Prescription
        </a>
      )}
    </div>
  );
};

export default MiraAIForm;
