import React from "react";
import "./Students.css";

const Students = () => {
  return (
    <div className="students-wrapper">
      {/* Hero Section */}
      <section className="students-hero">
        <div className="hero-content">
          <h1>For Students</h1>
          <p>Your comprehensive academic companion for competitive exams and college success</p>
          <a href="#resources" className="cta-btn">Explore Resources</a>
        </div>
      </section>

      {/* Exam Categories */}
      <section className="students-exams">
        <h2>Exam Preparation</h2>
        <div className="exams-grid">
          <div className="exam-card">
            <h3>Engineering</h3>
            <ul>
              <li>JEE Mains & Advanced</li>
              <li>BITSAT</li>
              <li>VITEEE</li>
              <li>State CETs</li>
            </ul>
            <a href="/students/engineering" className="exam-btn">View Resources</a>
          </div>
          <div className="exam-card">
            <h3>Medical</h3>
            <ul>
              <li>NEET</li>
              <li>AIIMS</li>
              <li>JIPMER</li>
              <li>State Medical Exams</li>
            </ul>
            <a href="/students/medical" className="exam-btn">View Resources</a>
          </div>
          <div className="exam-card">
            <h3>Foundation (9-10)</h3>
            <ul>
              <li>NTSE</li>
              <li>Olympiads</li>
              <li>Board Exam Prep</li>
              <li>Scholarship Tests</li>
            </ul>
            <a href="/students/foundation" className="exam-btn">View Resources</a>
          </div>
          <div className="exam-card">
            <h3>Commerce</h3>
            <ul>
              <li>CA Foundation</li>
              <li>Commerce Olympiads</li>
              <li>CUET</li>
              <li>IPMAT</li>
            </ul>
            <a href="/students/commerce" className="exam-btn">View Resources</a>
          </div>
        </div>
      </section>

      {/* Study Resources */}
      <section className="students-resources" id="resources">
        <h2>Premium Study Materials</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>📚 Chapter-wise Notes</h3>
            <p>Comprehensive notes for all subjects and competitive exams</p>
          </div>
          <div className="resource-card">
            <h3>📝 Previous Year Papers</h3>
            <p>10+ years of solved question papers with explanations</p>
          </div>
          <div className="resource-card">
            <h3>✍️ Mock Test Series</h3>
            <p>Full-length simulated exams with detailed analysis</p>
          </div>
          <div className="resource-card">
            <h3>🎥 Video Lectures</h3>
            <p>Expert-recorded classes for conceptual clarity</p>
          </div>
          <div className="resource-card">
            <h3>📊 Performance Analytics</h3>
            <p>Track your progress and identify weak areas</p>
          </div>
          <div className="resource-card">
            <h3>🧠 Memory Techniques</h3>
            <p>Learn scientific methods to retain information longer</p>
          </div>
        </div>
      </section>

      {/* College Guidance */}
      <section className="students-college">
        <h2>College Admission Support</h2>
        <div className="college-features">
          <div className="feature">
            <h3>College Predictor</h3>
            <p>AI-powered tool to predict your best-fit colleges based on expected ranks</p>
          </div>
          <div className="feature">
            <h3>Cutoff Analysis</h3>
            <p>Historical cutoff data for all major colleges</p>
          </div>
          <div className="feature">
            <h3>Application Guidance</h3>
            <p>Step-by-step help with college applications</p>
          </div>
          <div className="feature">
            <h3>Scholarship Info</h3>
            <p>Complete database of available scholarships</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="students-success">
        <h2>Success Stories</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"The mock test series helped me improve my JEE rank by 15,000 positions!"</p>
            <span>- Rahul, IIT Bombay</span>
          </div>
          <div className="testimonial">
            <p>"The NEET preparation materials were exactly what I needed to crack 650+ marks."</p>
            <span>- Priya, AIIMS Delhi</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="students-cta">
        <h2>Start Your Success Journey Today</h2>
        <div className="cta-buttons">
          <a href="/signup" className="primary-btn">Join Now</a>
          <a href="/free-resources" className="secondary-btn">Free Resources</a>
        </div>
      </section>
    </div>
  );
};

export default Students;