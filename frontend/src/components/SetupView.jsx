import React, { useState } from 'react';

const POPULAR_ROLES = [
  'Frontend Engineer',
  'Backend Engineer',
  'Fullstack Engineer',
  'Software Engineer (General)',
  'System Design Engineer',
  'Product Manager',
  'Data Scientist',
  'DevOps Engineer'
];

export default function SetupView({ onSubmit, onBack }) {
  const [role, setRole] = useState(POPULAR_ROLES[0]);
  const [customRole, setCustomRole] = useState('');
  const [experience, setExperience] = useState('Mid-level');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [questionCount, setQuestionCount] = useState(3);
  const [copilotMode, setCopilotMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRole = role === 'Custom' ? customRole : role;
    onSubmit({
      role: finalRole || 'Software Engineer',
      experience,
      jobDescription,
      resumeText,
      count: questionCount,
      copilotMode
    });
  };

  return (
    <div className="glass-panel fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
        Configure Your Interview Session
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Provide information about your target role and profile. We will build a customized mock interview for you.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Target Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              {POPULAR_ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
              <option value="Custom">Custom Role...</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Experience Level</label>
            <select className="form-select" value={experience} onChange={(e) => setExperience(e.target.value)}>
              <option value="Junior">Junior (0-2 years)</option>
              <option value="Mid-level">Mid-level (2-5 years)</option>
              <option value="Senior">Senior (5-8 years)</option>
              <option value="Principal">Lead / Staff / Principal (8+ years)</option>
            </select>
          </div>
        </div>

        {role === 'Custom' && (
          <div className="form-group fade-in">
            <label className="form-label">Enter Custom Role Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Mobile Developer, Security Specialist" 
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Job Description (Optional)</label>
          <textarea 
            className="form-textarea" 
            rows="4" 
            placeholder="Paste the job description here to customize questions for specific requirements..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Your Resume Summary / Skills (Optional)</label>
          <textarea 
            className="form-textarea" 
            rows="4" 
            placeholder="Paste your resume summary, project summaries, or key skills so the AI can ask tailored questions..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          ></textarea>
        </div>

        <div className="form-row" style={{ alignItems: 'center' }}>
          <div className="form-group">
            <label className="form-label">Number of Questions</label>
            <select className="form-select" value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))}>
              <option value={3}>3 Questions (Fast Practice)</option>
              <option value={5}>5 Questions (Standard Practice)</option>
              <option value={8}>8 Questions (Thorough Interview)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">&nbsp;</label>
            <div 
              className={`toggle-container ${copilotMode ? 'active' : ''}`}
              onClick={() => setCopilotMode(!copilotMode)}
            >
              <div className="toggle-switch"></div>
              <div className="toggle-info">
                <span className="toggle-title">Enable Copilot Mode</span>
                <span className="toggle-desc">Get real-time hints during the interview</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <button type="submit" className="btn btn-primary">
            Start Interview <i className="fa-solid fa-play"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

// Completed form validation checks.
