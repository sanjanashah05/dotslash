import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="container mx-auto p-6 max-w-xl bg-gray-100 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Initial Health Questions</h2>
      {initialQuestions.map((question) => (
        <div key={question.id} className="p-4 bg-white shadow rounded-lg mb-4">
          <p className="font-medium">{question.question}</p>
          <div className="mt-2 flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleResponse(question.id, 'Yes')}>Yes</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleResponse(question.id, 'No')}>No</button>
          </div>
        </div>
      ))}
      <button className="bg-green-500 text-white px-6 py-2 rounded mt-4" onClick={handleSubmitInitialQuestions} disabled={isLoading}>
        {isLoading ? 'Generating Follow-Up...' : 'Submit Responses'}
      </button>
      
      {followUpQuestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Follow-Up Questions</h2>
          {followUpQuestions.map((question, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg mb-4">
              <p className="font-medium">{question}</p>
              <input 
                type="text" 
                className="w-full p-2 border rounded mt-2" 
                placeholder="Your answer" 
                onChange={(e) => handleFollowUpResponse(index, e.target.value)}
              />
            </div>
          ))}
          <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4" onClick={handleSubmitFollowUpQuestions} disabled={isFollowUpLoading}>
            {isFollowUpLoading ? 'Predicting...' : 'Submit Follow-Up'}
          </button>
        </div>
      )}
      
      {prediction && (
        <div className="mt-6 p-4 bg-yellow-200 border-l-4 border-yellow-500 text-yellow-900">
          <h3 className="font-bold">Predicted Disease:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default DynamicQuestions;
