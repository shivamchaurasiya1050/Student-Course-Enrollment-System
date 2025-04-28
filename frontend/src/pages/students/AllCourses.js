import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCourse, getAllCourses } from '../../Api/CoursesApi';
import { addEnrollmentUser, getEnrolledCourses } from '../../Api/EnrollmentsApi';
import { useNavigate } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchCourses();
  }, [page, searchTerm]);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses(token, page, limit, searchTerm);
      setCourses(response?.data?.data || []);
      setTotalPages(response?.data?.pagination?.totalPages || 1);

      const enrolledData = await getEnrolledCourses(token);
      const enrolledCourseIds = enrolledData.data.map((enrollment) => enrollment.courseId);
      setEnrolledCourses(enrolledCourseIds);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load courses');
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const response = await addEnrollmentUser(courseId, token);
      toast.success(response.message);
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to enroll in course');
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await deleteCourse(courseId, token);
      toast.success(response.message);
      fetchCourses();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete course');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Courses</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                {course.image && (
                  <img
                    src={course.image}
                    className="card-img-top"
                    alt=""
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course?.title}</h5>
                  <p className="card-text">{course?.description}</p>
                  <div className="mt-auto">
                    <p className="text-muted">Duration: {course?.duration}</p>
                    <p className="fw-bold">Price: {course?.price}</p>
                    {user.role === "admin" ? (
                      <>
                        <button
                          className="btn btn-primary w-100 mt-3"
                          onClick={() => handleEdit(course.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger w-100 mt-3"
                          onClick={() => handleDelete(course.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : !enrolledCourses.includes(course.id) && (
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => handleEnroll(course.id)}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No courses available right now.</p>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary mx-2"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="align-self-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn ${page === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="btn btn-secondary mx-2"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AllCourses;
