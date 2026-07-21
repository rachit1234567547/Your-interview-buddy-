import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let ai = null;
let isDemoMode = false;

if (apiKey && apiKey.trim() !== '' && !apiKey.startsWith('your_gemini_api_key')) {
  try {
    ai = new GoogleGenAI({ apiKey });
    console.log('Gemini API successfully initialized.');
  } catch (error) {
    console.error('Failed to initialize GoogleGenAI client:', error.message);
    isDemoMode = true;
  }
} else {
  console.warn('================================================================');
  console.warn('  WARNING: GEMINI_API_KEY is not configured in backend/.env');
  console.warn('  Running in DEMO MODE with high-quality mock evaluation responses.');
  console.warn('================================================================');
  isDemoMode = true;
}

// Pre-defined mock data for Demo Mode
const DEMO_QUESTIONS = {
  frontend: [
    { id: 1, question: "Explain the Virtual DOM reconciliation process in React and how key prop optimizes list rendering.", type: "technical", context: "Essential for core frontend performance evaluation." },
    { id: 2, question: "How would you design the state management architecture and caching strategy for a large-scale real-time dashboard?", type: "system-design", context: "Evaluates scalability and data structure design on client-side." },
    { id: 3, question: "Describe a situation where you had to advocate for technical debt refactoring to a non-technical product owner. How did you handle it?", type: "behavioral", context: "Assesses cross-functional communication and persuasion skills." }
  ],
  backend: [
    { id: 1, question: "What is your approach to database indexing? Explain the differences between clustered and non-clustered indexes.", type: "technical", context: "Critical for database design and latency optimization." },
    { id: 2, question: "Design a URL shortening service like Bit.ly. Focus on API design, database schema, caching, and handling redirection redirection.", type: "system-design", context: "Evaluates distributed system design, caching, and scale estimation." },
    { id: 3, question: "Tell me about a time you introduced a major bug in production. What went wrong, how did you respond, and what did you implement to prevent recurrence?", type: "behavioral", context: "Evaluates post-mortem hygiene, accountability, and maturity." }
  ],
  general: [
    { id: 1, question: "Explain the difference between synchronous and asynchronous execution, and how event loops handle tasks.", type: "technical", context: "Verifies core programming fundamentals." },
    { id: 2, question: "How would you approach designing a rate-limiting middleware for a public-facing API gateway?", type: "system-design", context: "Evaluates system resilience, caching (Redis), and middleware architecture." },
    { id: 3, question: "Describe a project that had a major change in requirements halfway through. How did you adapt your implementation plan?", type: "behavioral", context: "Assesses adaptability and agile delivery skills." }
  ]
};

/**
 * Generates structured interview questions using Gemini LLM or Demo Mock.
 */
export async function generateQuestions({ role, experience, jobDescription, resumeText, count = 3 }) {
  if (isDemoMode) {
    console.log(`[DEMO MODE] Generating questions for: ${role} (${experience})`);
    
    // Choose appropriate mock set based on role text
    const roleLower = role.toLowerCase();
    let baseList = DEMO_QUESTIONS.general;
    if (roleLower.includes('front') || roleLower.includes('react') || roleLower.includes('ui')) {
      baseList = DEMO_QUESTIONS.frontend;
    } else if (roleLower.includes('back') || roleLower.includes('node') || roleLower.includes('db') || roleLower.includes('system')) {
      baseList = DEMO_QUESTIONS.backend;
    }

    // Map questions up to requested count
    const result = [];
    for (let i = 0; i < count; i++) {
      const template = baseList[i % baseList.length];
      result.push({
        id: i + 1,
        question: template.question,
        type: template.type,
        context: `Tailored for ${experience} ${role}. ${template.context}`
      });
    }
    return result;
  }

  const prompt = `
    You are an expert technical recruiter and interviewer.
    Generate a list of exactly ${count} interview questions for a candidate with the following details:
    - Target Role: ${role}
    - Experience Level: ${experience}
    - Job Description: ${jobDescription || 'Not provided'}
    - Candidate Resume Summary: ${resumeText || 'Not provided'}

    Please generate a mix of technical, behavioral, and system design questions tailored to their profile and the job description.
    
    You MUST respond with a valid JSON array of objects. Do not include markdown code block syntax (like \`\`\`json) in the response text itself, just raw JSON.
    Each object in the array must have the following schema:
    {
      "id": number (starting from 1),
      "question": "string (the actual question to ask)",
      "type": "string (either 'technical', 'behavioral', or 'system-design')",
      "context": "string (brief explanation of why this question is relevant based on their resume or the job description)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Error generating questions with Gemini:', error);
    throw new Error('Failed to generate interview questions: ' + error.message);
  }
}

/**
 * Generates a real-time hint for a candidate struggling with a question.
 */
export async function getHint({ question, history = [] }) {
  if (isDemoMode) {
    console.log(`[DEMO MODE] Fetching hint for question: ${question}`);
