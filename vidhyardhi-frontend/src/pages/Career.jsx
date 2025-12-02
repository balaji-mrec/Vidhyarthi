import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import collegeService from '../services/collegeService';
import './Career.css';

const Career = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        state: '',
        city: '',
        search: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0
    });

    useEffect(() => {
        fetchColleges();
    }, [filters, pagination.page]);

    const fetchColleges = async () => {
        setLoading(true);
        try {
            const queryParams = {
                ...filters,
                page: pagination.page,
                limit: pagination.limit
            };
            const data = await collegeService.getColleges(queryParams);
            setColleges(data.data || []);
            setPagination(prev => ({
                ...prev,
                total: data.total,
                pages: data.pages
            }));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setFilters({
            type: '',
            state: '',
            city: '',
            search: ''
        });
    };

    if (loading && colleges.length === 0) {
        return (
            <div className="loader-container">
                <div className="loader-spinner"></div>
                <p className="loader-text">Loading amazing colleges for you...</p>
            </div>
        );
    }

    return (
        <div className="career-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Find Your Perfect College 🎓
                        <span className="hero-title-gradient">& Shape Your Future</span>
                    </h1>
                    
                    
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </section>

            <div className="career-container">
                {/* Filter Section */}
                <div className="filter-section">
                    <div className="filter-header">
                        <h2 className="filter-title">
                            <span className="filter-icon">🔍</span>
                            Find Your Dream College
                        </h2>
                        {(filters.search || filters.type || filters.state || filters.city) && (
                            <button onClick={clearFilters} className="clear-btn">
                                Clear All Filters ✕
                            </button>
                        )}
                    </div>
                    
                    <div className="filter-grid">
                        <div className="input-group">
                            <label className="input-label">🔎 Search</label>
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search by college name..."
                                className="filter-input"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">🏫 College Type</label>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">All Types</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Medical">Medical</option>
                                <option value="Management">Management</option>
                                <option value="Pharmacy">Pharmacy</option>
                                <option value="Arts & Science">Arts & Science</option>
                                <option value="Law">Law</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">📍 State</label>
                            <select
                                name="state"
                                value={filters.state}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">All States</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Maharashtra">Maharashtra</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">🏙️ City</label>
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                placeholder="Enter city name..."
                                className="filter-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-banner">
                        <span className="error-icon">⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* Results Info */}
                <div className="results-info">
                    <p className="results-text">
                        Showing <span className="highlight">{colleges.length}</span> of{' '}
                        <span className="highlight">{pagination.total}</span> colleges
                    </p>
                    {filters.search && (
                        <p className="search-query">
                            Search results for: <strong>"{filters.search}"</strong>
                        </p>
                    )}
                </div>

                {/* Colleges Grid */}
                <div className="colleges-grid">
                    {colleges.map((college, index) => (
                        <div 
                            key={college._id} 
                            className="college-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-image">
                                {college.images && college.images[0] ? (
                                    <img src={college.images[0]} alt={college.name} />
                                ) : (
                                    <div className="placeholder-image">
                                        <span className="placeholder-icon">🎓</span>
                                    </div>
                                )}
                                {college.featured && (
                                    <div className="featured-badge">⭐ Featured</div>
                                )}
                                {college.verified && (
                                    <div className="verified-badge">✓ Verified</div>
                                )}
                            </div>
                            
                            <div className="card-content">
                                <h3 className="college-name">{college.name}</h3>
                                
                                <div className="college-meta">
                                    <span className="meta-item">
                                        <span className="meta-icon">📍</span>
                                        {college.location.city}, {college.location.state}
                                    </span>
                                    <span className="meta-item">
                                        <span className="meta-icon">🏫</span>
                                        {college.type}
                                    </span>
                                </div>

                                <div className="college-stats">
                                    <div className="stat-item">
                                        <span className="stat-icon">⭐</span>
                                        <span className="stat-value">
                                            {college.rating?.average?.toFixed(1) || '4.0'}
                                        </span>
                                        <span className="stat-count">
                                            ({college.rating?.count || 0})
                                        </span>
                                    </div>
                                    {college.rankings?.nirf && (
                                        <div className="stat-item">
                                            <span className="stat-icon">🏆</span>
                                            <span className="stat-value">#{college.rankings.nirf}</span>
                                            <span className="stat-count">NIRF</span>
                                        </div>
                                    )}
                                </div>

                                {college.fees?.totalAnnual && (
                                    <div className="college-fee">
                                        <span className="fee-icon">💰</span>
                                        <span className="fee-amount">
                                            ₹{(college.fees.totalAnnual / 100000).toFixed(1)}L
                                        </span>
                                        <span className="fee-label">/year</span>
                                    </div>
                                )}

                                <Link 
                                    to={`/colleges/${college._id}`}
                                    className="view-details-btn"
                                >
                                    View Details
                                    <span className="btn-arrow">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {colleges.length === 0 && !loading && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3 className="no-results-title">No Colleges Found</h3>
                        <p className="no-results-text">
                            We couldn't find any colleges matching your criteria.
                        </p>
                        <button onClick={clearFilters} className="reset-btn">
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="pagination-btn"
                        >
                            <span className="btn-icon">←</span>
                            Previous
                        </button>
                        
                        <div className="pagination-numbers">
                            {[...Array(Math.min(pagination.pages, 5))].map((_, index) => {
                                let pageNum;
                                if (pagination.pages <= 5) {
                                    pageNum = index + 1;
                                } else if (pagination.page <= 3) {
                                    pageNum = index + 1;
                                } else if (pagination.page >= pagination.pages - 2) {
                                    pageNum = pagination.pages - 4 + index;
                                } else {
                                    pageNum = pagination.page - 2 + index;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`pagination-number ${
                                            pagination.page === pageNum ? 'active' : ''
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.pages}
                            className="pagination-btn"
                        >
                            Next
                            <span className="btn-icon">→</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Career;