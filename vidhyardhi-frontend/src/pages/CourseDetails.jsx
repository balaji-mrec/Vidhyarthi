import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';

const CourseDetails = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const [course, setCourse] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const data = await courseService.getCourse(id);
            setCourse(data.data.course);
            setTopics(data.data.topics || []);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!isLoggedIn) {
            alert('Please login to enroll');
            return;
        }

        try {
            await courseService.enrollCourse(id);
            alert('Enrolled successfully! Start learning now.');
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

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Course Not Found</h2>
                <Link to="/for-coders" className="text-blue-600 hover:underline">
                    ← Back to Courses
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4">
                    <Link to="/for-coders" className="text-white hover:text-blue-200 mb-4 inline-block">
                        ← Back to Courses
                    </Link>
                    <div className="max-w-4xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                {course.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                course.difficulty === 'Beginner' ? 'bg-green-400/80' :
                                course.difficulty === 'Intermediate' ? 'bg-yellow-400/80' :
                                'bg-red-400/80'
                            }`}>
                                {course.difficulty}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{course.courseName}</h1>
                        <p className="text-xl opacity-90 mb-6">{course.description}</p>
                        <div className="flex items-center space-x-6 text-sm">
                            <span>⏱️ {course.duration || 'Self-paced'}</span>
                            <span>👥 {course.enrolledStudents || 0} students</span>
                            {course.rating?.average > 0 && (
                                <span>⭐ {course.rating.average.toFixed(1)}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* What You'll Learn */}
                        {course.whatYouLearn && course.whatYouLearn.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                                <ul className="space-y-2">
                                    {course.whatYouLearn.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Course Content */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                            <div className="space-y-3">
                                {topics.length > 0 ? (
                                    topics.map((topic) => (
                                        <Link
                                            key={topic._id}
                                            to={`/topics/${topic._id}`}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                                    {topic.order}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{topic.topicName}</h3>
                                                    {topic.duration && (
                                                        <p className="text-sm text-gray-600">⏱️ {topic.duration}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-blue-600">→</span>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-center py-8">No topics available yet</p>
                                )}
                            </div>
                        </div>

                        {/* Prerequisites */}
                        {course.prerequisites && course.prerequisites.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                                <ul className="space-y-2">
                                    {course.prerequisites.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4">💻</div>
                                <h3 className="text-2xl font-bold mb-2">
                                    {course.isPremium ? 'Premium Course' : 'Free Course'}
                                </h3>
                                {course.isPremium && (
                                    <div className="text-3xl font-bold text-blue-600 mb-4">₹999</div>
                                )}
                            </div>

                            {isLoggedIn ? (
                                <button
                                    onClick={handleEnroll}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-4"
                                >
                                    Enroll Now
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mb-4"
                                >
                                    Login to Enroll
                                </Link>
                            )}

                            <div className="space-y-3 text-sm text-gray-600 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <span>Language</span>
                                    <span className="font-semibold">{course.language}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Duration</span>
                                    <span className="font-semibold">{course.duration || 'Self-paced'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Difficulty</span>
                                    <span className="font-semibold">{course.difficulty}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Students</span>
                                    <span className="font-semibold">{course.enrolledStudents || 0}</span>
                                </div>
                            </div>

                            {course.tags && course.tags.length > 0 && (
                                <div className="border-t pt-4 mt-4">
                                    <h4 className="font-semibold mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;