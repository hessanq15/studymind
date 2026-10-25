import os
import numpy as np

from dotenv import load_dotenv
from google import genai


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def create_embeddings(chunks):
    embeddings = []

    for chunk in chunks:
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=chunk
        )

        embeddings.append(response.embeddings[0].values)

    return np.array(embeddings)


def find_relevant_chunks(question, chunks, embeddings, top_k=3):
    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=question
    )

    question_embedding = np.array(response.embeddings[0].values)

    similarities = embeddings @ question_embedding

    best_indexes = similarities.argsort()[::-1][:top_k]

    relevant_chunks = []

    for index in best_indexes:
        relevant_chunks.append(chunks[index])

    return relevant_chunks