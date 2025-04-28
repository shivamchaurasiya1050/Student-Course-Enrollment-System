import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We provide high-quality courses designed to help you achieve your personal and professional goals!.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">Home</Link>
              </li>
             
            </ul>
          </div>
          <div className="col-md-4">
            <p>
              Email: admin@gmail.com<br />
              Phone: 234567890<br />
              Address: Lucknow Uttar Pradesh
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
