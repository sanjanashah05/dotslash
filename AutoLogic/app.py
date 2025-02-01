from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from mira_sdk import MiraClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Mira API client
client = MiraClient(config={"API_KEY": os.getenv("MIRA_API_KEY")})

# Function to handle eye redness detection (existing functionality)
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

# Function to handle prescription generation via Mira API
def generate_prescription(age, gender, response, symptoms):
    input_data = {
        "age": age,
        "gender": gender,
        "response": response,
        "symptoms": symptoms
    }

    version = "1.0.1"
    flow_name = f"@sanjanashah123/prescription/{version}" if version else "@sanjanashah123/prescription"

    # Execute the API call to Mira
    api_response = client.flow.execute(flow_name, input_data)

    # Extract prescription text from API response
    prescription_text = api_response.get("result", "No prescription generated.")
    return prescription_text

# API endpoint for prescription generation (new functionality)
@app.route('/generate_prescription', methods=['POST'])
def handle_prescription_request():
    data = request.json
    age = data.get('age')
    gender = data.get('gender')
    response = data.get('response')
    symptoms = data.get('symptoms')

    if not all([age, gender, response, symptoms]):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Get prescription from Mira
        prescription = generate_prescription(age, gender, response, symptoms)
        return jsonify({"result": prescription})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
