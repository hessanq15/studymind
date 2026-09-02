from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel

from backend.pdf_reader import extract_text_from_pdf
from backend.text_chunker import chunk_text
from backend.retriever import create_embeddings, find_relevant_chunks
from backend.llm import generate_answer


app = FastAPI(
    title="StudyMind API",
    description="Backend API for the StudyMind AI study assistant",
    version="1.0.0"
)


# These will temporarily store the uploaded lecture
lecture_chunks = []
lecture_embeddings = None


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "name": "StudyMind",
        "message": "AI-powered study assistant",
        "status": "running"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global lecture_chunks, lecture_embeddings

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    text = extract_text_from_pdf(file.file)

    lecture_chunks = chunk_text(text)

    lecture_embeddings = create_embeddings(lecture_chunks)

    return {
        "filename": file.filename,
        "characters": len(text),
        "chunks": len(lecture_chunks),
        "message": "Lecture uploaded successfully"
    }


@app.post("/ask")
def ask_question(request: QuestionRequest):
    if lecture_embeddings is None:
        raise HTTPException(
            status_code=400,
            detail="Upload a lecture PDF first"
        )

    relevant_chunks = find_relevant_chunks(
    request.question,
    lecture_chunks,
    lecture_embeddings
    )
    
    answer = generate_answer(
    request.question,
    relevant_chunks
    )
    
    return {
    "question": request.question,
    "answer": answer
    }