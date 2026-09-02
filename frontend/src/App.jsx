import { useState } from "react";
import "./App.css";

function App() {
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
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Could not upload the lecture.");
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
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error("StudyMind could not answer the question.");
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
        <div className="logo">
          <div className="logo-icon">S</div>
          <span>StudyMind</span>
        </div>

        <span className="nav-text">AI Study Assistant</span>
      </header>

      <main className="main-content">
        <section className="hero">
          <p className="eyebrow">STUDY SMARTER</p>
          <h1>Turn your lecture notes into answers.</h1>

          <p className="subtitle">
            Upload your lecture PDF and ask StudyMind anything about your notes.
          </p>
        </section>

        <section className="workspace">
          <div className="upload-card">
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
                  <span>Drop your lecture notes here or click to browse</span>
                </>
              )}

              <input
                type="file"
                accept=".pdf"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  setUploaded(false);
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
                  <div className="sparkle">✦</div>
                  <h3>StudyMind is thinking...</h3>
                  <p>Searching your lecture notes for the best answer.</p>
                </div>
              ) : answer ? (
                <div className="answer-content">
                  <p>{answer}</p>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="sparkle">✦</div>
                  <h3>Your answer will appear here</h3>
                  <p>
                    Ask a question and StudyMind will search your lecture notes
                    for the most relevant information.
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
                    : "Upload a lecture to start asking questions..."
                }
                value={question}
                disabled={!uploaded || asking}
                onChange={(event) => setQuestion(event.target.value)}
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
      </main>
    </div>
  );
}

export default App;