import os

def load_huggingface_api_key():
    """Load the Hugging Face API key from an environment variable."""
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    if not api_key:
        raise ValueError("HUGGINGFACE_API_KEY environment variable is not set.")
    return api_key