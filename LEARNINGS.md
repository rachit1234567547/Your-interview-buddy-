# Project Learnings & Troubleshooting Guide

This document captures the key architectural learnings, technical challenges, and problem-solving steps encountered during the development of **Your Interview Buddy**.

---

## 1. Problem: Backend Dependency Resolution Failure (`@google/genai`)
- **Category**: Dependency Management
- **The Problem**: 
  When running the initial backend setup, `npm install` failed with an `ETARGET` error:
  ```bash
  npm error notarget No matching version found for @google/genai@^0.1.1.
  ```
  The version specified was too old or retired from the active npm registry.
- **The Analysis**: 
  Google's new unified JS/TS SDK (`@google/genai`) replaces the legacy `@google/generative-ai` SDK. However, versioning has evolved, and the actual active version of `@google/genai` is `2.12.0+`.
- **The Solution**: 
  Updated [backend/package.json](file:///c:/Users/rachi/Downloads/Spixo-Grocery-Delivery-WebApp-MERN--main/ai-interview-copilot/backend/package.json) to pull the `"latest"` tag (resolving to `2.12.0`), which downloaded the correct, production-ready module.

---

## 2. Problem: Empty Answer Yielded 50% Passing Score (Demo Mode)
- **Category**: Logic & Algorithmic Design
- **The Problem**: 
  When testing the application in Demo Mode (active when `GEMINI_API_KEY` is not set), users who submitted blank answers or clicked next without typing anything were awarded a score of `50%` on their scorecard.
- **The Analysis**: 
  The fallback evaluation code in `geminiService.js` contained conditional checks:
  ```javascript
  if (ansLength > 100) { score = 88; }
  else if (ansLength > 20) { score = 72; }
  ```
  If `ansLength` was `0`, the logic fell through these checks without modifying the default initialized value of `let score = 50;`.
- **The Solution**: 
  Refactored the grading conditional block in [backend/services/geminiService.js](file:///c:/Users/rachi/Downloads/Spixo-Grocery-Delivery-WebApp-MERN--main/ai-interview-copilot/backend/services/geminiService.js):
  ```javascript
  if (ansLength === 0) {
    score = 0;
    feedback = "No answer was provided...";
  } else if (ansLength <= 20) {
    score = 30; // penalty for too short answers
    feedback = "The response is extremely brief...";
  }
  ```
  This successfully graded blank answers as `0%` and short answers as `30%`, with coaching guidelines.

---

## 3. Problem: Gemini API 404 Model Retirement Error
- **Category**: Integration / API Lifecycle
- **The Problem**: 
  After entering a valid Gemini API Key, starting an interview yielded the following error alert:
  ```json
  {"error":{"code":404,"message":"This model models/gemini-2.5-flash is no longer available to new users. Please update your code to use a newer model for the latest features and improvements.","status":"NOT_FOUND"}}
  ```
- **The Analysis**: 
  Google AI Studio retired the legacy developer preview `gemini-2.5-flash` model family for new keys. The recommended default model for developer agentic and coding workflows is now `gemini-3.5-flash`.
- **The Solution**: 
  Performed a codebase refactoring to replace all references of `'gemini-2.5-flash'` with `'gemini-3.5-flash'` inside [backend/services/geminiService.js](file:///c:/Users/rachi/Downloads/Spixo-Grocery-Delivery-WebApp-MERN--main/ai-interview-copilot/backend/services/geminiService.js). The nodemon watcher automatically reloaded the server, and the API successfully initialized.

---

## Key Learnings
1. **Fallback/Demo Mode Design**: Providing a mock fallback mode when keys are missing creates a friction-free onboarding experience. Developers can test the entire interface and transcription logic without dealing with setup API key blockers first.
2. **Flexible API Models**: Restructuring APIs so that models are easily configurable (or dynamically fetched) prevents breaking changes when third-party cloud providers retire older model weights.
3. **Web Speech API Capabilities**: Using browser native `SpeechRecognition` provides a lightweight, cost-effective way to integrate voice-to-text without relying on costly external server-side translation modules.
