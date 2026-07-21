import React, { useState, useEffect, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function InterviewRoom({ questions, copilotMode, onSubmitInterview, onEndInterview }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [hints, setHints] = useState([]);
  const [loadingHint, setLoadingHint] = useState(false);
  
  // Timer State
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Speech Recognition State
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const activeQuestion = questions[currentIdx];

  // Reset answer input and hints when active question changes
  useEffect(() => {
    setCurrentAnswer(answers[currentIdx] || '');
    setHints([]);
  }, [currentIdx, answers]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
          }
        }
        if (transcript) {
          setCurrentAnswer(prev => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + transcript);
        }
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    } else {
      console.warn('Web Speech API is not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Toggle Recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser. Please use Chrome, Edge, or type your answer manually.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
      }
    }
  };

  // Fetch AI Hint from backend
  const fetchHint = async () => {
    if (loadingHint) return;
    setLoadingHint(true);
    try {
      const response = await fetch(`${API_BASE}/api/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: activeQuestion.question,
          history: [] // Can feed current transcript context if desired
        })
      });
      const data = await response.json();
      if (data.hints) {
        setHints(data.hints);
      } else {
        setHints(['Try structuring your answer with context, your actions, and results.', 'Explain the technical tradeoffs.']);
      }
    } catch (error) {
      console.error('Error loading hint:', error);
      setHints(['Could not load dynamic hints. Try focusing on the STAR method or design tradeoffs.']);
    } finally {
      setLoadingHint(false);
    }
  };

  const handleNext = () => {
    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentIdx] = currentAnswer.trim();
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      onSubmitInterview(newAnswers);
    }
  };

  const handleSkip = () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    const newAnswers = [...answers];
    newAnswers[currentIdx] = ''; // empty answer
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      onSubmitInterview(newAnswers);
    }
  };

  const handleEndEarly = () => {
    if (confirm('Are you sure you want to end the interview early? Only submitted answers will be graded.')) {
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
      }
      const newAnswers = [...answers];
      newAnswers[currentIdx] = currentAnswer.trim();
      onSubmitInterview(newAnswers);
    }
  };

  const getBadgeClass = (type) => {
    if (type === 'system-design') return 'question-type-badge system-design';
    if (type === 'behavioral') return 'question-type-badge behavioral';
    return 'question-type-badge';
  };

  return (
    <div className="interview-layout fade-in">
      {/* Question & Answer Area */}
      <div className="glass-panel question-panel">
        <div className="room-header">
          <div className="room-title">
            <i className="fa-solid fa-microphone-lines"></i> Interactive Session
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="timer-container">
              <i className="fa-solid fa-stopwatch"></i> {formatTime(elapsedTime)}
            </div>
            <div className="progress-pill">
              Question {currentIdx + 1} of {questions.length}
            </div>
          </div>
        </div>

        <div className="question-box">
          <span className={getBadgeClass(activeQuestion.type)}>
            {activeQuestion.type}
          </span>
          <h3 className="question-text">{activeQuestion.question}</h3>
          {activeQuestion.context && (
            <p className="question-context">
              <i className="fa-solid fa-info-circle"></i> Context: {activeQuestion.context}
            </p>
          )}
        </div>

        {/* Speech input simulator & display */}
        <div className={`speech-visualizer-container ${isRecording ? 'recording' : ''}`}>
          <div className="mic-btn-wrapper">
            <button className={`mic-btn ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
              {isRecording ? <i className="fa-solid fa-stop"></i> : <i className="fa-solid fa-microphone"></i>}
            </button>
            {isRecording && <div className="pulse-ring"></div>}
          </div>
          <div className="visualizer-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <span className="status-text" style={{ color: isRecording ? 'var(--danger)' : 'var(--text-secondary)' }}>
            {isRecording ? 'Listening... Speak now.' : 'Click mic to speak answer, or type below.'}
          </span>
        </div>

        {/* Text Input Area */}
        <div className="form-group">
          <label className="form-label">Your Response</label>
          <textarea
            className="form-textarea"
            rows="6"
            placeholder="Type or dictate your response here..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          ></textarea>
        </div>

        {/* Navigation Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button className="btn btn-secondary btn-danger" onClick={handleEndEarly}>
            <i className="fa-solid fa-circle-xmark"></i> End Interview
          </button>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={handleSkip}>
              Skip Question
            </button>
            <button className="btn btn-primary" onClick={handleNext} disabled={!currentAnswer.trim()}>
              {currentIdx === questions.length - 1 ? 'Finish Interview' : 'Submit & Next'} <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Copilot Mode Panel */}
      {copilotMode && (
        <div className="glass-panel copilot-panel">
          <div className="copilot-header">
            <i className="fa-solid fa-lightbulb"></i>
            <h3>Copilot Panel</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Having trouble? Get dynamic hints tailored to the current question context.
          </p>

          {hints.length > 0 ? (
            <div className="hint-list">
              {hints.map((hint, idx) => (
                <div className="hint-item" key={idx}>
                  <i className="fa-solid fa-circle-check hint-bullet"></i>
                  <span>{hint}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="copilot-empty">
              <span>No hints requested yet.</span>
            </div>
          )}

          <button 
            className="btn btn-secondary" 
            style={{ borderColor: 'rgba(6, 182, 212, 0.3)', color: 'var(--accent)', display: 'flex', gap: '0.5rem', width: '100%', marginTop: 'auto' }}
            onClick={fetchHint}
            disabled={loadingHint}
          >
            {loadingHint ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Getting hint...
              </>
            ) : (
              <>
                <i className="fa-solid fa-lightbulb"></i> Get Copilot Hint
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
