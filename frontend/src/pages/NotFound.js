import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_1280.jpg"
          alt="Page not found"
          className="img-fluid mb-4"
          style={{ maxWidth: '500px' }}
        />
        <h1 className="display-4 fw-bold text-danger mb-3">404 - Page Not Found</h1>
        <p className="lead mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link 
            to="/" 
            className="btn btn-primary btn-lg px-4 gap-3"
          >
            <i className="bi bi-house-door me-2"></i>
            Go to Homepage
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default NotFound;