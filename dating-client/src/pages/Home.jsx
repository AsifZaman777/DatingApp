// src/pages/Home.js
import useFetchUsers from '../../hooks/fetchUsersHook'; // Adjust the path as necessary
import SkeletonCard from '../components/SkeletonCard'; // Adjust the path as necessary
import Navbar from '../components/Navbar'; // Import the Navbar component

const Home = () => {
    const { users, loading, error } = useFetchUsers();

    if (loading) {
        // Render skeleton cards while loading
        return (
            <div className="min-h-screen bg-black p-8">
                <Navbar />
                <h1 className="text-3xl font-bold text-center text-white mb-8">Our Users</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Render multiple skeleton cards */}
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="min-h-screen bg-black p-8">
            <Navbar />
            <h1 className="text-3xl font-bold text-center text-white mb-8">Our Users</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {users.map((user) => (
                    <div 
                        key={user.id} 
                        className="card bg-neutral-800 shadow-lg transition-transform transform hover:scale-105"
                    >
                        <figure>
                            <img
                                src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`} // Placeholder image
                                alt={user.username}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="text-xl font-bold text-white mb-2">{user.username}</h2>
                            <p className="text-gray-400">{user.email}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Profile</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
