import { useState } from 'react';
import useFetchUsers from '../../hooks/fetchUsersHook'; // Adjust the path as necessary
import useSearchById from '../../hooks/searchById'; // Import the searchById hook
import SkeletonCard from '../components/SkeletonCard'; // Adjust the path as necessary
import Navbar from '../components/Navbar'; // Import the Navbar component

const Home = () => {
    const { users, loading: usersLoading, error: usersError } = useFetchUsers();
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const { user: searchedUser, loading: searchLoading, error: searchError } = useSearchById(searchTerm); // Use the searchById hook

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term when input changes
    };

    // Filter users based on search term
    const filteredUsers = searchTerm
        ? searchedUser
            ? [searchedUser] // If search term is present and user is found, show only that user
            : []
        : users; // If no search term, show all users

    if (usersLoading || searchLoading) {
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

    if (usersError || searchError) {
        return <p className="text-red-500">Error: {usersError || searchError}</p>;
    }

    return (
        <div className="min-h-screen bg-black p-8 mt-20">
            <Navbar />
            <h1 className="text-3xl font-bold text-center text-white mb-8">Users</h1>

            {/* Search Bar */}
            <div className="mb-8">
                <input
                    type="number"
                    placeholder="Search user by ID..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="input input-bordered w-full max-w-xs text-pink-200"
                />
            </div>

            {filteredUsers.length === 0 && searchTerm ? (
                <p className="text-center text-white">No user found with this ID.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredUsers.map((user) => (
                        <div className="card bg-base-100 w-96 shadow-xl" key={user.id}>
                            <figure>
                                <img
                                    src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`} // Placeholder image
                                    alt={user.username}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{user.username}</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">View Profile</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
