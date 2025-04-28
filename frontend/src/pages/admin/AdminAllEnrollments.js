import React, { useEffect, useState } from 'react';
import { getAllEnrolledCourses, getEnrolledCourses } from '../../Api/EnrollmentsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAllEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAllEnrollments();
  }, []);

  const fetchAllEnrollments = async () => {
    try {
      const response = await getAllEnrolledCourses(token);
      console.log(response.data)
      setEnrollments(response.data);  
    } catch (error) {
      console.error(error);
      toast.error('Failed to load enrollments!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Enrollments</h2>
      <div className="table-responsive">
        {enrollments.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Course Title</th>
                <th>Course Price</th>
                <th>Enrolled Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, index) => (
                <tr key={enrollment.id}>
                  <td>{index + 1}</td>
                  <td>{enrollment.User?.firstName || 'N/A'}</td>
                  <td>{enrollment.User?.email || 'N/A'}</td>
                  <td>{enrollment.Course?.title || 'N/A'}</td>
                  <td>{enrollment.Course?.price || 'N/A'}</td>
                  <td>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No enrollments found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminAllEnrollments;
