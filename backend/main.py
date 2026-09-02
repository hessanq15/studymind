from fastapi import FastAPI, UploadFile, File, HTTPException

from backend.pdf_reader import extract_text_from_pdf

from backend.text_chunker import chunk_text

app = FastAPI(
    title="StudyMind API",
    description="Backend API for the StudyMind AI study assistant",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "name": "StudyMind",
        "message": "AI-powered study assistant",
        "status": "running"
    }

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    text = extract_text_from_pdf(file.file)
    chunks = chunk_text(text)

    return {
        "filename": file.filename,
        "characters": len(text),
        "chunks": len(chunks)
    }

    