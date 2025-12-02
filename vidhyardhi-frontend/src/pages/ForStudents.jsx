import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import examService from '../services/examService';
import questionService from '../services/questionService';

const ForStudents = () => {
    const [exams, setExams] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('exams');
    const [filters, setFilters] = useState({
        category: '',
        level: ''
    });

    useEffect(() => {
        fetchData();
    }, [filters, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'exams') {
                const data = await examService.getExams(filters);
                setExams(data.data);
            } else if (activeTab === 'practice') {
                const data = await questionService.getQuestions({ limit: 20 });
                setQuestions(data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
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
            <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Exam Preparation 📚</h1>
                    <p className="text-xl opacity-90 mb-8">
                        Prepare for competitive exams with mock tests and practice questions
                    </p>
                </div>
            </section>

            {/* Tabs */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('exams')}
                            className={`flex-1 py-4 font-semibold transition ${
                                activeTab === 'exams'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            📝 Exams
                        </button>
                        <button
                            onClick={() => setActiveTab('practice')}
                            className={`flex-1 py-4 font-semibold transition ${
                                activeTab === 'practice'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            ✍️ Practice Questions
                        </button>
                        <button
                            onClick={() => setActiveTab('mock-tests')}
                            className={`flex-1 py-4 font-semibold transition ${
                                activeTab === 'mock-tests'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            🎯 Mock Tests
                        </button>
                    </div>
                </div>

                {/* Exams Tab */}
                {activeTab === 'exams' && (
                    <div>
                        {/* Filters */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">All Categories</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Management">Management</option>
                                    <option value="Law">Law</option>
                                    <option value="Government Jobs">Government Jobs</option>
                                </select>
                                <select
                                    name="level"
                                    value={filters.level}
                                    onChange={handleFilterChange}
                                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">All Levels</option>
                                    <option value="National">National</option>
                                    <option value="State">State</option>
                                    <option value="University">University</option>
                                </select>
                            </div>
                        </div>

                        {/* Exams Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {exams.map((exam) => (
                                <div key={exam._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                                    <div className="h-32 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                                        <div className="text-6xl">
                                            {exam.category === 'Engineering' ? '⚙️' : 
                                             exam.category === 'Medical' ? '🏥' : 
                                             exam.category === 'Management' ? '💼' : 
                                             exam.category === 'Law' ? '⚖️' : '📚'}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-blue-600 uppercase">
                                                {exam.category}
                                            </span>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                                exam.level === 'National' ? 'bg-red-100 text-red-800' :
                                                exam.level === 'State' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {exam.level}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{exam.shortName}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {exam.description}
                                        </p>
                                        <div className="text-sm text-gray-600 mb-4">
                                            <p>📅 Conducted by: {exam.conductedBy}</p>
                                        </div>
                                        <Link 
                                            to={`/exams/${exam._id}`}
                                            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {exams.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                <div className="text-6xl mb-4">📚</div>
                                <p className="text-gray-600 text-lg">No exams found matching your filters</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Practice Questions Tab */}
                {activeTab === 'practice' && (
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
                            <p className="text-gray-600 mb-6">
                                Solve practice questions to test your knowledge
                            </p>

                            {questions.length > 0 ? (
                                <div className="space-y-6">
                                    {questions.map((question, index) => (
                                        <div key={question._id} className="border rounded-lg p-6 hover:bg-gray-50 transition">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-semibold text-blue-600">
                                                            {question.subject}
                                                        </span>
                                                        {question.topic && (
                                                            <span className="text-sm text-gray-600 ml-2">
                                                                • {question.topic}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                                    question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                                    question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {question.difficulty}
                                                </span>
                                            </div>
                                            <p className="text-lg font-medium mb-4">{question.question}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {question.options?.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        className="text-left p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                                                    >
                                                        <span className="font-semibold mr-2">
                                                            {String.fromCharCode(65 + idx)}.
                                                        </span>
                                                        {option.text}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">❓</div>
                                    <p className="text-gray-600 text-lg">No practice questions available yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Mock Tests Tab */}
                {activeTab === 'mock-tests' && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">Mock Tests</h2>
                        <p className="text-gray-600 mb-6">
                            Take full-length mock tests to simulate real exam experience
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {exams.slice(0, 6).map((exam) => (
                                <div key={exam._id} className="border rounded-lg p-6 hover:shadow-lg transition">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold">{exam.shortName}</h3>
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <p>📝 Questions: {exam.examPattern?.totalQuestions || 'N/A'}</p>
                                        <p>⏱️ Duration: {exam.examPattern?.duration || 'N/A'}</p>
                                        <p>📊 Marks: {exam.examPattern?.totalMarks || 'N/A'}</p>
                                    </div>
                                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                                        Start Mock Test
                                    </button>
                                </div>
                            ))}
                        </div>

                        {exams.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🎯</div>
                                <p className="text-gray-600 text-lg">No mock tests available yet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Practice With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">📊</div>
                            <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                            <p className="text-gray-600">
                                Track your progress with detailed performance analytics
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">⏱️</div>
                            <h3 className="text-xl font-bold mb-2">Timed Tests</h3>
                            <p className="text-gray-600">
                                Practice with real exam time constraints
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-xl font-bold mb-2">Detailed Solutions</h3>
                            <p className="text-gray-600">
                                Learn from comprehensive explanations for each question
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForStudents;