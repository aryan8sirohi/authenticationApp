// src/components/Register.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// Define the validation schema
const schema = yup.object().shape({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    fullName: yup.string().required('Full name is required'),
});

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const existingUser = localStorage.getItem(data.username);
        if (existingUser) {
            alert('Username already exists!');
            return;
        }
        localStorage.setItem("userData", JSON.stringify(data));
        alert('Registration successful!');
        navigate('/')
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" 
             style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
            <motion.div
                className="card shadow-lg p-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ 
                    borderRadius: '15px', 
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
                }}
            >
                <h3 className="text-center mb-4 text-primary fw-bold">Create an Account</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                            {...register("username")}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            {...register("email")}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            {...register("password")}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                            {...register("fullName")}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
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
                        Register
                    </motion.button>
                </form>
                <div className="text-center mt-3">
                    <Link to="/" style={{ color: '#007bff' }}>Already have an account? Login here</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;