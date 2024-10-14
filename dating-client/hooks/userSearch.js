import { useState, useEffect } from 'react';

const useSearchById = (term, searchType) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!term) return; // If no search term is provided
            setLoading(true);
            setError(null); // Reset error state
            try {
                // Determine the API endpoint based on the search type
                const endpoint = searchType === 'name'
                    ? `http://localhost:5069/api/users/name/${term}`
                    : `http://localhost:5069/api/users/id/${term}`; // Adjust this to your actual endpoint for ID

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, [term, searchType]); 

    return { user, loading, error };
};

export default useSearchById;
