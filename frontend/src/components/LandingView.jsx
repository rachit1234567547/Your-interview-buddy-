import React from 'react';

export default function LandingView({ onStart }) {
  return (
    <div className="hero-section fade-in">
      <img src="/logo.jpg" alt="Your Buddy" className="hero-avatar" />
      <div className="hero-badge">
        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Powered by Gemini LLM
      </div>
      <h1 className="hero-title">Your Interview Buddy</h1>
      <div className="hero-subtitle-tag">We will get you hired</div>
      <p className="hero-description">
        Practice interactive mock interviews tailored to your resume and target job descriptions. 
        Get real-time hints in Copilot Mode and detailed feedback cards with score analytics.
      </p>

