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
      const response = await fetch('/api/questions', {
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
      const response = await fetch('/api/evaluate', {
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
