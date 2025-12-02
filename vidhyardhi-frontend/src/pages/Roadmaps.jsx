import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import roadmapService from '../services/roadmapService';

const Roadmaps = () => {
    const { isLoggedIn } = useAuth();
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        difficulty: '',
        search: ''
    });

    useEffect(() => {
        fetchRoadmaps();
    }, [filters]);

    const fetchRoadmaps = async () => {
        setLoading(true);
        try {
            const data = await roadmapService.getRoadmaps(filters);
            setRoadmaps(data.data || []);
        } catch (error) {
            console.error('Error fetching roadmaps:', error);
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

    const handleFollow = async (roadmapId) => {
        if (!isLoggedIn) {
            alert('Please login to follow roadmaps');
            return;
        }

        try {
            await roadmapService.followRoadmap(roadmapId);
            alert('Roadmap follow status updated!');
            fetchRoadmaps();
        } catch (error) {
            alert(error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="relative">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
                        🗺️
                    </div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Loading roadmaps...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Animated Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                        🚀 Your Journey Starts Here
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-down">
                        Career Roadmaps 🗺️
                    </h1>
                    <p className="text-2xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in-up">
                        Step-by-step guides to achieve your career goals with expert-curated paths
                    </p>
                    <div className="flex justify-center gap-4 animate-fade-in">
                        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                            <span className="font-bold text-3xl">{roadmaps.length}+</span>
                            <span className="ml-2">Roadmaps</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                            <span className="font-bold text-3xl">10k+</span>
                            <span className="ml-2">Users</span>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto">
                        <path fill="#F9FAFB" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                    </svg>
                </div>
            </section>

            {/* Enhanced Filters */}
            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    <div className="flex items-center mb-6">
                        <span className="text-2xl mr-3">🔍</span>
                        <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Path</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search roadmaps..."
                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-lg"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                🔎
                            </span>
                        </div>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-lg cursor-pointer"
                        >
                            <option value="">📚 All Categories</option>
                            <option value="Career">💼 Career</option>
                            <option value="Technology">💻 Technology</option>
                            <option value="Exam Preparation">📝 Exam Preparation</option>
                            <option value="Skill Development">🎯 Skill Development</option>
                        </select>
                        <select
                            name="difficulty"
                            value={filters.difficulty}
                            onChange={handleFilterChange}
                            className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-lg cursor-pointer"
                        >
                            <option value="">📊 All Levels</option>
                            <option value="Beginner">🌱 Beginner</option>
                            <option value="Intermediate">🔥 Intermediate</option>
                            <option value="Advanced">⚡ Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Roadmaps Grid */}
            <div className="container mx-auto px-4 py-16">
                {roadmaps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roadmaps.map((roadmap, index) => (
                            <div 
                                key={roadmap._id} 
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Premium Gradient Header */}
                                <div className="relative h-56 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute w-32 h-32 bg-white rounded-full -top-8 -left-8 group-hover:scale-150 transition-transform duration-700"></div>
                                        <div className="absolute w-24 h-24 bg-white rounded-full top-12 right-8 group-hover:scale-150 transition-transform duration-700"></div>
                                    </div>
                                    
                                    <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                                        <div className="text-7xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                            🗺️
                                        </div>
                                        <div className="text-lg font-semibold bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                            ⏱️ {roadmap.duration}
                                        </div>
                                    </div>

                                    {/* Difficulty Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                                            roadmap.difficulty === 'Beginner' ? 'bg-green-500' :
                                            roadmap.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                                            'bg-red-500'
                                        } text-white`}>
                                            {roadmap.difficulty === 'Beginner' ? '🌱' : roadmap.difficulty === 'Intermediate' ? '🔥' : '⚡'} {roadmap.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                            {roadmap.category}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                        {roadmap.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {roadmap.description}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
                                            <div className="text-2xl font-bold text-indigo-600">{roadmap.steps?.length || 0}</div>
                                            <div className="text-xs text-gray-600">Phases</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center">
                                            <div className="text-2xl font-bold text-purple-600">{roadmap.followers?.length || 0}</div>
                                            <div className="text-xs text-gray-600">Followers</div>
                                        </div>
                                    </div>

                                    {/* Skills Tags */}
                                    {roadmap.skills && roadmap.skills.length > 0 && (
                                        <div className="mb-6">
                                            <div className="flex flex-wrap gap-2">
                                                {roadmap.skills.slice(0, 3).map((skill, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {roadmap.skills.length > 3 && (
                                                    <span className="text-xs text-gray-500 font-medium">+{roadmap.skills.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Link 
                                            to={`/roadmaps/${roadmap._id}`}
                                            className="flex-1 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
                                        >
                                            View Roadmap →
                                        </Link>
                                        <button
                                            onClick={() => handleFollow(roadmap._id)}
                                            className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-105"
                                            title="Follow this roadmap"
                                        >
                                            ⭐
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Enhanced Empty State */
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto">
                        <div className="text-8xl mb-6 animate-bounce">🗺️</div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">No Roadmaps Found</h3>
                        <p className="text-gray-600 text-lg mb-8">
                            Try adjusting your filters or search criteria
                        </p>
                        <button
                            onClick={() => setFilters({ category: '', difficulty: '', search: '' })}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Popular Career Paths - Enhanced */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Career Paths 🚀</h2>
                        <p className="text-gray-600 text-lg">Trending roadmaps chosen by thousands of learners</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Full Stack Developer', icon: '💻', color: 'from-blue-500 to-cyan-500', jobs: '50k+ Jobs' },
                            { title: 'Data Scientist', icon: '📊', color: 'from-green-500 to-teal-500', jobs: '30k+ Jobs' },
                            { title: 'DevOps Engineer', icon: '⚙️', color: 'from-orange-500 to-red-500', jobs: '25k+ Jobs' },
                            { title: 'UI/UX Designer', icon: '🎨', color: 'from-purple-500 to-pink-500', jobs: '20k+ Jobs' }
                        ].map((path, index) => (
                            <div 
                                key={index} 
                                className={`group relative bg-gradient-to-br ${path.color} text-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <div className="relative z-10">
                                    <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{path.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                                    <p className="text-sm opacity-90">{path.jobs}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Enhanced */}
            <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Roadmaps? ✨</h2>
                        <p className="text-gray-600 text-lg">Everything you need to succeed in your career journey</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '🎯', title: 'Clear Direction', desc: 'Step-by-step guidance from beginner to expert with no confusion', color: 'from-blue-500 to-cyan-500' },
                            { icon: '📚', title: 'Curated Resources', desc: 'Hand-picked learning materials and courses by industry experts', color: 'from-purple-500 to-pink-500' },
                            { icon: '⏱️', title: 'Time Estimates', desc: 'Know exactly how long each phase will take to complete', color: 'from-orange-500 to-red-500' }
                        ].map((feature, index) => (
                            <div key={index} className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className={`inline-block p-6 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <div className="text-5xl">{feature.icon}</div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Roadmaps;