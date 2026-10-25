import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {

  const [page, setPage] = useState("home");
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState("");

  // Sends the selected PDF to FastAPI
  const uploadLecture = async () => {
    if (!file) return;

    setUploading(true);
    setError("");
    setUploaded(false);
    setAnswer("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://studymind-e27a.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Could not upload the lecture.");
      }

      await response.json();
      setUploaded(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Sends the student's question to FastAPI
  const askQuestion = async () => {
    if (!question.trim() || !uploaded) return;

    setAsking(true);
    setError("");
    setAnswer("");

    try {
      
      const response = await fetch("https://studymind-e27a.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "StudyMind could not answer the question."
        );
        
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setAsking(false);
    }
  };

return (
  <div className="app">
    <header className="navbar">
      <button className="brand" onClick={() => setPage("home")}>
        <span className="logo-icon">S</span>
        <span>StudyMind</span>
      </button>

      <nav className="nav-links">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "study" ? "active" : ""}
          onClick={() => setPage("study")}
        >
          Study
        </button>

        <button
          className={page === "about" ? "active" : ""}
          onClick={() => setPage("about")}
        >
          How it works
        </button>
      </nav>
    </header>

    <main className="main-content">

      {page === "home" && (
        <section className="home-page">
          <div className="retro-label">STUDYMIND.EXE ✿</div>

          <div className="home-grid">
            <div className="home-copy">
              <p className="eyebrow">YOUR DIGITAL STUDY SPACE</p>

              <h1>
                Your lecture notes,
                <br />
                made easier.
              </h1>

              <p className="subtitle">
                Upload your lecture notes and ask questions using an
                AI assistant that searches your own material for answers.
              </p>

              <button
                className="primary-button home-button"
                onClick={() => setPage("study")}
              >
                Start studying →
              </button>
            </div>

            <div className="notebook-card">
              <div className="window-bar">
                <span>studymind.txt</span>
                <span>○ □ ×</span>
              </div>

              <div className="notebook-content">
                <p className="note-title">today's study plan ♡</p>

                <p>☐ upload lecture notes</p>
                <p>☐ ask StudyMind a question</p>
                <p>☐ understand, don't memorise</p>

                <div className="little-note">
                  ✿ powered by your own lecture material
                </div>
              </div>
            </div>
          </div>

          <div className="home-features">
            <div>
              <span>01</span>
              <h3>Upload</h3>
              <p>Add your lecture PDF.</p>
            </div>

            <div>
              <span>02</span>
              <h3>Search</h3>
              <p>StudyMind finds the most relevant sections.</p>
            </div>

            <div>
              <span>03</span>
              <h3>Understand</h3>
              <p>Get a clear answer grounded in your notes.</p>
            </div>
          </div>
        </section>
      )}

      {page === "study" && (
        <section className="study-page">
          <div className="page-heading">
            <p className="eyebrow">STUDY WORKSPACE</p>
            <h1>Ask your lecture notes.</h1>
            <p className="subtitle">
              Upload a PDF, then ask StudyMind anything about it.
            </p>
          </div>

          <section className="workspace">
            <div className="upload-card">
              <div className="window-bar">
                <span>lecture.pdf</span>
                <span>○ □ ×</span>
              </div>

              <div className="card-heading">
                <div>
                  <p className="step">STEP 1</p>
                  <h2>Upload your lecture</h2>
                </div>
              </div>

              <label className="upload-box">
                <div className="upload-icon">↑</div>

                {file ? (
                  <>
                    <strong>{file.name}</strong>
                    <span>Ready to upload</span>
                  </>
                ) : (
                  <>
                    <strong>Choose a PDF</strong>
                    <span>Click to browse your lecture notes</span>
                  </>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                    setUploaded(false);
                    setQuestion("");
                    setAnswer("");
                    setError("");
                  }}
                />
              </label>

              <button
                className="primary-button"
                disabled={!file || uploading}
                onClick={uploadLecture}
              >
                {uploading
                  ? "Processing lecture..."
                  : uploaded
                    ? "Lecture ready ✓"
                    : "Upload lecture"}
              </button>
            </div>

            <div className="ask-card">
              <div className="window-bar">
                <span>assistant.exe</span>
                <span>○ □ ×</span>
              </div>

              <div className="card-heading">
                <div>
                  <p className="step">STEP 2</p>
                  <h2>Ask StudyMind</h2>
                </div>

                <span className={uploaded ? "status ready" : "status"}>
                  {uploaded ? "Lecture ready" : "Upload first"}
                </span>
              </div>

              <div className="answer-area">
                {asking ? (
                  <div className="empty-state">
                    <div className="sparkle">✿</div>
                    <h3>StudyMind is thinking...</h3>
                    <p>Searching your lecture notes.</p>
                  </div>
                ) : answer ? (
                  <div className="answer-content">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="sparkle">✿</div>
                    <h3>Your answer will appear here</h3>
                    <p>
                      Ask a question and StudyMind will search your notes for
                      relevant information.
                    </p>
                  </div>
                )}
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="question-area">
                <textarea
                  placeholder={
                    uploaded
                      ? "Ask something about your lecture..."
                      : "Upload a lecture to start..."
                  }
                  value={question}
                  disabled={!uploaded || asking}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      askQuestion();
                    }
                  }}
                />

                <button
                  className="ask-button"
                  disabled={!uploaded || !question.trim() || asking}
                  onClick={askQuestion}
                >
                  {asking ? "Thinking..." : "Ask →"}
                </button>
              </div>
            </div>
          </section>
        </section>
      )}

      {page === "about" && (
        <section className="about-page">
          <div className="page-heading">
            <p className="eyebrow">BEHIND STUDYMIND</p>
            <h1>How does it work?</h1>
            <p className="subtitle">
              StudyMind uses retrieval-augmented generation to answer questions
              using your lecture material.
            </p>
          </div>

          <div className="pipeline">
            <div className="pipeline-card">
              <span>01</span>
              <h3>PDF</h3>
              <p>Your lecture text is extracted from the uploaded document.</p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-card">
              <span>02</span>
              <h3>Chunks</h3>
              <p>The lecture is divided into smaller overlapping sections.</p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-card">
              <span>03</span>
              <h3>Embeddings</h3>
              <p>Sentence Transformers converts the text into embeddings.</p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-card">
              <span>04</span>
              <h3>Retrieval</h3>
              <p>The sections most relevant to your question are retrieved.</p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-card">
              <span>05</span>
              <h3>Answer</h3>
              <p>Gemini answers using the retrieved lecture context.</p>
            </div>
          </div>

          <div className="tech-note">
            <div className="window-bar">
              <span>about_studymind.txt</span>
              <span>○ □ ×</span>
            </div>

            <p>
              Built with React, FastAPI, Sentence Transformers and Gemini.
              StudyMind keeps its answers grounded in the material supplied by
              the student rather than treating the model as the source of the
              lecture content.
            </p>
          </div>
        </section>
      )}

    </main>
  </div>
);
}
export default App;