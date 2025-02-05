import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const WithAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const user = JSON.parse(localStorage.getItem("userData") || "{}"); // Get user data from local storage

    useEffect(() => {
      // Check if user is authenticated
      if (!user || !user.username) {
        // If user is not logged in, redirect to the login page
        navigate('/'); // Use navigate for redirection
      }
    }, [user, navigate]); // Dependency array includes user and navigate

    // If user is logged in, render the wrapped component
    return user && user.username ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default WithAuth;