import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get('http://localhost:3000/auth/verify', { withCredentials: true });
                if (!res.data.status) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Verification failed:', error);
                navigate('/');
            }
        };

        verifyUser();
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
        </div>
    );
};

export default Dashboard;
