import { useState } from "react";
import "./LanguageLayout.css";

export default function LanguageLayout({ title, topics = [], children }) {
  const [activeTopic, setActiveTopic] = useState(topics[0] || "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter topics based on search query
  const filteredTopics = topics.filter(topic => 
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="language-layout">
      {/* ===== Left Sidebar ===== */}
      <aside className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-head">
          <div className="sidebar-header-content">
            <span className="sidebar-title-text">{title} Tutorial</span>
          </div>
          
          <button
            className="sidebar-toggle"
            aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
            title={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
            onClick={() => setIsSidebarOpen((v) => !v)}
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {filteredTopics.map((topic, index) => (
              <button
                key={topic}
                className={`sidebar-item ${activeTopic === topic ? "active" : ""}`}
                onClick={() => setActiveTopic(topic)}
                title={topic}
                data-number={index < 9 ? `0${index + 1}` : index + 1}
              >
                <span className="sidebar-item-label">{topic}</span>
                {activeTopic === topic && <div className="active-indicator"></div>}
              </button>
            ))}
            
            {filteredTopics.length === 0 && (
              <div className="no-results">
                No topics found for "{searchQuery}"
              </div>
            )}
          </div>

          <div className="nav-divider"></div>
        </nav>
      </aside>

      {/* ===== Main Content Area ===== */}
      <main className="content">
        <div className="content-header">
          <div className="header-content">
            <div>
              <h1 className="content-title">{activeTopic}</h1>
             
            </div>
            
            
          </div>
        </div>
        
        <div className="content-body">
          {typeof children === "function" ? children(activeTopic) : children}
          
          {/* Navigation Buttons */}
          <div className="content-navigation">
            <button className="nav-btn prev">
              <span className="nav-btn-icon">←</span>
              <div className="nav-btn-content">
                <span className="nav-btn-label">Previous</span>
                <span className="nav-btn-topic">HTML Images</span>
              </div>
            </button>
            
            <button className="nav-btn next">
              <div className="nav-btn-content">
                <span className="nav-btn-label">Next</span>
                <span className="nav-btn-topic">HTML Tables</span>
              </div>
              <span className="nav-btn-icon">→</span>
            </button>
          </div>
        </div>
      </main>
      
      <aside className="rail">
        {/* Ad content goes here */}
      </aside>
    </div>
  );
}