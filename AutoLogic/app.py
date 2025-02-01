from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
from eyer import detect_eye_redness
from skin import detect_yellowish_percentage  # Import the new function

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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
        result = detect_eye_redness(file_path)
        os.remove(file_path)
        return jsonify({"result": result})

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
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)