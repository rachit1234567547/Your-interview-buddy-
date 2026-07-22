import React, { useState } from 'react';

export default function LandingView({ onStart }) {
  const [roleInput, setRoleInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(roleInput.trim());
  };

  const handleTagClick = (tag) => {
    onStart(tag);
  };

  return (
    <div className="landing-container fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Patented Platform Badge */}
        <div className="hero-badge-pill">
          <span className="badge-medal">🏆</span>
          <span className="badge-text">#1 Patented Interview Preparation Platform</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="hero-main-title">
          Turn Your Next Interview Into a <span className="highlight-purple">Job Offer</span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-subheadline">
          Get hired faster with 1:1 live coaching from MAANG+ & Fortune 500 experts, AI mock interviews and personalized feedback
        </p>

        {/* Preparation Form */}
        <div className="prep-container">
          <h3 className="prep-title">I'm prepping for a role in...</h3>
          <form onSubmit={handleSubmit} className="prep-form">
            <div className="prep-input-wrapper">
              <i className="fa-solid fa-magnifying-glass prep-search-icon"></i>
              <input
                type="text"
                placeholder="e.g. Product Management, Data Science..."
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                className="prep-input"
              />
              <button type="submit" className="prep-submit-btn">
                Get Started for Free <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>

          {/* Quick suggestions */}
          <div className="suggested-tags-container">
            {['Full Stack Development', 'Finance & Accounting', 'Supply Chain & Logistics', 'E-commerce Manager'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="tag-pill"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-item success-stories">
            <div className="avatar-group">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Alumni 1" className="avatar-img" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Alumni 2" className="avatar-img" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Alumni 3" className="avatar-img" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" alt="Alumni 4" className="avatar-img" />
            </div>
            <span className="stat-label-text"><strong>200K+</strong> Success Stories</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label-text"><strong>40+</strong> countries served</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label-text"><strong>4500+</strong> Experts</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-label-text"><span className="star-icon">⭐</span> <strong>4.8</strong> Average rating</span>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="features-section">
        <h2 className="section-title">What We Offer</h2>
        
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

      {/* Floating help widget */}
      <div className="floating-help-widget" onClick={() => onStart('')}>
        Need interview help? 👋
      </div>
    </div>
  );
}
