# StudyMind 🌸

StudyMind is an AI-powered study assistant that allows students to upload lecture notes as a PDF and ask questions about their own material.

Instead of sending an entire document directly to an AI model, StudyMind uses a retrieval-based pipeline to identify the sections of the lecture most relevant to a student's question before generating an answer.

## Features

- Upload lecture notes as PDF files
- Extract and process lecture text
- Split documents into overlapping text chunks
- Generate semantic embeddings using Sentence Transformers
- Retrieve the lecture sections most relevant to a question
- Generate answers grounded in the uploaded lecture material using Gemini
- Render structured AI responses with Markdown
- Handle invalid, unreadable and empty PDFs
- Retry temporary AI API failures
- Responsive multi-page React interface
- Loading, error and document-ready states

## How StudyMind Works

StudyMind follows a Retrieval-Augmented Generation (RAG) style pipeline:

```text
Lecture PDF
     ↓
Text extraction
     ↓
Overlapping text chunks
     ↓
Sentence Transformer embeddings
     ↓
Student question
     ↓
Semantic similarity search
     ↓
Top relevant lecture chunks
     ↓
Gemini + retrieved context
     ↓
Grounded answer
```

The uploaded PDF is first converted into text and divided into overlapping sections.

StudyMind uses the `all-MiniLM-L6-v2` Sentence Transformer model to create embeddings representing the semantic meaning of these sections.

When a student asks a question, an embedding is also generated for the question. Similarity is used to retrieve the lecture chunks most relevant to it.

Only this relevant context is supplied to Gemini along with the question, allowing StudyMind to generate an answer based on the student's lecture material.

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- React Markdown
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- pypdf
- Sentence Transformers
- Google Gemini API

## Interface

StudyMind uses a retro digital-notebook inspired interface with three main views:

- **Home** — introduces the application and workflow
- **Study** — contains the PDF upload and AI question-answer workspace
- **How it works** — explains the retrieval pipeline behind StudyMind

## Screenshots

### Home

_Add Home page screenshot here._

### Study Workspace

_Add Study page screenshot here._

### How It Works

_Add How It Works screenshot here._

## Project Structure

```text
studymind/
├── backend/
│   ├── llm.py
│   ├── main.py
│   ├── pdf_reader.py
│   ├── retriever.py
│   └── text_chunker.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Running StudyMind Locally

### 1. Clone the repository

```bash
git clone https://github.com/hessanq15/studymind.git
cd studymind
```

### 2. Create a Python virtual environment

```bash
python -m venv .venv
```

On Windows Command Prompt:

```cmd
.venv\Scripts\activate.bat
```

### 3. Install backend dependencies

Install the Python packages required by the backend:

```bash
pip install fastapi uvicorn python-multipart pypdf sentence-transformers python-dotenv google-genai
```

### 4. Configure Gemini

Create a `.env` file in the root of the project:

```text
GEMINI_API_KEY=your_api_key_here
```

The `.env` file is excluded from version control.

### 5. Start the backend

From the project root:

```bash
python -m uvicorn backend.main:app --reload
```

The FastAPI backend will run at:

```text
http://127.0.0.1:8000
```

### 6. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start the frontend

```bash
npm run dev
```

Then open the local Vite address shown in the terminal.

## Error Handling

StudyMind includes handling for several common failure cases, including:

- non-PDF uploads
- invalid or unreadable PDFs
- PDFs containing no extractable text
- empty questions
- questions submitted before a lecture is uploaded
- temporary Gemini API failures
- frontend loading and disabled states to prevent duplicate actions

## Current Limitations

StudyMind V1 stores the processed lecture and its embeddings in memory. Restarting the backend therefore clears the currently uploaded lecture.

The current PDF pipeline extracts embedded text and does not perform OCR on image-only or scanned documents.

The application currently supports one active lecture at a time.

These areas could be expanded in future versions with persistent storage, user accounts and document management.

## Future Improvements

Potential future additions include:

- user accounts
- saved lecture libraries
- persistent study sessions
- conversation history
- support for multiple documents
- OCR for scanned lecture notes
- flashcard and quiz generation

## What I Learned

Building StudyMind gave me practical experience with:

- designing a full-stack application
- building APIs with FastAPI
- connecting a React frontend to a Python backend
- extracting and processing PDF content
- semantic embeddings and similarity-based retrieval
- Retrieval-Augmented Generation concepts
- integrating an external LLM API
- asynchronous frontend requests
- API and UI error handling
- environment variables and API key security
- Git and GitHub development workflows

## Author

Built by **Hessa Nayab Qureshi**.