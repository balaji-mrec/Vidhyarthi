import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-profile-container" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="user-profile-btn"
      >
        <span className="user-initials">
          {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-info-name">{user?.name || 'User'}</div>
            <div className="user-info-email">{user?.email}</div>
          </div>
          <div className="dropdown-divider"></div>
          <a
            href="/profile"
            className="dropdown-item"
            onClick={() => setIsDropdownOpen(false)}
          >
            👤 Profile
          </a>
          <a
            href="/settings"
            className="dropdown-item"
            onClick={() => setIsDropdownOpen(false)}
          >
            ⚙️ Settings
          </a>
          <div className="dropdown-divider"></div>
          <button
            onClick={handleLogout}
            className="dropdown-item logout-btn"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
