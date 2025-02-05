import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import "../css/LoginPage.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.opacity = 0;
    setTimeout(() => {
      loginContainer.style.transition = 'opacity 0.5s';
      loginContainer.style.opacity = 1;
    }, 100);
  }, []);

  const onSubmit = (data) => {
    const existingUser = localStorage.getItem('userData');
    if (!existingUser) {
      alert('Invalid credentials!');
      return;
    }

    const userData = JSON.parse(existingUser);
    if (userData.password === data.password) {
      // onLogin(userData);
      alert("Login Successful!");
      reset();
      navigate('/welcome');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100" 
         style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <motion.div
        className="card login-card shadow-lg p-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          borderRadius: '15px', 
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">Welcome Back</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email")}
              style={{ 
                borderColor: errors.email ? 'red' : '#007bff', 
                borderRadius: '10px', 
                background: '#f8f9fa'
              }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password")}
              style={{ 
                borderColor: errors.password ? 'red' : '#007bff', 
                borderRadius: '10px', 
                background: '#f8f9fa'
              }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <motion.button
            type="submit"
            className="btn w-100"
            style={{ 
              background: 'linear-gradient(to right, #00c6ff, #0072ff)', 
              borderRadius: '10px', 
              color: '#fff' 
            }} 
            whileHover={{ 
              scale: 1.05, 
              background: 'linear-gradient(to right, #0072ff, #00c6ff)' 
            }} 
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <div className="text-center mt-3">
          <Link to="/register" style={{ color: '#007bff' }}>Don't have an account? Register here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
