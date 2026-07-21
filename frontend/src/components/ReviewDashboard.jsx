import React, { useState } from 'react';

export default function ReviewDashboard({ role, evaluation, onRestart }) {
  const { overallScore, categories, generalFeedback, detailedFeedback } = evaluation;
  const [expandedIndex, setExpandedIndex] = useState(0);

  const getScoreBadgeClass = (score) => {
    if (score >= 80) return 'transcript-score-badge high';
    if (score >= 50) return 'transcript-score-badge mid';
    return 'transcript-score-badge low';
  };

  const getScoreDescription = (score) => {
    if (score >= 85) return 'Excellent match - Outstanding performance';
    if (score >= 70) return 'Strong candidate - Good capability';
    if (score >= 50) return 'Needs minor improvement - Solid base';
    return 'Requires work - Key structural gaps';
  };

  // Convert categories object to a friendlier display array
  const categoryStats = [
    { title: 'Technical Accuracy', value: categories.technicalAccuracy || 0, icon: 'fa-code' },
    { title: 'Communication Skill', value: categories.communication || 0, icon: 'fa-comments' },
    { title: 'Answer Structure', value: categories.structure || 0, icon: 'fa-sitemap' }
  ];

  return (
    <div className="glass-panel fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Score Header */}
      <div className="review-header-section">
        <div className="overall-score-container">
          <div className="score-circle-wrapper">
            <div className="score-circle-bg"></div>
            {/* Dynamic visual representation of stroke-dasharray can be represented visually, or we can use standard progress overlays */}
            <div 
              className="score-circle-progress" 
              style={{
                transform: `rotate(${Math.min(360, (overallScore / 100) * 360 - 45)}deg)`
              }}
            ></div>
            <div className="score-value">{overallScore}</div>
          </div>
          <div className="score-meta">
            <h2>Evaluation Scorecard</h2>
            <p style={{ color: 'var(--accent)', fontWeight: '600' }}>{role}</p>
            <p style={{ fontSize: '0.85rem' }}>{getScoreDescription(overallScore)}</p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onRestart}>
