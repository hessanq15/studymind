from fastapi import FastAPI

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