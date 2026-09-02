import os
import time

from dotenv import load_dotenv
from google import genai


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(question, relevant_chunks):
    context = "\n\n".join(relevant_chunks)

    prompt = f"""
You are StudyMind, an AI study assistant.

Answer the student's question using only the lecture notes provided below.
If the answer cannot be found in the lecture notes, say that the lecture
notes do not contain enough information to answer the question.

LECTURE NOTES:
{context}

STUDENT QUESTION:
{question}

Give a clear and concise answer suitable for a university student.
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.7-flash",
                contents=prompt
            )

            return response.text

        except Exception as error:
            if attempt == 2:
                raise error

            time.sleep(2)