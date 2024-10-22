import { useState, useEffect } from 'react';

const useSearchById = (name) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserById = async () => {
            if (!name) return; //if no name is provided
            setLoading(true);
            setError(null); //reset error state
            try {
                const response = await fetch(`http://localhost:5069/api/users/name/${name}`);
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

        fetchUserById();
    }, [name]);

    return { user, loading, error };
};

export default useSearchById;
