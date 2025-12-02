import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import collegeService from '../services/collegeService';
import './CollegeDetails.css';

const CollegeDetails = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('about');
    const [expandedProgram, setExpandedProgram] = useState(null);
    const [expandedFaq, setExpandedFaq] = useState(null); // NEW: Track expanded FAQ
    const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        fetchCollege();
    }, [id]);

    const fetchCollege = async () => {
        try {
            const data = await collegeService.getCollege(id);
            console.log('Fetched college data:', data);
            setCollege(data.data || data);
        } catch (err) {
            console.error('Error fetching college:', err);
            setError(err?.message || 'Error loading college');
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('Please login to add a review');
            return;
        }
        setSubmittingReview(true);
        try {
            await collegeService.addReview(id, reviewForm);
            alert('Review added successfully!');
            setReviewForm({ rating: 5, title: '', comment: '' });
            fetchCollege();
        } catch (err) {
            alert(err?.message || String(err));
        } finally {
            setSubmittingReview(false);
        }
    };

    // NEW: Toggle FAQ function
    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error || !college) {
        return (
            <div className="error-container">
                <h2>College Not Found</h2>
                <Link to="/career" className="back-link">← Back to Colleges</Link>
            </div>
        );
    }

    console.log('College object:', college);
    console.log('Rankings:', college.rankings);
    console.log('Facilities:', college.facilities);
    console.log('FAQs:', college.faqs);

    return (
        <div className="college-details">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <Link to="/consultancy" className="crumb">Colleges</Link>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{college.name}</span>
            </div>

            {/* Hero Banner with Rankings */}
            <div className="hero-banner">
                <img 
                    src={(college.images && college.images[0]) ? college.images[0] : '/placeholder-college.jpg'}
                    alt={college.name}
                    className="hero-image"
                />
               
            </div>

            {/* Why Choose This College */}
            {college.about && (
            <div className="why-choose">
                <div className="why-choose-title">Why Choose {college.name}?</div>
                <ul className="why-choose-list">
                    {college.about.academic_excellence && (
                        <li><span className="why-choose-icon">🎓</span>{college.about.academic_excellence}</li>
                    )}
                    {college.about.campus_infrastructure && (
                        <li><span className="why-choose-icon">🏫</span>{college.about.campus_infrastructure}</li>
                    )}
                    {college.about.student_life && (
                        <li><span className="why-choose-icon">🎉</span>{college.about.student_life}</li>
                    )}
                    {college.about.accreditation_affiliation && (
                        <li><span className="why-choose-icon">📜</span>{college.about.accreditation_affiliation}</li>
                    )}
                    {college.about.mission && (
                        <li><span className="why-choose-icon">🚀</span>{college.about.mission}</li>
                    )}
                    {college.about.vision && (
                        <li><span className="why-choose-icon">🌎</span>{college.about.vision}</li>
                    )}
                </ul>
            </div>
            )}

            {/* College Header */}
            <div className="college-header">
                <h1 className="college-name font-display">{college.name}</h1>
                {college.shortName && <h2 className="college-short-name font-display">({college.shortName})</h2>}
                <p className="college-location">
                    <span className="location-icon">📍</span>
                    {college.location?.city}, {college.location?.state}
                </p>
                <div className="header-ctas">
                    {college.contact?.website && (
                        <a href={college.contact.website} target="_blank" rel="noopener noreferrer" className="btn primary">Official Site</a>
                    )}
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-navigation">
                <button
                    className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                >
                    <span className="tab-icon">ℹ️</span>
                    About
                </button>

                <button
                    className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courses')}
                >
                    <span className="tab-icon">📚</span>
                    Courses
                </button>

                <button
                    className={`tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('admissions')}
                >
                    <span className="tab-icon">🎓</span>
                    Admissions
                </button>

                <button
                    className={`tab-btn ${activeTab === 'rankings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rankings')}
                >
                    <span className="tab-icon">🏆</span>
                    Rankings
                </button>

                <button
                    className={`tab-btn ${activeTab === 'placement' ? 'active' : ''}`}
                    onClick={() => setActiveTab('placement')}
                >
                    <span className="tab-icon">💼</span>
                    Placement
                </button>

                <button
                    className={`tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('facilities')}
                >
                    <span className="tab-icon">🏫</span>
                    Facilities
                </button>

                <button
                    className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faqs')}
                >
                    <span className="tab-icon">❓</span>
                    FAQs
                </button>
            </div>

            {/* Content Container */}
            <div className="content-container">
                {/* About Tab */}
                {activeTab === 'about' && (
                    <div className="tab-content">
                        {/* Gallery Section */}
                        <div className="gallery-section">
                            <h3 className="section-title">
                                <span className="title-icon">🖼️</span>
                                Gallery
                            </h3>
                            <div className="gallery-scroll">
                                {college.images && college.images.length > 0 ? (
                                    college.images.map((img, index) => (
                                        <img key={index} src={img} alt={`${college.name} ${index + 1}`} className="gallery-image" />
                                    ))
                                ) : (
                                    <>
                                        <img src="/placeholder-1.jpg" alt="College" className="gallery-image" />
                                        <img src="/placeholder-2.jpg" alt="Campus" className="gallery-image" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="info-cards">
                            <div className="info-card">
                                <span className="card-icon">📅</span>
                                <span className="card-label">Est: {college.established || 'N/A'}</span>
                            </div>
                            <div className="info-card">
                                <span className="card-icon">🏆</span>
                                <span className="card-label">NIRF: #{college.rankings?.nirf || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="info-cards">
                            <div className="info-card">
                                <span className="card-icon">⭐</span>
                                <span className="card-label">Type: {college.type || 'N/A'}</span>
                            </div>
                            <div className="info-card">
                                <span className="card-icon">🏢</span>
                                <span className="card-label">City: {college.location?.city || 'N/A'}</span>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="about-section">
                            <h3 className="section-title">About:</h3>
                            <p className="about-text">
                                {college.description || college.about?.introduction || `${college.name} is a premier educational institution offering quality education and excellent placement opportunities.`}
                            </p>
                        </div>

                        {/* Contact Info */}
                        {college.contact && (
                        <div className="contact-section">
                            <h3 className="section-title">Contact Information</h3>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <span>{college.contact.phone?.join(', ') || 'N/A'}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <span>{college.contact.email || 'N/A'}</span>
                            </div>
                            {college.contact.website && (
                                <div className="contact-item">
                                    <span className="contact-icon">🌐</span>
                                    <a href={college.contact.website} target="_blank" rel="noopener noreferrer">
                                        Visit Website
                                    </a>
                                </div>
                            )}
                        </div>
                        )}

                        {/* Reviews */}
                        <div className="reviews-section">
                            <h3 className="section-title">Student Reviews</h3>
                            {Array.isArray(college.reviews) && college.reviews.length > 0 ? (
                                <div className="reviews-list">
                                    {college.reviews.slice(0, 5).map((r, idx) => (
                                        <div key={idx} className="review-card">
                                            <div className="review-header">
                                                <div className="review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(Math.max(0, 5 - r.rating))}</div>
                                                <div className="review-title">{r.title}</div>
                                            </div>
                                            <div className="review-body">{r.comment}</div>
                                            {r.author && <div className="review-author">— {r.author}</div>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="muted">No reviews yet. Be the first to review!</div>
                            )}
                            <form className="review-form" onSubmit={handleReviewSubmit}>
                                <div className="form-row">
                                    <label className="form-label">Rating</label>
                                    <select
                                        value={reviewForm.rating}
                                        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                                        className="form-input"
                                    >
                                        {[5,4,3,2,1].map(v => (
                                            <option key={v} value={v}>{v} Stars</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-row">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        value={reviewForm.title}
                                        onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                                        className="form-input"
                                        placeholder="Great campus, strong academics..."
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <label className="form-label">Comment</label>
                                    <textarea
                                        value={reviewForm.comment}
                                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                        className="form-textarea"
                                        rows="4"
                                        placeholder="Share details about academics, placements, infrastructure, culture..."
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn primary" disabled={submittingReview}>
                                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="tab-content">
                        <div className="courses-section">
                            <h3 className="section-title">
                                <span className="title-icon">🎯</span>
                                Undergraduate Programs
                            </h3>
                            <p className="section-subtitle">
                                Explore 4 year B.Tech and Integrated dual degree programs
                            </p>

                            {college.branches && Array.isArray(college.branches) && college.branches.length > 0 ? (
                                <div className="programs-list">
                                    {college.branches.map((branch, index) => (
                                        <div key={index} className="program-item">
                                            <div 
                                                className="program-header"
                                                onClick={() => setExpandedProgram(expandedProgram === index ? null : index)}
                                            >
                                                <div className="program-info">
                                                    <span className="program-icon">🎓</span>
                                                    <div>
                                                        <div className="program-name">{branch.name}</div>
                                                        <div className="program-code">Code: {branch.code}</div>
                                                    </div>
                                                </div>
                                                <span className="expand-icon">{expandedProgram === index ? '▼' : '▶'}</span>
                                            </div>
                                            {expandedProgram === index && (
                                                <div className="program-details">
                                                    <div className="detail-row">
                                                        <span className="detail-label">Total Seats:</span>
                                                        <span className="detail-value">{branch.seats?.total || 'N/A'}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">Available:</span>
                                                        <span className="detail-value available">{branch.seats?.available || 0}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">Annual Fee:</span>
                                                        <span className="detail-value">₹{branch.fee?.annual?.toLocaleString() || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="muted">No courses available</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Admissions Tab */}
                {activeTab === 'admissions' && (
                    <div className="tab-content">
                        <div className="admissions-section">
                            <h3 className="section-title">Admission Process</h3>
                            <p className="admission-text">
                                {college.admissions?.process || 'Admission information will be updated soon.'}
                            </p>
                            {college.admissions?.entrance && college.admissions.entrance.length > 0 && (
                                <>
                                    <h3 className="section-title">Entrance Exams</h3>
                                    <div className="entrance-exams">
                                        {college.admissions.entrance.map((exam, index) => (
                                            <div key={index} className="exam-card">
                                                <h4 className="exam-name">{exam.examName}</h4>
                                                <div className="exam-details">
                                                    <div className="exam-detail">
                                                        <span className="label">Cutoff Rank:</span>
                                                        <span className="value">{exam.cutoffRank}</span>
                                                    </div>
                                                    <div className="exam-detail">
                                                        <span className="label">Cutoff Marks:</span>
                                                        <span className="value">
                                                            {exam.cutoffMarks}
                                                            {exam.totalMarks && ` / ${exam.totalMarks}`}
                                                        </span>
                                                    </div>
                                                    <div className="exam-detail">
                                                        <span className="label">Year:</span>
                                                        <span className="value">{exam.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            <h3 className="section-title">Eligibility</h3>
                            <p className="admission-text">
                                {college.admissions?.eligibility || '10+2 with Physics, Chemistry, and Mathematics'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Rankings Tab */}
                {activeTab === 'rankings' && (
                    <div className="tab-content">
                        <div className="rankings-section">
                            <h3 className="section-title">
                                <span className="title-icon">🏆</span>
                                Rankings & Accreditations
                            </h3>
                            {college.rankings && Object.keys(college.rankings).length > 0 && 
                             (college.rankings.nirf || college.rankings.qs || college.rankings.times) ? (
                                <div className="rankings-grid">
                                    {college.rankings.nirf && (
                                        <div className="ranking-card">
                                            <div className="ranking-source">NIRF Ranking</div>
                                            <div className="ranking-number">#{college.rankings.nirf}</div>
                                            <div className="ranking-year">India</div>
                                        </div>
                                    )}
                                    {college.rankings.qs && (
                                        <div className="ranking-card">
                                            <div className="ranking-source">QS World Ranking</div>
                                            <div className="ranking-number">#{college.rankings.qs}</div>
                                            <div className="ranking-year">Global</div>
                                        </div>
                                    )}
                                    {college.rankings.times && (
                                        <div className="ranking-card">
                                            <div className="ranking-source">THE Ranking</div>
                                            <div className="ranking-number">#{college.rankings.times}</div>
                                            <div className="ranking-year">Global</div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="muted">Ranking information not available</p>
                            )}

                            {college.about?.accreditation_affiliation && (
                                <div style={{marginTop: '24px'}}>
                                    <h4 className="subsection-title">Accreditation</h4>
                                    <p className="admission-text">{college.about.accreditation_affiliation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Placement Tab */}
                {activeTab === 'placement' && (
                    <div className="tab-content">
                        {(college.placements || college.placement) ? (
                            <div className="placements-section">
                                <h3 className="section-title">
                                    <span className="title-icon">💼</span>
                                    Placement Statistics
                                </h3>
                                <div className="placement-stats">
                                    {(college.placements?.percentage || college.placement?.percentage) && (
                                        <div className="stat-card">
                                            <div className="stat-value">
                                                {college.placements?.percentage || college.placement?.percentage}%
                                            </div>
                                            <div className="stat-label">Placement Rate</div>
                                        </div>
                                    )}
                                    {(college.placements?.highestPackage || college.placement?.highest_package) && (
                                        <div className="stat-card">
                                            <div className="stat-value">
                                              {college.placements?.highestPackage
                                                ? `₹${(college.placements.highestPackage / 100000).toFixed(1)}L`
                                                : college.placement?.highest_package}
                                            </div>
                                            <div className="stat-label">Highest Package</div>
                                        </div>
                                    )}
                                    {(college.placements?.averagePackage || college.placement?.average_package) && (
                                        <div className="stat-card">
                                            <div className="stat-value">
                                              {college.placements?.averagePackage
                                                ? `₹${(college.placements.averagePackage / 100000).toFixed(1)}L`
                                                : college.placement?.average_package}
                                            </div>
                                            <div className="stat-label">Average Package</div>
                                        </div>
                                    )}
                                </div>
                                {college.placement?.top_recruiters && college.placement.top_recruiters.length > 0 && (
                                    <div className="top-recruiters">
                                        <h4 className="subsection-title">Top Recruiters</h4>
                                        <div className="recruiters-list">
                                            {college.placement.top_recruiters.map((company, idx) => (
                                                <span key={idx} className="recruiter-chip">{company}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="muted">Placement information not available</p>
                        )}
                    </div>
                )}

                {/* Facilities Tab */}
                {activeTab === 'facilities' && (
                    <div className="tab-content">
                        <h3 className="section-title">
                            <span className="title-icon">🏫</span>
                            Campus Facilities
                        </h3>
                        {college.facilities ? (
                            <>
                                {!Array.isArray(college.facilities) && typeof college.facilities === 'object' ? (
                                    <div className="facilities-grid">
                                        {college.facilities.labs && college.facilities.labs.length > 0 && (
                                            <div className="facility-category">
                                                <h4 className="subsection-title">Laboratories</h4>
                                                {college.facilities.labs.map((lab, idx) => (
                                                    <div className="facility-item" key={`lab-${idx}`}>
                                                        <span className="facility-icon">🔬</span>
                                                        <span>{lab}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {college.facilities.sports && college.facilities.sports.length > 0 && (
                                            <div className="facility-category">
                                                <h4 className="subsection-title">Sports Facilities</h4>
                                                {college.facilities.sports.map((sport, idx) => (
                                                    <div className="facility-item" key={`sport-${idx}`}>
                                                        <span className="facility-icon">⚽</span>
                                                        <span>{sport}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {(!college.facilities.labs || college.facilities.labs.length === 0) &&
                                         (!college.facilities.sports || college.facilities.sports.length === 0) && (
                                            <p className="muted">Facilities information will be updated soon</p>
                                        )}
                                    </div>
                                ) : Array.isArray(college.facilities) && college.facilities.length > 0 ? (
                                    <div className="facilities-grid">
                                        {college.facilities.map((facility, idx) => (
                                            <div className="facility-item" key={idx}>
                                                <span className="facility-icon">✓</span>
                                                <span>{facility}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="muted">Facilities information not available</p>
                                )}
                            </>
                        ) : (
                            <p className="muted">Facilities information not available</p>
                        )}
                    </div>
                )}

                {/* FAQs Tab - NEW ACCORDION STYLE */}
                {activeTab === 'faqs' && (
                    <div className="tab-content">
                        <h3 className="section-title">
                            <span className="title-icon">❓</span>
                            Frequently Asked Questions
                        </h3>
                        {college.faqs && Array.isArray(college.faqs) && college.faqs.length > 0 ? (
                            <div className="faqs-section">
                                {college.faqs.map((faq, idx) => (
                                    <div key={idx} className={`faq-accordion ${expandedFaq === idx ? 'expanded' : ''}`}>
                                        <div 
                                            className="faq-accordion-header"
                                            onClick={() => toggleFaq(idx)}
                                        >
                                            <div className="faq-accordion-question">
                                                <span className="faq-icon">Q:</span>
                                                {faq.question}
                                            </div>
                                            <span className="faq-accordion-icon">
                                                {expandedFaq === idx ? '▼' : '▶'}
                                            </span>
                                        </div>
                                        {expandedFaq === idx && (
                                            <div className="faq-accordion-answer">
                                                <span className="faq-icon">A:</span>
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="muted">No FAQs available at the moment</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollegeDetails;