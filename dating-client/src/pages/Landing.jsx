import { FaHeart, FaComments, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/home'); 
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Dating App</h1>
                <p className="text-lg mb-6">Find your perfect match today!</p>

                <div className="flex space-x-8 mb-6">
                    <FaHeart className="text-pink-500 text-6xl hover:text-pink-600" />
                    <FaComments className="text-pink-500 text-6xl hover:text-pink-600" />
                    <FaUser className="text-pink-500 text-6xl hover:text-pink-600" />
                </div>

                <button 
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600" 
                    onClick={handleGetStarted}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Landing;
