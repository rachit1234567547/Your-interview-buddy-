import React, { useState, useEffect, useRef } from 'react';

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
      const response = await fetch('/api/hint', {
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
