import requests

API_KEY = "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"
API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"

headers = {"Authorization": f"Bearer {API_KEY}"}
data = {"inputs": "What are the symptoms of diabetes?"}

response = requests.post(API_URL, headers=headers, json=data)
print(response.json())