from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embeddings(chunks):
    embeddings = model.encode(chunks)
    return embeddings


def find_relevant_chunks(question, chunks, embeddings, top_k=3):
    question_embedding = model.encode(question)

    similarities = model.similarity(question_embedding, embeddings)[0]

    best_indexes = similarities.argsort(descending=True)[:top_k]

    relevant_chunks = []

    for index in best_indexes:
        relevant_chunks.append(chunks[index.item()])

    return relevant_chunks