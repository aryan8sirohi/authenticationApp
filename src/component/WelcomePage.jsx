import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import WithAuth from './Auth/useAuth';

const WelcomePage = ({ username }) => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100" 
             style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
            <div className="text-center text-white">
                <h1 className="display-4">Welcome, {username}!</h1>
                <p className="lead">You can manage your account details here.</p>
                <Link to="/account" className="btn btn-light btn-lg mt-3">Edit Account Details</Link>
            </div>
        </div>
    );
};

export default WithAuth(WelcomePage);
