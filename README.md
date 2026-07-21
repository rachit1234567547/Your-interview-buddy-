# Your Interview Buddy
> **We will get you hired!**

Your Interview Buddy is an interactive, AI-powered mock interview simulator designed to help job seekers practice technical, behavioral, and system design questions. Built using React (Vite) and Node.js (Express), it integrates the Google Gemini API to deliver contextual feedback, real-time hints ("Copilot Mode"), and detailed performance scorecards.

---

## Key Features
- **Tailored Mock Sessions**: Questions generated dynamically based on target role, experience level, job description, and resume.
- **Voice Transcription**: Speak your answers natively using the browser's Web Speech API.
- **Copilot Mode**: Live AI hints to guide your answers if you get stuck.
- **Detailed Evaluation**: Metrics for technical accuracy, communication skill, and structure alongside ideal model answers.
- **Demo Fallback**: Fully interactive out of the box even without configuring an API key.

---

## Installation & Startup

1. **Provide your Gemini key** in [backend/.env](file:///c:/Users/rachi/Downloads/Spixo-Grocery-Delivery-WebApp-MERN--main/ai-interview-copilot/backend/.env) (optional):
   ```env
   GEMINI_API_KEY=your_key_here
   ```
2. **Install dependencies and launch** the application:
   ```bash
   npm run install-all
   npm run dev
   ```
3. **Open browser** and visit:
   👉 **[http://localhost:3000](http://localhost:3000)**

---

## Development History & Learnings

To see details about the challenges faced during development (e.g. dependency errors, logic updates, model migrations) and how they were resolved, read the **[Learnings & Troubleshooting Guide](file:///c:/Users/rachi/Downloads/Spixo-Grocery-Delivery-WebApp-MERN--main/ai-interview-copilot/LEARNINGS.md)**.
