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

Here is the complete breakdown of the tech stack used in **Your Interview Buddy**, explaining what each tool does and its specific role in the application:

---

### 1. Frontend (The User Interface)

| Technology | What it is | What it is used for in the project |
| :--- | :--- | :--- |
| **React (v18)** | Component-based JS library | Manages the dynamic views (Landing Page, Setup Form, Interview Room, and Review Dashboard) and states (timer, question index, text inputs). |
| **Vite** | Next-generation frontend build tool | Serves as the bundler. It replaces heavy setups like Create React App with sub-second hot-reloading (HMR) and builds optimized production assets. |
| **Vanilla CSS** | Standard stylesheet language | Built a premium custom design system featuring HSL color schemes, glassmorphic blur overlays (`backdrop-filter`), timers warning animations, and micro-interactions. |
| **Web Speech API** | Native browser Speech Recognition | Translates the user's spoken words into written text. This allows users to dictate responses hands-free in the browser without paid transcription APIs. |
| **FontAwesome & Google Fonts** | Icon and web-font hosting libraries | Loads the **Outfit** (headings) and **Inter** (body) typography, and high-fidelity icons (microphone, stops, stopwatches, brainstorm brains). |

---

### 2. Backend (The Application Server)

| Technology | What it is | What it is used for in the project |
| :--- | :--- | :--- |
| **Node.js** | JavaScript runtime | Runs JavaScript code on the server side, allowing the backend to handle requests, connect to external APIs, and process interview structures. |
| **Express** | Minimalist web framework for Node | Exposes routing endpoints (like `/api/questions`, `/api/hint`, and `/api/evaluate`) that the React client contacts to exchange data. |
| **CORS** | Cross-Origin Resource Sharing | A security package that allows the React app (running on port 3000) to communicate with the Node server (running on port 5000) during local development. |
| **Dotenv** | Zero-dependency environment loader | Safely loads sensitive credentials (like the `GEMINI_API_KEY`) from a hidden `.env` file into `process.env` so they are never exposed to the frontend. |

---

### 3. AI & Core Logic

| Technology | What it is | What it is used for in the project |
| :--- | :--- | :--- |
| **Google Gemini API** | Advanced LLM Engine | The brain of the project. We use `gemini-3.5-flash` to dynamically formulate contextual questions, generate hint talking points, and compute scorecards. |
| **`@google/genai`** | Official modern Gemini SDK | Google's official Node SDK. It manages the connection handshake, prompts payloads, and configures JSON schemas for reliable output formats. |
| **Demo Mode Fallback** | Custom server-side grading algorithms | A built-in code handler that catches empty/missing API keys, warning the logs and utilizing length-based mock scoring so the site works right out of the box. |

---

### 4. Development & Orchestration

| Technology | What it is | What it is used for in the project |
| :--- | :--- | :--- |
| **Concurrently** | CLI utility tool | Runs the Vite dev server and Node Express API server at the same time in a single terminal session (`npm run dev`). |
| **Git & GitHub** | Version control & repository hosting | Tracks changes incrementally across **41 distinct commits** and hosts the code online for Render's pipeline to automatically deploy. |
| **Render** | Cloud hosting platform | Deploys the unified application as a single web service. It compiles the React bundle on pull and runs the Node backend to serve the live site. |
