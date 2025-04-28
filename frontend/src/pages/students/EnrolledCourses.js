import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEnrolledCourses, unenrollCourse } from '../../Api/EnrollmentsApi';


const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');
  console.log(courses)
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);
  const fetchEnrolledCourses = async () => {
    try {
      const response = await getEnrolledCourses(token);
      setCourses(response?.data || []);
    } catch (error) {
      console.error("Error fetching enrolled courses", error);
    }
  };


  const handleUnenroll = async (courseId) => {
    try {
      console.log(courseId)
      await unenrollCourse(courseId, token)
      fetchEnrolledCourses()
      toast.success('Successfully unenrolled!');
    } catch (error) {
      toast.error("Failed to unenroll from course.");
      console.error("Error unenrolling:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Enrolled Courses</h2>
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                {course?.Course?.image && (
                  <img
                    src={course?.Course?.image}
                    className="card-img-top"
                    alt=""
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course?.Course?.title}</h5>
                  <p className="card-text">{course?.Course?.description}</p>
                  <div className="mt-auto">
                    <p className="text-muted">Duration: {course?.Course?.duration}</p>
                    <p className="fw-bold">Price: {course?.Course?.price}</p>
                    <button
                      onClick={() => handleUnenroll(course?.courseId)}
                      className="btn btn-danger w-100"
                    >delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">You are not enrolled in any courses yet.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default EnrolledCourses;
