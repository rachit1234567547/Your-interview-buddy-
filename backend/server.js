import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateQuestions, getHint, evaluateInterview } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests, specifically allowing local development origins
app.use(cors({
  origin: '*', // We can restrict this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Interview Copilot Backend is running.' });
});

// Endpoint to generate questions
app.post('/api/questions', async (req, res) => {
  const { role, experience, jobDescription, resumeText, count } = req.body;

  if (!role || !experience) {
    return res.status(400).json({ error: 'Role and Experience level are required fields.' });
  }

  try {
    const questions = await generateQuestions({ role, experience, jobDescription, resumeText, count });
    res.json({ questions });
  } catch (error) {
    console.error('Error in /api/questions:', error);
    res.status(500).json({ error: error.message || 'An error occurred while generating questions.' });
  }
});

// Endpoint to get a hint
app.post('/api/hint', async (req, res) => {
  const { question, history } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required to get a hint.' });
  }

  try {
    const hintData = await getHint({ question, history });
    res.json(hintData);
  } catch (error) {
    console.error('Error in /api/hint:', error);
    res.status(500).json({ error: error.message || 'An error occurred while generating hint.' });
  }
});

// Endpoint to evaluate the entire interview
app.post('/api/evaluate', async (req, res) => {
  const { role, questions, answers } = req.body;

  if (!role || !questions || !answers) {
    return res.status(400).json({ error: 'Role, questions, and candidate answers are required for evaluation.' });
  }

  try {
    const evaluation = await evaluateInterview({ role, questions, answers });
    res.json({ evaluation });
  } catch (error) {
    console.error('Error in /api/evaluate:', error);
    res.status(500).json({ error: error.message || 'An error occurred while evaluating the interview.' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  AI Interview Copilot Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});

// Checked server logging output formatting.
