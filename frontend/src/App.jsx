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

