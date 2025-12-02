import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';

const ForCoders = () => {
    const { isLoggedIn } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        difficulty: '',
        search: ''
    });

    useEffect(() => {
        fetchCourses();
    }, [filters]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await courseService.getCourses(filters);
            setCourses(data.data || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleEnroll = async (courseId) => {
        if (!isLoggedIn) {
            alert('Please login to enroll in courses');
            return;
        }

        try {
            await courseService.enrollCourse(courseId);
            alert('Enrolled successfully!');
            fetchCourses();
        } catch (error) {
            alert(error);
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Learn to Code 💻</h1>
                    <p className="text-xl opacity-90 mb-8">
                        Master programming languages with interactive tutorials
                    </p>
                </div>
            </section>

            {/* Filters */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search courses..."
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Categories</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Programming">Programming</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Database">Database</option>
                        </select>
                        <select
                            name="difficulty"
                            value={filters.difficulty}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                                <div className="text-6xl">💻</div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-blue-600 uppercase">
                                        {course.category}
                                    </span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                        course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {course.difficulty}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.courseName}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>
                                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                                    <span>⏱️ {course.duration || 'Self-paced'}</span>
                                    <span>👥 {course.enrolledStudents || 0}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <Link 
                                        to={`/courses/${course._id}`}
                                        className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View Course
                                    </Link>
                                    <button
                                        onClick={() => handleEnroll(course._id)}
                                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {courses.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-gray-600 text-lg mb-2">No courses found</p>
                        <p className="text-gray-500">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* Popular Languages Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Popular Languages</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'HTML', icon: '🌐' },
                            { name: 'CSS', icon: '🎨' },
                            { name: 'JavaScript', icon: '⚡' },
                            { name: 'Python', icon: '🐍' },
                            { name: 'Java', icon: '☕' },
                            { name: 'C++', icon: '⚙️' }
                        ].map((lang) => (
                            <div key={lang.name} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition cursor-pointer hover:shadow-md">
                                <div className="text-4xl mb-2">{lang.icon}</div>
                                <div className="font-semibold">{lang.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Learn With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-xl font-bold mb-2">Interactive Tutorials</h3>
                            <p className="text-gray-600">
                                Learn by doing with hands-on coding exercises
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-xl font-bold mb-2">Real Projects</h3>
                            <p className="text-gray-600">
                                Build actual projects to strengthen your skills
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <div className="text-5xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold mb-2">Certificates</h3>
                            <p className="text-gray-600">
                                Earn certificates to showcase your achievements
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForCoders;