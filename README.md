# StudyMind 🌸

## Live Demo

🌸 **Try StudyMind:** [Open the live application](https://studymind-frontend-rugg.onrender.com)

> The backend is hosted on Render's free tier, so the first request may take a short time while the service wakes up.

StudyMind is an AI-powered study assistant that allows students to upload lecture PDFs and ask questions about their own course material.

Rather than answering from general knowledge, StudyMind retrieves relevant sections from the uploaded lecture notes and provides them to Gemini as context, helping keep answers grounded in the student's own material.

## Features

- Upload lecture notes as PDF files
- Extract and split lecture text into overlapping chunks
- Generate embeddings for semantic search
- Retrieve lecture sections relevant to a student's question
- Generate AI answers grounded in the uploaded lecture material
- Display structured AI responses using Markdown
- Multi-page React interface
- Loading, validation and API error handling
- Deployed frontend and backend

## Interface

### Home

![StudyMind home page](/screenshots/home.png)

### Study Workspace
Upload lecture notes and ask questions grounded in the uploaded material.

![StudyMind study workspace (/screenshots/study.png)

### How It Works
StudyMind includes an overview of the retrieval pipeline behind the application.

![StudyMind how it works page](/screenshots/how-it-works.png)

## How It Works

StudyMind uses a retrieval-augmented generation (RAG) pipeline:

1. **PDF Extraction** - Text is extracted from the uploaded lecture PDF.
2. **Chunking** - The lecture is divided into smaller overlapping sections.
3. **Embeddings** - Embeddings represent the meaning of the lecture chunks.
4. **Retrieval** - StudyMind finds the chunks most relevant to the student's question.
5. **Generation** - The relevant lecture context and question are sent to Gemini to generate an answer.

### RAG Pipeline

PDF  
↓  
Text Extraction  
↓  
Overlapping Chunks  
↓  
Embeddings  
↓  
Semantic Retrieval  
↓  
Relevant Lecture Context  
↓  
Gemini  
↓  
Answer

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- React Markdown
- CSS

### Backend
- Python
- FastAPI
- Gemini API
- pypdf

### Tools & Deployment
- Git
- GitHub
- Render

## Project Structure

    studymind/
    ├── backend/
    │   ├── llm.py
    │   ├── main.py
    │   ├── pdf_reader.py
    │   ├── retriever.py
    │   └── text_chunker.py
    ├── frontend/
    │   └── src/
    │       ├── App.jsx
    │       ├── App.css
    │       └── index.css
    └── README.md

## Running Locally

### Backend

Create and activate a Python virtual environment and install the required dependencies.

Create a `.env` file in the project root and add your Gemini API key:

    GEMINI_API_KEY=your_api_key

Run the FastAPI backend:

    python -m uvicorn backend.main:app --reload

The backend will run locally on port 8000.

### Frontend

Open a second terminal and move into the frontend directory:

    cd frontend

Install the dependencies:

    npm install

Start the development server:

    npm run dev

The frontend will run locally using Vite.

## What I Learned

Building StudyMind gave me practical experience with:

- Building and connecting a React frontend and FastAPI backend
- Designing a retrieval pipeline for document-based question answering
- Working with embeddings and semantic similarity
- Integrating an external LLM API
- Handling API failures and user-facing errors
- Managing environment variables and API keys securely
- Deploying a full-stack AI application
- Using Git and GitHub throughout development

## Future Improvements

StudyMind's current version focuses on its core RAG functionality. Future additions could include:

- User accounts
- Saved lectures and study sessions
- Multiple document support
- Flashcard generation
- Quiz generation
- Conversation history
- Improved document management and retrieval

## Author

Built by Hessa Nayab Qureshi.