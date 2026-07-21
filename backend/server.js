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
