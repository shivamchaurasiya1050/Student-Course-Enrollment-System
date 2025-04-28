import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../Api/AuthApi';

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log('Registration Data:', data);
    const response = await registerUser(data)
    if (response?.data) {
      toast.success('Registered successfully!');
    }
    setTimeout(() => {
      navigate("/login")
    }, 2000);
    reset();
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  {...register('firstName', { required: 'First Name is required' })}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  {...register('lastName', { required: 'Last Name is required' })}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName.message}</div>
                )}
              </div>
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
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              <p className="text-center mt-3">
                <Link to="/login" style={{ textDecoration: 'underline', color: 'blue' }}>
                  Back to Login
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

export default Register;
