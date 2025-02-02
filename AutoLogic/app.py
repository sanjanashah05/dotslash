from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import google.generativeai as genai
import re
import textwrap
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from mira_sdk import MiraClient
from dotenv import load_dotenv
from eyer import detect_eye_redness
from skin import detect_yellowish_percentage
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

app = Flask(__name__)
CORS(app)

load_dotenv()

# Load initial questions
with open('questions.json', 'r') as f:
    questions_data = json.load(f)

# Configure Gemini API
genai.configure(api_key="AIzaSyAicT7VYYY35FoADOGqpLyNWZou--gpNRo")

# Initialize Mira AI client
client = MiraClient(config={"API_KEY": "sb-29914a2a5b4d594957a973a1de00e8f6"})

# --- Gemini AI Endpoints ---
@app.route('/get_initial_questions', methods=['GET'])
def get_initial_questions():
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


# --- Mira AI Prescription Logic ---
def clean_text(text):
    text = re.sub(r'\\(.?)\\', r'\1', text)
    text = re.sub(r'(.*?)', r'\1', text)
    return text

def generate_pdf(text, filename="prescription.pdf"):
    pdf = canvas.Canvas(filename, pagesize=letter)
    pdf.setFont("Helvetica", 12)

    # Set margins and initial y-position
    x_margin = 50
    y_position = 750
    line_height = 14
    max_width = 500

    # Add a title or header
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(x_margin, y_position, "Prescription Details")
    y_position -= 30

    # Reset font for normal text
    pdf.setFont("Helvetica", 12)

    # Clean the text to remove unnecessary formatting
    cleaned_text = clean_text(text)

    # Split the cleaned text into lines
    text_lines = cleaned_text.split("\n")

    # Function to draw a line of text with wrapping
    def draw_text_line(text, y_pos, font="Helvetica", size=12, bold=False, italic=False):
        if bold:
            pdf.setFont("Helvetica-Bold", size)
        elif italic:
            pdf.setFont("Helvetica-Italic", size)
        else:
            pdf.setFont(font, size)

        wrapped_lines = textwrap.wrap(text, width=80)
        for line in wrapped_lines:
            if y_pos < 50:  # Start a new page if needed
                pdf.showPage()
                pdf.setFont("Helvetica", 12)
                y_pos = 750
                pdf.drawString(x_margin, y_pos, "Prescription Details")
                y_pos -= 30
            pdf.drawString(x_margin, y_pos, line)
            y_pos -= line_height
        return y_pos

    # Parse and format the prescription text
    for line in text_lines:
        line = line.strip()
        if line.startswith("1.") or line.startswith("2.") or line.startswith("3."):  # Numbered lists
            # Handle numbered lists
            y_position = draw_text_line(line, y_position, bold=True)
        elif line.startswith("-"):  # Bullet points
            # Replace "-" with "•" for better readability
            y_position = draw_text_line("• " + line[1:].strip(), y_position)
        elif "**" in line:  # Bold text (e.g., "**Ibuprofen**")
            # Handle bold text by splitting and formatting
            parts = line.split("**")
            for i, part in enumerate(parts):
                if i % 2 == 1:  # Odd indices are bold
                    y_position = draw_text_line(part, y_position, bold=True)
                else:  # Even indices are normal text
                    y_position = draw_text_line(part, y_position)
        else:  # Regular text
            y_position = draw_text_line(line, y_position)

    # Save the PDF
    pdf.save()
    print(f"PDF saved as {filename}")

def send_email_with_attachment(recipient, subject, body, attachment_path):
    sender_email = "shabbirhussainy2@gmail.com"
    sender_password = "odbo nwsb encv yxbf"  # Use an App Password for Gmail

    # Create email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Attach the PDF file
    with open(attachment_path, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename={os.path.basename(attachment_path)}")
        msg.attach(part)

    # Send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient, msg.as_string())

@app.route("/mira_predict", methods=["POST"])
def mira_predict():
    data = request.json
    age = data.get("age", "").strip()
    gender = data.get("gender", "").strip()
    response = data.get("response", "").strip().lower()
    symptoms = data.get("symptoms", "").strip()

    input_data = {"age": age, "gender": gender, "response": response, "symptoms": symptoms}
    version = "1.0.1"
    flow_name = f"@sanjanashah123/prescription/{version}"

    try:
        api_response = client.flow.execute(flow_name, input_data)
        prescription_text = api_response.get("result", "No prescription generated.")

        pdf_filename = "prescription.pdf"
        generate_pdf(prescription_text, pdf_filename)

        # Send email with PDF attachment
        send_email_with_attachment(
            recipient="u23cs159@coed.svnit.ac.in",
            subject="Mira AI Prescription",
            body="Please find the attached prescription generated by Mira AI.",
            attachment_path=pdf_filename
        )

        return send_file(pdf_filename, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- Image Analysis Endpoints ---
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
    app.run(debug=True)
