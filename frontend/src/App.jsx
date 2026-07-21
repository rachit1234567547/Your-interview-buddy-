import React, { useState } from 'react';
import LandingView from './components/LandingView';
import SetupView from './components/SetupView';
import InterviewRoom from './components/InterviewRoom';
import ReviewDashboard from './components/ReviewDashboard';

const VIEWS = {
  LANDING: 'LANDING',
  SETUP: 'SETUP',
  INTERVIEW: 'INTERVIEW',
  REPORT: 'REPORT'
};

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.LANDING);
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [copilotMode, setCopilotMode] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  
  // Loading State
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Starts the interview by requesting questions from the backend
  const handleStartInterview = async (setupData) => {
    setLoading(true);
    setLoadingText('Analyzing profile & generating customized questions...');
    setRole(setupData.role);
    setExperience(setupData.experience);
    setCopilotMode(setupData.copilotMode);

    try {
      const response = await fetch(`${API_BASE}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: setupData.role,
          experience: setupData.experience,
          jobDescription: setupData.jobDescription,
          resumeText: setupData.resumeText,
          count: setupData.count
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate interview questions.');
      }

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentView(VIEWS.INTERVIEW);
      } else {
        throw new Error('No questions were returned from the engine.');
      }
    } catch (err) {
      alert(`Initialization Error: ${err.message}\n\nPlease ensure your backend is running and the Gemini API key is configured correctly.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submits the responses to get an evaluation scorecard
  const handleSubmitInterview = async (finalAnswers) => {
    setLoading(true);
    setLoadingText('Evaluating your responses and preparing detailed scorecards...');
    setAnswers(finalAnswers);

    try {
      const response = await fetch(`${API_BASE}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          questions,
          answers: finalAnswers
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Evaluation processing failed.');
      }

      if (data.evaluation) {
        setEvaluation(data.evaluation);
        setCurrentView(VIEWS.REPORT);
      } else {
        throw new Error('Evaluation report card could not be generated.');
      }
    } catch (err) {
      alert(`Evaluation Error: ${err.message}\n\nPlease ensure the backend is active.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers
  const handleRestart = () => {
    setRole('');
    setExperience('');
    setQuestions([]);
    setAnswers([]);
    setEvaluation(null);
    setCurrentView(VIEWS.LANDING);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-container" onClick={handleRestart}>
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
          <div className="logo-text-wrapper">
            <span className="logo-text">Your Interview Buddy</span>
            <span className="logo-subtitle">We will get you hired</span>
          </div>
        </div>
        <div className="nav-actions">
          {currentView === VIEWS.INTERVIEW && (
            <button className="btn btn-secondary" onClick={handleRestart} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <i className="fa-solid fa-arrow-left-long"></i> Leave Room
            </button>
          )}
          {currentView === VIEWS.REPORT && (
            <button className="btn btn-primary" onClick={handleRestart} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              New Session
            </button>
          )}
        </div>
      </header>

      {/* Main View Container */}
      <main className="main-content">
        {currentView === VIEWS.LANDING && (
          <LandingView onStart={() => setCurrentView(VIEWS.SETUP)} />
        )}

        {currentView === VIEWS.SETUP && (
          <SetupView 
            onSubmit={handleStartInterview} 
            onBack={() => setCurrentView(VIEWS.LANDING)} 
          />
        )}

        {currentView === VIEWS.INTERVIEW && (
          <InterviewRoom 
            questions={questions}
            copilotMode={copilotMode}
            onSubmitInterview={handleSubmitInterview}
            onEndInterview={handleRestart}
          />
        )}

        {currentView === VIEWS.REPORT && evaluation && (
          <ReviewDashboard 
            role={role}
            evaluation={evaluation}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Full-screen Loading Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
          <span className="loader-text">{loadingText}</span>
        </div>
      )}
    </div>
  );
}
