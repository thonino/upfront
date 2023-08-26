import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        setLoading(false);
    }, [user, navigate]);

    if (loading) return <div>Loading...</div>;

    return children;
}

export default PrivateRoute;
