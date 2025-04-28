import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user= JSON.parse(localStorage.getItem('user'))
  console.log(user?.role)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    setTimeout(() => {
        navigate('/login');
    }, 2000);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">CourseApp</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all-courses">All Courses</Link>
            </li>
            {
                user?.role=="admin"?
                    <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/add-course">Add Course</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/all-enrolled-courses">All Enrollments</Link>
                    </li>
                  </>
                :  <>
                <li className="nav-item">
                  <Link className="nav-link" to="/enrolled-courses">My Courses</Link>
                </li>
               
              </>
            }
            {token && (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer />
      <div className="navbar-brand">

      {user?.role}
      </div>
    </nav>
  );
};

export default Navbar;
