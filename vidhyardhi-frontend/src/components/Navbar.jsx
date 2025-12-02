import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [activeTab, setActiveTab] = useState("colleges");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    // Add a small delay to allow clicking on search results
    setTimeout(() => {
      setIsSearchExpanded(false);
    }, 200);
  };

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  // Set active section based on current URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/for-coders")) {
      setActiveSection("for-coders");
    } else if (currentPath.includes("/for-students")) {
      setActiveSection("for-students");
    } else if (currentPath.includes("/roadmaps")) {
      setActiveSection("roadmaps");
    } else if (currentPath.includes("/consultancy")) {
      setActiveSection("consultancy");
    } else {
      setActiveSection("home");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveMenu(null);
        setIsMobileMenuOpen(false); // Also close mobile menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar-header" ref={dropdownRef}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">Vidhyardhi</div>
          <button 
            className="mobile-menu-close"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="mobile-menu-list">
          <li className="mobile-menu-item">
            <Link to="/consultancy" className="mobile-menu-link" onClick={toggleMobileMenu}>
              <div className="mobile-menu-icon">🎯</div>
              <span className="mobile-menu-text">Career</span>
            </Link>
          </li>

          <li className="mobile-menu-item">
            <Link to="/for-coders" className="mobile-menu-link" onClick={toggleMobileMenu}>
              <div className="mobile-menu-icon">💻</div>
              <span className="mobile-menu-text">For Coders</span>
            </Link>
          </li>

          <li className="mobile-menu-item">
            <Link to="/for-students" className="mobile-menu-link" onClick={toggleMobileMenu}>
              <div className="mobile-menu-icon">📚</div>
              <span className="mobile-menu-text">For Students</span>
            </Link>
          </li>

          <li className="mobile-menu-item">
            <Link to="/roadmaps" className="mobile-menu-link" onClick={toggleMobileMenu}>
              <div className="mobile-menu-icon">🗺️</div>
              <span className="mobile-menu-text">Roadmaps</span>
            </Link>
          </li>

          {/* Auth section */}
          {!user && (
            <>
              <li className="mobile-menu-item">
                <Link to="/login" className="mobile-menu-link" onClick={toggleMobileMenu}>
                  <div className="mobile-menu-icon">🔐</div>
                  <span className="mobile-menu-text">Login</span>
                </Link>
              </li>
              <li className="mobile-menu-item">
                <Link to="/Register" className="mobile-menu-link" onClick={toggleMobileMenu}>
                  <div className="mobile-menu-icon">📝</div>
                  <span className="mobile-menu-text">Sign Up</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* LOGO + MAIN BUTTONS */}
      <div className="main-bar">
        <div className="logo-area">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo-line">
              🎓 <span className="logo-bold"><font size="5" color="yellow" face="roboto">Vidhyardhi</font></span>
            </div>
            <div className="logo-line logo-bold"><font size="3" color="white" face="roboto"></font></div>
          </Link>
        </div>
 
        <div className={`search-box ${isSearchExpanded ? 'expanded' : ''}`} onClick={handleSearchClick}>
          <input 
            type="text" 
            placeholder="Search courses, topics..." 
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* MAIN NAVIGATION BUTTONS */}
        <div className={`nav-buttons ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link
            to="/consultancy"
            className={`main-btn ${activeSection === "consultancy" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("consultancy");
              setIsMobileMenuOpen(false);
            }}
          >
            Career
          </Link>
          <Link
            to="/for-coders"
            className={`main-btn ${activeSection === "for-coders" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("for-coders");
              setIsMobileMenuOpen(false);
            }}
          >
            For Coders
          </Link>
          <Link
            to="/for-students"
            className={`main-btn ${activeSection === "for-students" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("for-students");
              setIsMobileMenuOpen(false);
            }}
          >
            For Students
          </Link>
          <Link
            to="/roadmaps"
            className={`main-btn ${activeSection === "roadmaps" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("roadmaps");
              setIsMobileMenuOpen(false);
            }}
          >
            Roadmaps
          </Link>
        </div>

        {/* LOGIN/SIGN-IN BUTTONS OR USER PROFILE */}
        <div className={`auth-buttons ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {user ? (
            <UserProfile />
          ) : (
            <>
              <Link 
                to="/login" 
                className="auth-btn login-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/Register" 
                className="auth-btn signup-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* CONSULTANCY MENU */}
      {activeSection === "consultancy" && (
        <nav className="navbar-tabs">
          {/* ENGINEERING */}
          <div 
            className={`nav-item ${activeMenu === "engineering" ? "active" : ""}`}
            onMouseEnter={() => {
              setActiveMenu("engineering");
              setActiveTab("colleges");
            }}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="nav-btn" onClick={() => toggleMenu("engineering")}>
              ENGINEERING <span className="arrow">▼</span>
            </button>
            
            {activeMenu === "engineering" && (
              <div className="mega-dropdown">
                {/* Tab Navigation */}
                <div className="tab-nav">
                  <button
                    className={`tab-btn ${activeTab === "colleges" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("colleges")}
                  >
                    Colleges
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "branches" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("branches")}
                  >
                    Branches
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "exams" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("exams")}
                  >
                    Exams
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="tab-content">
                  {/* Colleges Tab */}
                  <div className={`tab-pane ${activeTab === "colleges" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title">
                          <span className="tab-icon">🏛️</span> Indian Colleges
                        </h4>
                        <ul className="tab-list">
                          <li>
                            <Link to="/colleges/nits">
                              <span className="item-icon">🔴</span> NITs
                              <span className="item-count">31</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/colleges/iits">
                              <span className="item-icon">🟠</span> IITs
                              <span className="item-count">23</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/colleges/iiits">
                              <span className="item-icon">🟢</span> IIITs
                              <span className="item-count">25</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/colleges/govt">
                              <span className="item-icon">🔵</span> Other Government Colleges
                              <span className="item-count">120+</span>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="tab-col">
                        <h4 className="tab-title">
                          <span className="tab-icon">🚀</span>Universities
                        </h4>
                        <ul className="tab-list">
                          <li>
                            <Link to="/branches/ai">
                              <span className="item-icon">🤖</span>Private Universities
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/data-science">
                              <span className="item-icon">📊</span>Deemed university
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/cyber">
                              <span className="item-icon">🔒</span>autonomous college 
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Branches Tab */}
                  <div className={`tab-pane ${activeTab === "branches" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title">
                          <span className="tab-icon">⚙️</span> Core Branches
                        </h4>
                        <ul className="tab-list">
                          <li>
                            <Link to="/branches/cse">
                              <span className="item-icon">💻</span> Computer Science
                              <span className="item-badge">Popular</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/mech">
                              <span className="item-icon">⚙️</span> Mechanical
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/eee">
                              <span className="item-icon">🔌</span> Electrical
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/civil">
                              <span className="item-icon">🏗️</span> Civil
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-col">
                        <h4 className="tab-title">
                          <span className="tab-icon">🚀</span> Emerging Fields
                        </h4>
                        <ul className="tab-list">
                          <li>
                            <Link to="/branches/ai">
                              <span className="item-icon">🤖</span> AI & ML
                              <span className="item-badge trending">Trending</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/data-science">
                              <span className="item-icon">📊</span> Data Science
                            </Link>
                          </li>
                          <li>
                            <Link to="/branches/cyber">
                              <span className="item-icon">🔒</span> Cyber Security
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Exams Tab */}
                  <div className={`tab-pane ${activeTab === "exams" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title">
                          <span className="tab-icon">🏆</span> National Exams
                        </h4>
                        <ul className="tab-list">
                          <li>
                            <Link to="/exams/jee-advanced">
                              <span className="item-icon">🎯</span> JEE Advanced
                            </Link>
                          </li>
                          <li>
                            <Link to="/exams/jee-main">
                              <span className="item-icon">📝</span> JEE Main
                            </Link>
                          </li>
                          <li>
                            <Link to="/exams/bitsat">
                              <span className="item-icon">🧪</span> BITSAT
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-col">
                        <h4 className="tab-title">
                          <span className="tab-icon">📍</span> State Exams
                        </h4>
                        <ul className="tab-list">
                          <li>
                            <Link to="/exams/mht-cet">
                              <span className="item-icon">🏛️</span> MHT-CET
                            </Link>
                          </li>
                          <li>
                            <Link to="/exams/kcet">
                              <span className="item-icon">🌴</span> KCET
                            </Link>
                          </li>
                          <li>
                            <Link to="/exams/ts-eamcet">
                              <span className="item-icon">⚡</span> TS EAMCET
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PHARMACY */}
          <div 
            className={`nav-item ${activeMenu === "pharmacy" ? "active" : ""}`}
            onMouseEnter={() => {
              setActiveMenu("pharmacy");
              setActiveTab("pharmacy-colleges");
            }}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="nav-btn" onClick={() => toggleMenu("pharmacy")}>
              PHARMACY <span className="arrow">▼</span>
            </button>

            {activeMenu === "pharmacy" && (
              <div className="mega-dropdown">
                <div className="tab-nav">
                  <button
                    className={`tab-btn ${activeTab === "pharmacy-colleges" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("pharmacy-colleges")}
                  >
                    Colleges
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "pharmacy-courses" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("pharmacy-courses")}
                  >
                    Courses
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "pharmacy-exams" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("pharmacy-exams")}
                  >
                    Exams
                  </button>
                </div>

                <div className="tab-content">
                  <div className={`tab-pane ${activeTab === "pharmacy-colleges" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title"><span className="tab-icon">🏥</span> Top Pharmacy Colleges</h4>
                        <ul className="tab-list">
                          <li><Link to="/pharmacy/colleges/nip">NIPER</Link></li>
                          <li><Link to="/pharmacy/colleges/govt">Govt Colleges</Link></li>
                          <li><Link to="/pharmacy/colleges/private">Private Colleges</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`tab-pane ${activeTab === "pharmacy-courses" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title"><span className="tab-icon">💊</span> Pharmacy Courses</h4>
                        <ul className="tab-list">
                          <li><Link to="/pharmacy/courses/bpharm">B.Pharm</Link></li>
                          <li><Link to="/pharmacy/courses/pharmd">Pharm.D</Link></li>
                          <li><Link to="/pharmacy/courses/dpharm">D.Pharm</Link></li>
                          <li><Link to="/pharmacy/courses/mpharm">M.Pharm</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`tab-pane ${activeTab === "pharmacy-exams" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title"><span className="tab-icon">📝</span> Entrance Exams</h4>
                        <ul className="tab-list">
                          <li><Link to="/pharmacy/exams/gpat">GPAT</Link></li>
                          <li><Link to="/pharmacy/exams/neet">NEET (for Pharma)</Link></li>
                          <li><Link to="/pharmacy/exams/state">State CETs</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MBA */}
          <div 
            className={`nav-item ${activeMenu === "mba" ? "active" : ""}`}
            onMouseEnter={() => {
              setActiveMenu("mba");
              setActiveTab("mba-colleges");
            }}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="nav-btn" onClick={() => toggleMenu("mba")}>
              MBA <span className="arrow">▼</span>
            </button>

            {activeMenu === "mba" && (
              <div className="mega-dropdown">
                <div className="tab-nav">
                  <button
                    className={`tab-btn ${activeTab === "mba-colleges" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("mba-colleges")}
                  >
                    Colleges
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "mba-specializations" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("mba-specializations")}
                  >
                    Specializations
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "mba-exams" ? "active" : ""}`}
                    onMouseEnter={() => setActiveTab("mba-exams")}
                  >
                    Exams
                  </button>
                </div>

                <div className="tab-content">
                  <div className={`tab-pane ${activeTab === "mba-colleges" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title"><span className="tab-icon">🏢</span> Top MBA Colleges</h4>
                        <ul className="tab-list">
                          <li><Link to="/mba/colleges/iims">IIMs</Link></li>
                          <li><Link to="/mba/colleges/top-bschools">Top B-Schools</Link></li>
                          <li><Link to="/mba/colleges/private">Private Colleges</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`tab-pane ${activeTab === "mba-specializations" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title"><span className="tab-icon">📈</span> MBA Specializations</h4>
                        <ul className="tab-list">
                          <li><Link to="/mba/specializations/finance">Finance</Link></li>
                          <li><Link to="/mba/specializations/marketing">Marketing</Link></li>
                          <li><Link to="/mba/specializations/hr">Human Resources</Link></li>
                          <li><Link to="/mba/specializations/operations">Operations</Link></li>
                          <li><Link to="/mba/specializations/analytics">Business Analytics</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`tab-pane ${activeTab === "mba-exams" ? "active" : ""}`}>
                    <div className="tab-grid">
                      <div className="tab-col">
                        <h4 className="tab-title"><span className="tab-icon">📝</span> Entrance Exams</h4>
                        <ul className="tab-list">
                          <li><Link to="/mba/exams/cat">CAT</Link></li>
                          <li><Link to="/mba/exams/xat">XAT</Link></li>
                          <li><Link to="/mba/exams/mat">MAT</Link></li>
                          <li><Link to="/mba/exams/gmat">GMAT</Link></li>
                          <li><Link to="/mba/exams/cmat">CMAT</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COUNSELING */}
          <div 
            className={`nav-item ${activeMenu === "counseling" ? "active" : ""}`}
            onMouseEnter={() => setActiveMenu("counseling")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="nav-btn" onClick={() => toggleMenu("counseling")}>
              <font color="yellow" face="roboto">COUNSELING</font> <span className="arrow">▼</span>
            </button>
            
            {activeMenu === "counseling" && (
              <div className="mega-dropdown">
                <div className="dropdown-grid">
                  <div className="dropdown-col">
                    <h4 className="dropdown-title">
                      <span className="dropdown-icon">🎯</span> Engineering Counseling
                    </h4>
                    <ul className="dropdown-list">
                      <li><Link to="/counseling/josaa">JOSAA (IITs/NITs)</Link></li>
                      <li><Link to="/counseling/state">State Counseling</Link></li>
                      <li><Link to="/counseling/private">Private University Counseling</Link></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4 className="dropdown-title">
                      <span className="dropdown-icon">🏥</span> Medical Counseling
                    </h4>
                    <ul className="dropdown-list">
                      <li><Link to="/counseling/neet">NEET Counseling</Link></li>
                      <li><Link to="/counseling/aiq">All India Quota</Link></li>
                      <li><Link to="/counseling/state-medical">State Medical Counseling</Link></li>
                    </ul>
                  </div>
                  <div className="dropdown-col">
                    <h4 className="dropdown-title">
                      <span className="dropdown-icon">📊</span> Tools
                    </h4>
                    <ul className="dropdown-list">
                      <li><Link to="/counseling/rank-predictor">Rank Predictor</Link></li>
                      <li><Link to="/counseling/college-selector">College Selector</Link></li>
                      <li><Link to="/counseling/seat-matrix">Seat Matrix</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* FOR CODERS MENU */}
      {activeSection === "for-coders" && (
        <div className="coders-navbar">
          <a href="#">Python</a>
          <Link to="/languages/java">Java</Link>
          <a href="#">JavaScript</a>
          <a href="#">C++</a>
          <a href="#">C#</a>
          <a href="#">Go</a>
          <a href="#">Ruby</a>
          <Link to="/languages/html">HTML</Link>
          <a href="#">CSS</a>
          <a href="#">React</a>
          <a href="#">Angular</a>
          <a href="#">Vue.js</a>
          <a href="#">Next.js</a>
          <a href="#">Node.js</a>
          <a href="#">REST API</a>
          <a href="#">GraphQL</a>
          <a href="#">Spring Boot</a>
          <a href="#">Django</a>
          <a href="#">Flask</a>
          <a href="#">Express.js</a>
          <a href="#">PostgreSQL</a>
          <a href="#">MySQL</a>
          <a href="#">MongoDB</a>
          <a href="#">SQLite</a>
          <a href="#">Redis</a>
          <a href="#">Cassandra</a>
          <a href="#">AWS</a>
          <a href="#">Azure</a>
          <a href="#">Google Cloud</a>
          <a href="#">Docker</a>
          <a href="#">Kubernetes</a>
          <a href="#">CI/CD</a>
          <a href="#">Data Science</a>
          <a href="#">Machine Learning</a>
          <a href="#">Deep Learning</a>
          <a href="#">TensorFlow</a>
          <a href="#">PyTorch</a>
          <a href="#">Big Data</a>
          <a href="#">Git & GitHub</a>
          <a href="#">Linux</a>
          <a href="#">Shell Scripting</a>
          <a href="#">Testing (JUnit, Jest, Selenium)</a>
          <a href="#">Agile & Scrum</a>
        </div>
      )}

      {/* FOR STUDENTS MENU */}
      {activeSection === "for-students" && (
        <div className="students-content">
          <p>For Students content - Navigation items would go here</p>
        </div>
      )}

      {/* ROADMAPS MENU */}
      {activeSection === "roadmaps" && (
        <div className="roadmaps-content">
          <p>Roadmaps content will be added here</p>
        </div>
      )}
    </header>
  );
}