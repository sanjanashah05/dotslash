from langchain.prompts import PromptTemplate

# Initial questions template
INITIAL_QUESTIONS_TEMPLATE = [
    "Are you experiencing any pain or discomfort?",
    "How long have you been feeling this way?",
    "Do you have any known allergies or medical conditions?",
    "Have you taken any medications recently?"
]

# Follow-up questions template
FOLLOW_UP_TEMPLATE = PromptTemplate(
    input_variables=["symptoms", "context"],
    template="Based on the patient's symptoms: {symptoms}, and the context: {context}, suggest 1-2 follow-up questions to better understand their condition."
)