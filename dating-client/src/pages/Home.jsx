import { useState } from "react";
import useFetchUsers from "../../hooks/fetchUsersHook"; // Adjust the path as necessary
import useSearchById from "../../hooks/userSearch"; // Import the searchById hook
import SkeletonCard from "../components/SkeletonCard"; // Adjust the path as necessary
import Navbar from "../components/Navbar"; // Import the Navbar component

const Home = () => {
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState(""); // New state for input field
  const [searchType, setSearchType] = useState("id"); // State for search type ('id' or 'name')
  const {
    user: searchedUser,
    loading: searchLoading,
    error: searchError,
  } = useSearchById(searchTerm, searchType); // Hook with searchUserById

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
    }
  };

  // Filter users based on search term
  const filteredUsers = searchTerm
    ? searchedUser
      ? [searchedUser]
      : []
    : users;

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchInput(""); // Clear search input when changing type
    setSearchTerm(""); // Clear search term when changing type
  };

  if (usersLoading || searchLoading) {
    return (
      <div className="min-h-screen bg-black p-8">
        <Navbar />
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Our Users
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (usersError || searchError) {
    return (
      <div className="min-h-screen bg-black p-8">
        <Navbar />
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Our Users
        </h1>
        <p className="text-center text-white">
          No users found with this ID or name.
        </p>
        {/* Search Bar */}
        <div className="mb-8">
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className="select select-bordered w-full max-w-xs text-pink-200 mb-2"
          >
            <option value="id">Search by ID</option>
            <option value="name">Search by Name</option>
          </select>
          <input
            type="text"
            placeholder={`Search user by ${searchType}...`}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="input input-bordered w-full max-w-xs text-pink-200"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 mt-20">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-white mb-5">Users</h1>

      {/* Search Bar */}
      <div className="mb-10 flex gap-4">
        {" "}
        {/* Add gap-4 for spacing */}
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="select select-bordered w-full max-w-xs text-lg bg-pink-400 text-white mb-2"
        >
          <option value="id">Search by ID</option>
          <option value="name">Search by Name</option>
        </select>
        <input
          type="text"
          placeholder={`Search user by ${searchType}...`}
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input input-bordered w-full max-w-xs text-pink-200"
        />
      </div>

      {filteredUsers.length === 0 && searchTerm ? (
        <p className="text-center text-white">
          No user found with this {searchType}.
        </p>
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
