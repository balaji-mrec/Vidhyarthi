import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import roadmapService from '../services/roadmapService';

const RoadmapDetails = () => {
    const { id } = useParams();
    const { isLoggedIn } = useAuth();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activePhase, setActivePhase] = useState(0);

    useEffect(() => {
        fetchRoadmap();
    }, [id]);

    const fetchRoadmap = async () => {
        try {
            const data = await roadmapService.getRoadmap(id);
            setRoadmap(data.data);
        } catch (error) {
            console.error('Error fetching roadmap:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!isLoggedIn) {
            alert('Please login to follow this roadmap');
            return;
        }

        try {
            await roadmapService.followRoadmap(id);
            alert('Roadmap follow status updated!');
            fetchRoadmap();
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

    if (!roadmap) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Roadmap Not Found</h2>
                <Link to="/roadmaps" className="text-blue-600 hover:underline">
                    ← Back to Roadmaps
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
                <div className="container mx-auto px-4">
                    <Link to="/roadmaps" className="text-white hover:text-blue-200 mb-4 inline-block">
                        ← Back to Roadmaps
                    </Link>
                    <div className="max-w-4xl">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                {roadmap.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                roadmap.difficulty === 'Beginner' ? 'bg-green-400/80' :
                                roadmap.difficulty === 'Intermediate' ? 'bg-yellow-400/80' :
                                'bg-red-400/80'
                            }`}>
                                {roadmap.difficulty}
                            </span>
                            {roadmap.featured && (
                                <span className="bg-yellow-400/80 px-3 py-1 rounded-full text-sm">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{roadmap.title}</h1>
                        <p className="text-xl opacity-90 mb-6">{roadmap.description}</p>
                        <div className="flex items-center space-x-6 text-sm">
                            <span>⏱️ {roadmap.duration}</span>
                            <span>👥 {roadmap.followers?.length || 0} followers</span>
                            <span>👁️ {roadmap.views || 0} views</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            
                            {/* Skills */}
                            {roadmap.skills && roadmap.skills.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-bold mb-3">Skills You'll Gain</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {roadmap.skills.map((skill, index) => (
                                            <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Prerequisites */}
                            {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-bold mb-3">Prerequisites</h3>
                                    <ul className="space-y-2">
                                        {roadmap.prerequisites.map((prereq, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-blue-500 mr-2">•</span>
                                                <span>{prereq}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Target Audience */}
                            {roadmap.targetAudience && roadmap.targetAudience.length > 0 && (
                                <div>
                                    <h3 className="font-bold mb-3">Who Should Follow This?</h3>
                                    <ul className="space-y-2">
                                        {roadmap.targetAudience.map((audience, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span>{audience}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Learning Path */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Learning Path</h2>
                            {roadmap.steps && roadmap.steps.length > 0 ? (
                                <div className="space-y-6">
                                    {roadmap.steps.map((step, index) => (
                                        <div key={index} className="border-l-4 border-indigo-600 pl-6 pb-6 relative">
                                            {/* Circle */}
                                            <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {index + 1}
                                            </div>
                                            
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-bold">{step.phase}</h3>
                                                    {step.duration && (
                                                        <span className="text-sm text-gray-600">⏱️ {step.duration}</span>
                                                    )}
                                                </div>

                                                {/* Topics */}
                                                {step.topics && step.topics.length > 0 && (
                                                    <div className="mt-4 space-y-3">
                                                        {step.topics.map((topic, topicIndex) => (
                                                            <div key={topicIndex} className="bg-white rounded p-3">
                                                                <h4 className="font-semibold mb-1">{topic.name}</h4>
                                                                {topic.description && (
                                                                    <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                                                                )}
                                                                {topic.skills && topic.skills.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                                        {topic.skills.map((skill, skillIndex) => (
                                                                            <span key={skillIndex} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                                                                                {skill}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Milestones */}
                                                {step.milestones && step.milestones.length > 0 && (
                                                    <div className="mt-4">
                                                        <h4 className="font-semibold text-sm mb-2">🎯 Milestones:</h4>
                                                        <ul className="space-y-1">
                                                            {step.milestones.map((milestone, milestoneIndex) => (
                                                                <li key={milestoneIndex} className="text-sm text-gray-700">
                                                                    • {milestone}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No learning path available</p>
                            )}
                        </div>

                        {/* Career Options */}
                        {roadmap.careerOptions && roadmap.careerOptions.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-4">Career Opportunities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {roadmap.careerOptions.map((career, index) => (
                                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="text-2xl mr-3">💼</span>
                                            <span className="font-semibold">{career}</span>
                                        </div>
                                    ))}
                                </div>
                                {roadmap.salaryRange && (
                                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                        <p className="text-center">
                                            <span className="font-semibold">Salary Range: </span>
                                            ₹{(roadmap.salaryRange.min / 100000).toFixed(1)}L - 
                                            ₹{(roadmap.salaryRange.max / 100000).toFixed(1)}L per annum
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 space-y-4">
                            <button
                                onClick={handleFollow}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                            >
                                {isLoggedIn ? 'Follow Roadmap' : 'Login to Follow'}
                            </button>

                            {/* Stats */}
                            <div className="border-t pt-4 space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-semibold">{roadmap.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Difficulty</span>
                                    <span className="font-semibold">{roadmap.difficulty}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Phases</span>
                                    <span className="font-semibold">{roadmap.steps?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Followers</span>
                                    <span className="font-semibold">{roadmap.followers?.length || 0}</span>
                                </div>
                                {roadmap.demandTrend && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Market Demand</span>
                                        <span className={`font-semibold ${
                                            roadmap.demandTrend === 'High' ? 'text-green-600' :
                                            roadmap.demandTrend === 'Medium' ? 'text-yellow-600' :
                                            'text-gray-600'
                                        }`}>
                                            {roadmap.demandTrend}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Related Courses */}
                            {roadmap.relatedCourses && roadmap.relatedCourses.length > 0 && (
                                <div className="border-t pt-4">
                                    <h3 className="font-bold mb-3">Related Courses</h3>
                                    <div className="space-y-2">
                                        {roadmap.relatedCourses.slice(0, 3).map((course) => (
                                            <Link
                                                key={course._id}
                                                to={`/courses/${course._id}`}
                                                className="block p-2 bg-gray-50 rounded hover:bg-gray-100 transition"
                                            >
                                                <p className="text-sm font-semibold line-clamp-1">{course.courseName}</p>
                                                <p className="text-xs text-gray-600">{course.difficulty}</p>
                                            </Link>
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

export default RoadmapDetails;