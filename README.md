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
Here is the complete, exhaustive list of **every tool, library, package, and service** used in the project, formatted in a detailed table:

| Category | Technology / Library | What It Is | Exact Purpose in the Project |
| :--- | :--- | :--- | :--- |
| **AI / LLM** | **Google Gemini 3.5 Flash** | Large Language Model (LLM) | The intelligence engine. Tailors questions based on CV/JD, generates live hints, evaluates responses, and provides ideal answers. |
| **AI / LLM** | **`@google/genai`** | Official modern Gemini Node SDK | Coordinates secure connection, structures prompt payloads, and handles API requests from the Express backend. |
| **AI / LLM** | **Google AI Studio** | Developer Key Console | Where you generate and manage the API keys required to authenticate and connect to the Gemini model. |
| **Backend** | **Node.js** | Server-side JavaScript runtime | The execution engine for the backend server, processing APIs, env configs, and static file hosting. |
| **Backend** | **Express (`express`)** | Web application framework | Creates the API server and configures routes (`/api/questions`, `/api/hint`, `/api/evaluate`) for React to fetch data. |
| **Backend** | **Cors (`cors`)** | Security header middleware | Enables cross-origin requests, allowing the Vite client (port 3000) to communicate with the API server (port 5000) locally. |
| **Backend** | **Dotenv (`dotenv`)** | Configuration loader | Reads settings from the hidden `.env` file and loads the `GEMINI_API_KEY` securely into memory. |
| **Backend** | **Nodemon (`nodemon`)** | Development watcher tool | Monitors backend files and automatically restarts the Node server whenever a code change is saved. |
| **Frontend** | **React (v18)** | UI rendering library | Manages UI views (Landing, Setup, Room, Dashboard), screen states, timers, inputs, and score states. |
| **Frontend** | **React DOM** | DOM rendering engine | Mounts and updates the React components inside the standard browser window. |
| **Frontend** | **Vite** | Bundler and dev server | Handles lightning-fast development serving, hot module replacement (HMR), and packages optimized production assets. |
| **Frontend** | **`@vitejs/plugin-react`** | Vite JSX compiler plugin | Transpiles React JSX file code into standard browser-readable JavaScript. |
| **UI & Styling**| **Vanilla CSS** | Styling language | Dictates layout, typography, glassmorphism blur filters, microphone ripple glows, and voice-wave keyframe animations. |
| **UI & Styling**| **Google Fonts** | Web font delivery service | Implements the **Outfit** font for sleek titles/headers and **Inter** font for clean body text and inputs. |
| **UI & Styling**| **FontAwesome** | Web icon pack | Displays interface icons like microphones, stopwatches, checkmarks, brain graphics, and exit arrows. |
| **UI & Styling**| **`logo.jpg`** | Custom branding image asset | Loaded as the professional suit-wearing puppy logo in the header and the animated welcome avatar on the Landing Page. |
| **Browser APIs**| **Web Speech API** | Native speech transcription | Captures user microphone audio and transcribes it into text in real-time inside the browser for voice inputs. |
| **Browser APIs**| **Fetch API** | Browser request client | Transmits frontend form payloads to the Express API endpoints and retrieves the server's AI responses. |
| **DevOps** | **Concurrently** | Process manager tool | Starts the backend Node server and frontend Vite client simultaneously in a single terminal session (`npm run dev`). |
| **DevOps** | **Git** | Version control system | Recorded a history of **41 incremental commits** mapping out the step-by-step construction of the codebase. |
| **DevOps** | **GitHub** | Online repository hosting | Stores the repository online to facilitate cloud deployment and codebase sharing. |
| **DevOps** | **Render** | Cloud hosting service | Hosts the unified web application, auto-compiles the assets on commit, and serves the live site to the internet. |
