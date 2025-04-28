
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../../Api/AuthApi';
const Login = () => {
    const Navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);
            if (response?.message) {
                toast.success(response.message);
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);
                console.log('Login successful:', response);
                setTimeout(() => {
                    Navigate("/all-courses");
                }, 2000);
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            toast.error("An error during login.");
            console.error("Error during login:", error);
        }

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password.message}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                            <p className="text-center mt-3">
                                <Link to="/register" style={{ textDecoration: 'underline', color: 'blue' }}>
                                    Back to Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
};

export default Login;
