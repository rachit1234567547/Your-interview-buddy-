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
