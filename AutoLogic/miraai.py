from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import textwrap
import re
from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv
import os
load_dotenv()

# Initialize the client
client = MiraClient(config={"API_KEY": "sb-29914a2a5b4d594957a973a1de00e8f6"})

# Get user input
age = input("Enter age: ").strip()
gender = input("Enter gender: ").strip()
response = input("Enter response (yes/no): ").strip().lower()
symptoms = input("Enter symptoms: ").strip()

# Prepare input data
input_data = {
    "age": age,
    "gender": gender,
    "response": response,
    "symptoms": symptoms
}

version = "1.0.1"
flow_name = f"@sanjanashah123/prescription/{version}" if version else "@sanjanashah123/prescription"

# Execute the API call to get the response
api_response = client.flow.execute(flow_name, input_data)

# Extract prescription text from API response
prescription_text = api_response.get("result", "No prescription generated.")

# Function to clean up the text (removes Markdown-like formatting)
def clean_text(text):
    # Remove Markdown bold, italic, and other formatting
    text = re.sub(r'\\(.?)\\', r'\1', text)  # Remove **bold*
    text = re.sub(r'(.*?)', r'\1', text)  # Remove code
    return text

# Function to generate PDF dynamically
def generate_pdf(text, filename="prescription.pdf"):
    pdf = canvas.Canvas(filename, pagesize=letter)
    pdf.setFont("Helvetica", 12)

    # Set margins and max width for wrapping
    x_margin = 50
    y_position = 750
    line_height = 14  # Adjust line height for better spacing
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

    for line in text_lines:
        # Wrap the text if it exceeds the max width
        wrapped_lines = textwrap.wrap(line, width=80)

        for wrapped_line in wrapped_lines:
            if y_position < 50:  # Start a new page if needed
                pdf.showPage()
                pdf.setFont("Helvetica", 12)
                y_position = 750
                pdf.drawString(x_margin, y_position, "Prescription Details")
                y_position -= 30

            pdf.drawString(x_margin, y_position, wrapped_line)
            y_position -= line_height  # Adjust line height for spacing

    pdf.save()
    print(f"PDF saved as {filename}")

# Generate and save the PDF from the live API response
generate_pdf(prescription_text)