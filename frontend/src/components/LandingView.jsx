import React, { useState } from 'react';

export default function LandingView({ onStart }) {
  const [roleInput, setRoleInput] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
    setCheckoutSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    setCheckoutSuccess(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutSuccess(true);
  };

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
        {/* Puppy Avatar */}
        <img src="/logo.jpg" alt="Your Buddy" className="hero-avatar" />

        {/* Patented Platform Badge */}
        <div className="hero-badge-pill">
          <span className="badge-medal">🏆</span>
          <span className="badge-text">#1 Patented Interview Preparation Platform</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="hero-main-title">
          Next Time You're in an Interview, <span className="highlight-accent">Crack It!</span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-subheadline">
          Get hired faster with friendly, real-time AI mock interviews, live coaching cues, and detailed scorecard reviews.
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

      {/* Why Us Section */}
      <div className="why-us-section">
        <h2 className="section-title" style={{ marginBottom: '-0.5rem' }}>Why Choose Us?</h2>
        <p className="section-subtitle">We don't just mock interviews. We teach you how to excel in them.</p>
        
        <div className="why-us-grid">
          <div className="why-us-card">
            <div className="why-us-icon">
              <i className="fa-solid fa-award"></i>
            </div>
            <div className="why-us-content">
              <h3>Tailored AI Mock Simulations</h3>
              <p>Our dynamic generation engine uses your target role, experience level, job description, and resume to build highly customized, ultra-realistic questions.</p>
            </div>
          </div>

          <div className="why-us-card">
            <div className="why-us-icon">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div className="why-us-content">
              <h3>Real-time Guided Hints</h3>
              <p>Enable Copilot Mode to receive guided hints and bullet points during the interview, helping you learn the structure of excellent answers.</p>
            </div>
          </div>

          <div className="why-us-card">
            <div className="why-us-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div className="why-us-content">
              <h3>Actionable Feedback Scorecards</h3>
              <p>Get detailed reports scoring your technical precision, behavioral structure, and tone, along with model answers for self-study.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials/Reviews Section */}
      <div className="reviews-section">
        <h2 className="section-title">Success Stories from Our Candidates</h2>
        <p className="section-subtitle">Join thousands of software engineers, product managers, and specialists who landed their dream offers.</p>
        
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-rating">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"The real-time copilot hints were a game-changer! I used to freeze during difficult technical questions. Practicing with Your Interview Buddy built my muscle memory so I was calm and structured in my actual Google interview."</p>
            <div className="review-author">
              <div className="author-avatar">S</div>
              <div className="author-info">
                <h4>Siddharth Sharma</h4>
                <p>Software Engineer @ Google</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-rating">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"I absolutely loved the detailed scorecard feedback! It gave me actionable suggestions on structural improvement and communication flow, which helped me secure 3 offers in two weeks."</p>
            <div className="review-author">
              <div className="author-avatar">E</div>
              <div className="author-info">
                <h4>Emily Chen</h4>
                <p>Senior Product Manager @ Amazon</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-rating">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"As a self-taught engineer, behavioral questions were my weakest link. Having the AI grade my response accuracy and communication tone helped me clear the interviews with confidence."</p>
            <div className="review-author">
              <div className="author-avatar">M</div>
              <div className="author-info">
                <h4>Marcus Vance</h4>
                <p>Full-stack Developer @ Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pricing-section">
        <h2 className="section-title">Transparent, Simple Pricing</h2>
        <p className="section-subtitle">Choose the perfect plan to prepare for your next career jump.</p>
        
        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Basic</h3>
              <p>Perfect for a quick refresher before an interview.</p>
            </div>
            <div>
              <div className="pricing-card-price">Free</div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-circle-check"></i> 3 questions per session</li>
                <li><i className="fa-solid fa-circle-check"></i> General AI feedback scorecards</li>
                <li><i className="fa-solid fa-circle-check"></i> Standard role configurations</li>
                <li style={{ opacity: 0.5 }}><i className="fa-solid fa-circle-xmark" style={{ color: 'var(--text-muted)' }}></i> Speech-to-text voice input</li>
                <li style={{ opacity: 0.5 }}><i className="fa-solid fa-circle-xmark" style={{ color: 'var(--text-muted)' }}></i> Real-time Copilot hints</li>
              </ul>
            </div>
            <button className="pricing-card-btn btn-outline" onClick={() => handlePlanClick('Basic')}>
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card popular">
            <span className="popular-badge">Most Popular</span>
            <div className="pricing-card-header">
              <h3>Pro</h3>
              <p>Complete simulation for active job seekers.</p>
            </div>
            <div>
              <div className="pricing-card-price">$10<span>/month</span></div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-circle-check"></i> 8 questions per session</li>
                <li><i className="fa-solid fa-circle-check"></i> Advanced speech-to-text input</li>
                <li><i className="fa-solid fa-circle-check"></i> Real-time Copilot mode hints</li>
                <li><i className="fa-solid fa-circle-check"></i> Detailed analytical scorecards</li>
                <li><i className="fa-solid fa-circle-check"></i> Custom job description parsing</li>
              </ul>
            </div>
            <button className="pricing-card-btn btn-filled" onClick={() => handlePlanClick('Pro')}>
              Upgrade to Pro
            </button>
          </div>

          {/* Unlimited Plan */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Unlimited</h3>
              <p>For serious candidates aiming for top-tier firms.</p>
            </div>
            <div>
              <div className="pricing-card-price">$29<span>/month</span></div>
              <ul className="pricing-card-features">
                <li><i className="fa-solid fa-circle-check"></i> Unlimited questions & sessions</li>
                <li><i className="fa-solid fa-circle-check"></i> Everything in Pro included</li>
                <li><i className="fa-solid fa-circle-check"></i> Priority AI response engine</li>
                <li><i className="fa-solid fa-circle-check"></i> Dedicated resume tailoring</li>
                <li><i className="fa-solid fa-circle-check"></i> 1-on-1 performance benchmarking</li>
              </ul>
            </div>
            <button className="pricing-card-btn btn-outline" onClick={() => handlePlanClick('Unlimited')}>
              Get Unlimited
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {selectedPlan && (
        <div className="checkout-modal-overlay" onClick={handleCloseModal}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="checkout-close-btn" onClick={handleCloseModal}>&times;</button>
            
            {!checkoutSuccess ? (
              <>
                <div className="checkout-header">
                  <h3>Upgrade to {selectedPlan}</h3>
                  <p>{selectedPlan === 'Basic' ? 'Start practicing immediately for free.' : `Simulate payment for the ${selectedPlan} tier.`}</p>
                </div>
                
                <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                  <div className="checkout-field">
                    <label>Full Name</label>
                    <input type="text" required placeholder="John Doe" className="checkout-input" />
                  </div>
                  
                  <div className="checkout-field">
                    <label>Email Address</label>
                    <input type="email" required placeholder="john@example.com" className="checkout-input" />
                  </div>
                  
                  {selectedPlan !== 'Basic' && (
                    <>
                      <div className="checkout-field">
                        <label>Card Number</label>
                        <input type="text" required placeholder="4111 2222 3333 4444" className="checkout-input" maxLength="19" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="checkout-field">
                          <label>Expiry Date</label>
                          <input type="text" required placeholder="MM/YY" className="checkout-input" maxLength="5" />
                        </div>
                        <div className="checkout-field">
                          <label>CVC</label>
                          <input type="text" required placeholder="123" className="checkout-input" maxLength="3" />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <button type="submit" className="checkout-submit-btn">
                    {selectedPlan === 'Basic' ? 'Activate Free Account' : `Pay ${selectedPlan === 'Pro' ? '$10.00' : '$29.00'}`}
                  </button>
                </form>
              </>
            ) : (
              <div className="checkout-success-container">
                <i className="fa-solid fa-circle-check checkout-success-icon"></i>
                <h3>Thank you!</h3>
                <p>Your subscription to the <strong>{selectedPlan} Plan</strong> is now active.</p>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '-0.5rem' }}>We've sent a confirmation to your email.</p>
                <button className="checkout-submit-btn" style={{ width: '100%', marginTop: '1rem' }} onClick={handleCloseModal}>
                  Let's Practice!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Your Interview Buddy</h3>
            <p>Empowering candidates to conquer technical and behavioral interviews with modern Generative AI coaching.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.landing-container')?.scrollIntoView({ behavior: 'smooth' }); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.why-us-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Why Choose Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.pricing-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Pricing</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.reviews-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Success Stories</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>For Candidates</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onStart(''); }}>AI Mock Interviews</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onStart('System Design'); }}>System Design Prep</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onStart('Behavioral'); }}>Behavioral Prep</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Contact Us</h4>
            <div className="footer-contact-info">
              <p>Have questions or feedback? Drop us a line:</p>
              <a href="mailto:pushprachit@gmail.com">pushprachit@gmail.com</a>
              <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>Available 24/7 for support.</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Your Interview Buddy. All rights reserved.</span>
          <span>Designed for candidate success</span>
        </div>
      </footer>

      {/* Floating help widget */}
      <div className="floating-help-widget" onClick={() => onStart('')}>
        Need interview help? 👋
      </div>
    </div>
  );
}
