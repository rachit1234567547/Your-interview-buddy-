import React from 'react';

export default function LandingView({ onStart }) {
  return (
    <div className="hero-section fade-in">
      <img src="/logo.jpg" alt="Your Buddy" className="hero-avatar" />
      <h1 className="hero-title">Your Interview Buddy</h1>
      <div className="hero-subtitle-tag">We will get you hired</div>
      <p className="hero-description">
        Get ready for your dream job with friendly, real-time practice interviews. We'll tailor questions to your unique experience, give you helpful hints when you're stuck, and provide a detailed review of your answers so you can walk in with confidence.
      </p>

      <button className="btn btn-primary btn-lg" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }} onClick={onStart}>
        Start Practicing Free <i className="fa-solid fa-arrow-right"></i>
      </button>

      <h2 style={{ fontSize: '1.75rem', marginTop: '4rem', color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-heading)' }}>What We Offer</h2>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <i className="fa-solid fa-user-astronaut"></i>
          </div>
          <h3>Dynamic Question Engine</h3>
          <p>Questions are dynamically tailored specifically to your background, resume details, and job descriptions.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <i className="fa-solid fa-headset"></i>
          </div>
          <h3>Speech & Text Input</h3>
          <p>Answer naturally using your voice with built-in Speech-to-Text, or type out structured details.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <i className="fa-solid fa-lightbulb"></i>
          </div>
          <h3>Real-time Copilot Hints</h3>
          <p>Get guided bullet points and structure cues if you get stuck on a tough question during the interview.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <i className="fa-solid fa-chart-pie"></i>
          </div>
          <h3>Analytical Review</h3>
          <p>Review comprehensive scoreboards grading your communication skill, technical accuracy, and answers structure.</p>
        </div>
      </div>
    </div>
  );
}
