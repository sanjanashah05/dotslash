from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import google.generativeai as genai
from eyer import detect_eye_redness
from skin import detect_yellowish_percentage  # Import the new function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load initial questions
with open('questions.json', 'r') as f:
    questions_data = json.load(f)

# Configure Gemini API
genai.configure(api_key="AIzaSyAVoXDilCnfW3hvXEA_ONntPyZ8E3J5DCc")  # Replace with your Gemini API key

# Endpoint to get initial questions
@app.route('/get_initial_questions', methods=['GET'])
def get_initial_questions():
    # Return the initial questions
    return jsonify(questions_data['initialQuestions'])

@app.route('/generate_follow_up', methods=['POST'])
def generate_follow_up():
    data = request.json
    responses = data.get('responses', {})

    # Convert question IDs to strings to match responses dictionary
    question_map = {str(q["id"]): q["question"] for q in questions_data["initialQuestions"]}

    print("Received responses:", responses)  # Debugging

    # Prepare the prompt for Gemini
    prompt = "The patient provided the following responses to initial health questions:\n"
    for q_id, answer in responses.items():
        question_text = question_map.get(q_id, f"Unknown Question {q_id}")  # Ensure we get the correct question
        prompt += f"- {question_text}: {answer}\n"

    prompt += "Generate 2-3 follow-up questions based on these responses."

    print("Generated prompt:", prompt)  # Debugging

    # Call Gemini API
    try:
        model = genai.GenerativeModel(model_name="gemini-pro")  # Corrected Model Initialization
        response = model.generate_content(prompt)  # Corrected API Call

        print("Gemini API response:", response.text)  # Debugging
        follow_up_questions = response.text.strip().split("\n")  # Split response into separate questions
        return jsonify({"follow_up_questions": follow_up_questions})
    except Exception as e:
        print("Error generating follow-up questions:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route('/predict_disease', methods=['POST'])
def predict_disease():
    data = request.json
    responses = data.get('responses', {})
    
    prompt = "Based on the following patient responses, predict possible diseases:\n"
    for question, answer in responses.items():
        prompt += f"- {question}: {answer}\n"
    
    try:
        model = genai.GenerativeModel(model_name="gemini-pro")
        response = model.generate_content(prompt)
        return jsonify({"prediction": response.text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Endpoint to detect eye redness
@app.route('/detect_eye_redness', methods=['POST'])
def handle_eye_redness():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        # Call your eye redness detection function here (existing functionality)
        result = detect_eye_redness(file_path)
        os.remove(file_path)
        return jsonify({"result": result})

# Endpoint to detect yellowish skin
@app.route('/detect_yellowish_percentage', methods=['POST'])
def handle_yellowish_percentage():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        result = detect_yellowish_percentage(file_path)
        os.remove(file_path)
        return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
