
import "./Consultancy.css";

const Consultancy = () => {
  return (
    <div className="consultancy-wrapper">

      {/* Hero Section */}
      <section className="consultancy-hero">
        <div className="hero-content">
          <h1>Find Your College & Career Path</h1>
          <p>Trusted guidance for admissions, exams, and career choices</p>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search Colleges, Courses, Exams..." />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="consultancy-categories">
        <h2>Explore by Category</h2>
        <div className="category-grid">
          <a href="/engineering" className="category-card">🎓 Engineering</a>
          <a href="/mba" className="category-card">💼 MBA</a>
          <a href="/medical" className="category-card">💊 Medical</a>
          <a href="/science" className="category-card">📖 Science & Arts</a>
          <a href="/counseling" className="category-card">🧑‍🏫 Counseling</a>
        </div>
      </section>

      {/* About Section */}
      <section className="consultancy-about">
        <div className="about-text">
          <h2>About Our Consultancy</h2>
          <p>
            We provide expert guidance to students and parents in choosing the
            right educational and career paths. With years of experience and
            strong connections, we ensure you take informed steps toward success.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="consultancy-services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Career Guidance</h3>
            <p>Personalized counseling based on skills, interests & trends.</p>
          </div>
          <div className="service-card">
            <h3>College Admissions</h3>
            <p>Support for selection, applications & admissions process.</p>
          </div>
          <div className="service-card">
            <h3>Exam Mentorship</h3>
            <p>Strategic preparation for JEE, NEET, EAMCET & more.</p>
          </div>
          <div className="service-card">
            <h3>Skill Development</h3>
            <p>Programs to enhance employability & industry readiness.</p>
          </div>
        </div>
      </section>

      {/* Featured Colleges/Exams */}
      <section className="consultancy-featured">
        <h2>Top Colleges & Exams</h2>
        <div className="featured-grid">
          <div className="featured-card">IIT Bombay</div>
          <div className="featured-card">IIT Madras</div>
          <div className="featured-card">AIIMS Delhi</div>
          <div className="featured-card">NEET 2025</div>
          <div className="featured-card">JEE Advanced</div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="consultancy-why">
        <h2>Why Choose Us?</h2>
        <div className="why-points">
          <div className="point"><span>10+</span><p>Years Experience</p></div>
          <div className="point"><span>5000+</span><p>Students Guided</p></div>
          <div className="point"><span>100+</span><p>College Tie-ups</p></div>
          <div className="point"><span>95%</span><p>Success Rate</p></div>
        </div>
      </section>

      {/* Contact */}
      <section className="consultancy-contact" id="contact">
        <h2>Get in Touch</h2>
        <p>We’d love to help you achieve your educational and career goals.</p>
        <div className="contact-info">
          <p>📧 consultancy@balanju.com</p>
          <p>📞 +91 98765 43210</p>
        </div>
        <a href="mailto:consultancy@balanju.com" className="cta-btn">Send Email</a>
      </section>
    </div>
  );
};

export default Consultancy;
