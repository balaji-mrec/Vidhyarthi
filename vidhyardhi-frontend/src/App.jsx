// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import components
import Navbar from './components/Navbar';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Career from './pages/Career';
import ForCoders from './pages/ForCoders';
import ForStudents from './pages/ForStudents';
import Roadmaps from './pages/Roadmaps';
import RoadmapDetails from './pages/RoadmapDetails';
import CollegeDetails from './pages/CollegeDetails';

// Import language pages
import HTML from './pages/languages/HTML';

// Import Java components
import JavaLayout from './pages/languages/java/JavaLayout';
import JavaTopic from './pages/languages/java/JavaTopic';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* ===== Public Routes ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consultancy" element={<Career />} />
          <Route path="/colleges/:id" element={<CollegeDetails />} />

          {/* ===== Protected Routes (require login) ===== */}
          <Route
            path="/for-coders"
            element={
              <ProtectedRoute>
                <ForCoders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/for-students"
            element={
              <ProtectedRoute>
                <ForStudents />
              </ProtectedRoute>
            }
          />

          {/* ===== Roadmaps Routes ===== */}
          <Route
            path="/roadmaps"
            element={
              <ProtectedRoute>
                <Roadmaps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmaps/:id"
            element={
              <ProtectedRoute>
                <RoadmapDetails />
              </ProtectedRoute>
            }
          />

          {/* ===== Language Routes ===== */}
          {/* HTML Section */}
          <Route path="/languages/html" element={<HTML />} />

          {/* ===== Java Section (Nested Routing) ===== */}
          <Route path="/languages/java" element={<JavaLayout />}>
            {/* Default redirect → first topic */}
            <Route index element={<Navigate to="history" replace />} />

            {/* Topic pages */}
            <Route path=":slug" element={<JavaTopic />} />
            <Route path=":slug/:subslug" element={<JavaTopic />} />
          </Route>

          {/* ===== Admin Routes (require admin role) ===== */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                {/* Admin Dashboard Component goes here */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;