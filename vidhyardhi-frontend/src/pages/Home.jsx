import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import collegeService from '../services/collegeService';
import examService from '../services/examService';
import courseService from '../services/courseService';

const Home = () => {
    const { user, isLoggedIn } = useAuth();
    const [featuredColleges, setFeaturedColleges] = useState([]);
    const [featuredExams, setFeaturedExams] = useState([]);
    const [popularCourses, setPopularCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            // Fetch featured colleges
            const collegesData = await collegeService.getColleges({ 
                featured: true, 
                limit: 6 
            });
            setFeaturedColleges(collegesData.data || []);

            // Fetch featured exams
            const examsData = await examService.getExams({ 
                featured: true, 
                limit: 4 
            });
            setFeaturedExams(examsData.data || []);

            // Fetch popular courses
            const coursesData = await courseService.getCourses({ 
                limit: 6 
            });
            setPopularCourses(coursesData.data || []);
        } catch (error) {
            console.error('Error fetching home data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Find Your College & Career Path 🎓
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Trusted guidance for admissions, exams, and career choices
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-2 flex">
                        <input
                            type="text"
                            placeholder="Search Colleges, Courses, Exams..."
                            className="flex-1 px-6 py-4 text-gray-800 outline-none rounded-l-lg"
                        />
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition font-semibold">
                            Search
                        </button>
                    </div>

                    {/* Welcome Message for Logged In Users */}
                    {isLoggedIn && (
                        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-semibold mb-2">
                                Welcome back, {user?.name}! 👋
                            </h2>
                            <p className="opacity-90">
                                Continue your learning journey
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Explore Categories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Explore by Category
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Career Card */}
                        <Link to="/consultancy" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold mb-2">Career</h3>
                            <p className="text-gray-600">
                                College profiles, branch clarity, admission guidance
                            </p>
                        </Link>

                        {/* For Coders Card */}
                        <Link to="/for-coders" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="text-5xl mb-4">💻</div>
                            <h3 className="text-xl font-bold mb-2">For Coders</h3>
                            <p className="text-gray-600">
                                Learn coding, build projects, practice problems
                            </p>
                        </Link>

                        {/* For Students Card */}
                        <Link to="/for-students" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="text-5xl mb-4">📚</div>
                            <h3 className="text-xl font-bold mb-2">For Students</h3>
                            <p className="text-gray-600">
                                Exam prep, mock tests, study materials
                            </p>
                        </Link>

                        {/* Roadmaps Card */}
                        <Link to="/roadmaps" className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="text-5xl mb-4">🗺️</div>
                            <h3 className="text-xl font-bold mb-2">Roadmaps</h3>
                            <p className="text-gray-600">
                                Complete career paths and learning guides
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Colleges */}
            {featuredColleges.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Featured Colleges 🏫</h2>
                            <Link to="/career" className="text-blue-600 hover:text-blue-700 font-semibold">
                                View All →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredColleges.map((college) => (
                                <div key={college._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                                    <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{college.name}</h3>
                                        <p className="text-gray-600 mb-2">
                                            📍 {college.location.city}, {college.location.state}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            🏫 {college.type}
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <span className="text-yellow-500">⭐</span>
                                                <span className="ml-1 font-semibold">
                                                    {college.rating?.average?.toFixed(1) || '0.0'}
                                                </span>
                                                <span className="text-gray-500 text-sm ml-1">
                                                    ({college.rating?.count || 0})
                                                </span>
                                            </div>
                                            {college.verified && (
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                        <Link 
                                            to={`/colleges/${college._id}`}
                                            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Exams */}
            {featuredExams.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Upcoming Exams 📝</h2>
                            <Link to="/for-students" className="text-blue-600 hover:text-blue-700 font-semibold">
                                View All →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredExams.map((exam) => (
                                <div key={exam._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                                    <div className="text-4xl mb-4">{exam.category === 'Engineering' ? '⚙️' : '🏥'}</div>
                                    <h3 className="text-xl font-bold mb-2">{exam.shortName}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exam.examName}</p>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600">
                                            📅 Level: {exam.level}
                                        </p>
                                        <p className="text-gray-600">
                                            📋 Category: {exam.category}
                                        </p>
                                    </div>
                                    <Link 
                                        to={`/exams/${exam._id}`}
                                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popular Courses */}
            {popularCourses.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Popular Courses 💻</h2>
                            <Link to="/for-coders" className="text-blue-600 hover:text-blue-700 font-semibold">
                                View All →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularCourses.map((course) => (
                                <div key={course._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                                            💻
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-bold text-lg line-clamp-1">{course.courseName}</h3>
                                            <p className="text-sm text-gray-600">{course.category}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {course.difficulty}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            👥 {course.enrolledStudents || 0} enrolled
                                        </span>
                                    </div>
                                    <Link 
                                        to={`/courses/${course._id}`}
                                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Start Learning
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">{featuredColleges.length}+</div>
                            <div className="text-lg opacity-90">Colleges</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">{featuredExams.length}+</div>
                            <div className="text-lg opacity-90">Exams</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">{popularCourses.length}+</div>
                            <div className="text-lg opacity-90">Courses</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">10k+</div>
                            <div className="text-lg opacity-90">Students</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!isLoggedIn && (
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Start Your Journey? 🚀
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of students achieving their goals
                        </p>
                        <Link 
                            to="/register"
                            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;