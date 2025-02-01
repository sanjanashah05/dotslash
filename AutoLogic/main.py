import os
import requests
# from langchain.schema.runnable.base import Runnable
from langchain.schema.runnable import RunnableLambda
from langchain.memory import ConversationBufferMemory
from prompts import INITIAL_QUESTIONS_TEMPLATE, FOLLOW_UP_TEMPLATE
from utils import load_huggingface_api_key
from langchain_core.runnables import Runnable

class CustomHuggingFaceLLM:
    def __init__(self, api_key, model_url):
        self.api_key = api_key
        self.model_url = model_url

    def generate(self, prompt):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {"inputs": prompt}
        response = requests.post(self.model_url, headers=headers, json=data)
        if response.status_code != 200:
            raise Exception(f"Error: {response.json()}")
        return response.json()[0]["generated_text"]

class CustomLLMWrapper(Runnable):
    def __init__(self, llm):
        self.llm = llm

    def invoke(self, inputs, config=None, **kwargs):  # Accept extra args safely
        if isinstance(inputs, dict):  
            prompt = inputs.get("symptoms", "") + "\n" + inputs.get("context", "")
        else:
            prompt = str(inputs)

        return self.llm.generate(prompt)


def main():
    # Load Hugging Face API key
    api_key = load_huggingface_api_key()
    os.environ["HUGGINGFACEHUB_API_TOKEN"] = api_key

    # Initialize the custom Hugging Face LLM
    llm = CustomHuggingFaceLLM(
        api_key=api_key,
        model_url="https://api-inference.huggingface.co/models/google/flan-t5-small"
    )

    # ✅ Fix: Ensure memory is used properly
    memory = ConversationBufferMemory()
    
    # ✅ Fix: Use RunnableLambda to properly retrieve memory history
    def retrieve_memory(_):
        return memory.load_memory_variables({})

    memory_handler = RunnableLambda(retrieve_memory)

    # ✅ Wrap the custom LLM in LangChain with the Runnable class
    custom_llm_wrapper = CustomLLMWrapper(llm)

    # ✅ Fix: Ensure correct input format for the prompt
    def format_prompt(inputs):
        return {
            "symptoms": inputs["symptoms"],
            "context": inputs["context"]
        }

    format_prompt_runnable = RunnableLambda(format_prompt)

    # ✅ Fix: Properly construct the conversation pipeline
    conversation = (
        format_prompt_runnable  # Ensure correct inputs
        | FOLLOW_UP_TEMPLATE  # Apply prompt template
        | custom_llm_wrapper  # Send to LLM for processing
    )

    # Ask initial questions
    responses = {}
    print("Welcome to the Patient Diagnosis App!")
    for question in INITIAL_QUESTIONS_TEMPLATE:
        print(f"Question: {question}")
        response = input("Your answer: ")  # Replace with a chatbot interface if needed
        responses[question] = response

    # Combine responses into a single context string
    context = "\n".join([f"{q}: {a}" for q, a in responses.items()])

    # Generate follow-up questions
    print("\nGenerating follow-up questions...")
    try:
        # print("Context:", context)
        follow_up_questions = conversation.invoke({"symptoms": context, "context": "medical diagnosis"})
        print("Follow-Up Questions:")
        print(follow_up_questions)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Ensure environment variables are set
    if not os.getenv("HUGGINGFACE_API_KEY"):
        print("Please set HUGGINGFACE_API_KEY environment variable.")
    else:
        main()
