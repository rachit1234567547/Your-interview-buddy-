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
    return {
      hints: [
        "Structure your response by introducing the core concept before diving into code details.",
        "Talk about tradeoffs—for instance, memory overhead vs. execution speed or consistency vs. availability.",
        "Give a concrete real-world example from your past work showing how this applies."
      ]
    };
  }

  const conversationHistory = history.map(h => `${h.role === 'user' ? 'Candidate' : 'Interviewer'}: ${h.text}`).join('\n');

  const prompt = `
    You are an interview coach helper (Copilot).
    The candidate is currently trying to answer this question: "${question}"
    
    Here is the brief conversation history so far:
    ${conversationHistory || 'None'}

    Provide exactly 3 short, actionable, bulleted hints or talking points to help the candidate structure their thoughts.
    Keep the points brief (max 15 words per point) and highly tactical.
    Do not answer the question for them, just guide them on how to approach it.

    Respond with a valid JSON object. Do not include markdown code block syntax.
    The schema must be:
    {
      "hints": ["hint 1", "hint 2", "hint 3"]
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
    console.error('Error getting hint with Gemini:', error);
    throw new Error('Failed to get interview hint: ' + error.message);
  }
}

/**
 * Evaluates the full interview transcript and returns details, score card, and suggestions.
 */
export async function evaluateInterview({ role, questions, answers }) {
  if (isDemoMode) {
    console.log(`[DEMO MODE] Evaluating interview for role: ${role}`);
    
    const detailedFeedback = questions.map((q, idx) => {
      const ans = answers[idx] || '';
      const ansLength = ans.trim().length;
      let score = 50;
      let feedback = "No answer was provided. To improve, structure your responses explaining core technical details and concrete scenarios.";
      
      if (ansLength > 100) {
        score = 88;
        feedback = "Excellent response. You provided clear technical detail, demonstrated solid understanding of key concepts, and structured the answer effectively. To achieve 100%, elaborate slightly more on edge cases and scalability tradeoffs.";
      } else if (ansLength > 20) {
        score = 72;
        feedback = "Solid attempt. The answer touches on the main requirements but is a bit too brief. To improve, explain details more thoroughly (e.g. mention concrete API options, hooks, or specific design patterns).";
      }

      let modelAnswer = "For a high scoring answer, begin with a concise summary definition. Next, present the detailed mechanism (such as Virtual DOM diffing algorithm, database indexing structures like B-Trees, or specific metrics of the STAR method). Finally, discuss tradeoffs and state why this choice makes sense in a production setting.";
      if (q.type === 'behavioral') {
        modelAnswer = "To answer behavioral questions optimally, structure using the STAR framework: Describe the Situation (context), the Task (what you needed to do), your specific Action (the technical and collaborative steps you took), and the Result (quantifiable impacts, such as 'reduced latency by 30%', and learnings).";
      }

      return {
        questionNumber: idx + 1,
        question: q.question,
        answer: ans,
        score,
        feedback,
        modelAnswer
      };
    });

    const averageScore = Math.round(detailedFeedback.reduce((acc, item) => acc + item.score, 0) / questions.length);

    return {
      overallScore: averageScore,
      categories: {
        technicalAccuracy: Math.min(100, Math.round(averageScore * 1.05)),
        communication: Math.min(100, Math.round(averageScore * 0.98)),
        structure: Math.min(100, Math.round(averageScore * 0.95))
      },
      generalFeedback: `Demo Evaluation Summary:
This scorecard is generated in Demo Mode because GEMINI_API_KEY is not configured in backend/.env. 

Overall, the candidate demonstrates solid potential for the ${role} role. Communication was clear, and technical concepts were explained. Key strengths include logical structuring of arguments. Areas for development include exploring tradeoffs in more detail, addressing edge cases, and quantifying results in behavioral scenarios. To get real-time LLM grading, configure the GEMINI_API_KEY.`,
      detailedFeedback
    };
  }

  // Real LLM evaluation
  const QAData = questions.map((q, index) => ({
    questionNumber: index + 1,
    type: q.type,
    question: q.question,
    candidateAnswer: answers[index] || '(No response provided)'
  }));

  const prompt = `
    You are a senior hiring manager conducting a post-interview review for a candidate who applied for the role: "${role}".
    
    Evaluate the following interview transcript where the candidate responded to each question:
    ${JSON.stringify(QAData, null, 2)}

    Analyze each response for correctness, depth, communication style, and structured thinking (e.g., using STAR method for behavioral, scalability concepts for system design).
    Provide an overall score out of 100, score breakdowns for key categories (Technical Accuracy, Communication, Structure/Formatting), general feedback, and detailed feedback for each question including an ideal "model answer".

    You MUST respond with a valid JSON object. Do not include markdown code block syntax.
    The schema must be:
    {
      "overallScore": number (between 0 and 100),
      "categories": {
        "technicalAccuracy": number (0-100),
        "communication": number (0-100),
        "structure": number (0-100)
      },
      "generalFeedback": "string (overall summary of strengths, major weaknesses, and recommendations for improvement)",
      "detailedFeedback": [
        {
          "questionNumber": number,
          "question": "string",
          "answer": "string",
          "score": number (0-100),
          "feedback": "string (constructive analysis of their answer)",
          "modelAnswer": "string (a high-quality sample answer that would receive a 100 score)"
        }
      ]
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
    console.error('Error evaluating interview with Gemini:', error);
    throw new Error('Failed to evaluate interview: ' + error.message);
  }
}
