import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DynamicQuestions = () => {
  const [initialQuestions, setInitialQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [followUpResponses, setFollowUpResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_initial_questions')
      .then((response) => {
        setInitialQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleResponse = (questionId, response) => {
    setResponses((prev) => ({ ...prev, [questionId]: response }));
  };

  const handleFollowUpResponse = (index, response) => {
    setFollowUpResponses((prev) => ({ ...prev, [index]: response }));
  };

  const handleSubmitInitialQuestions = () => {
    setIsLoading(true);
    axios.post('http://localhost:5000/generate_follow_up', { responses })
      .then((response) => {
        setFollowUpQuestions(response.data.follow_up_questions);
      })
      .catch((error) => {
        console.error('Error generating follow-up questions:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmitFollowUpQuestions = () => {
    setIsFollowUpLoading(true);
    axios.post('http://localhost:5000/predict_disease', { responses: followUpResponses })
      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        console.error('Error predicting disease:', error);
      })
      .finally(() => {
        setIsFollowUpLoading(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-2xl">
      <h2 className="text-3xl font-semibold text-center mb-6">Health AI Diagnosis</h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {initialQuestions.map((question) => (
          <div key={question.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
            <p className="text-lg font-medium">{question.question}</p>
            <div className="mt-3 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => handleResponse(question.id, 'Yes')}>Yes</button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => handleResponse(question.id, 'No')}>No</button>
            </div>
          </div>
        ))}
        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={handleSubmitInitialQuestions} disabled={isLoading}>
          {isLoading ? 'Generating Follow-Up...' : 'Submit Responses'}
        </button>
      </motion.div>

      {followUpQuestions.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Follow-Up Questions</h2>
          {followUpQuestions.map((question, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
              <p className="text-lg font-medium">{question}</p>
              <input className="mt-3 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" placeholder="Your answer" onChange={(e) => handleFollowUpResponse(index, e.target.value)} />
            </div>
          ))}
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={handleSubmitFollowUpQuestions} disabled={isFollowUpLoading}>
            {isFollowUpLoading ? 'Predicting...' : 'Submit Follow-Up'}
          </button>
        </motion.div>
      )}

      {prediction && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-6 p-4 bg-yellow-500 text-gray-900 rounded-lg">
          <h3 className="text-xl font-bold">Predicted Condition:</h3>
          <p className="text-lg">{prediction}</p>
        </motion.div>
      )}
    </div>
  );
};

export default DynamicQuestions;
