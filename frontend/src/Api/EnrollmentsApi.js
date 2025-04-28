import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';
export const addEnrollmentUser = async (courseId,token) => {
  try {
    const response = await axios.post(`${apiUrl}/enroll/${courseId}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
    return response.data;
  } catch (error) {
    console.error("Error fetch courses data.", error);
    throw error;
  }
};


export const getEnrolledCourses = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/my-enrollments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
    return response.data;
  } catch (error) {
    console.error("Error fetch courses data.", error);
    throw error;
  }
};

export const unenrollCourse = async (courseId,token) => {
  try {
    const response = await axios.delete(`${apiUrl}/enroll/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
    return response.data;
  } catch (error) {
    console.error("Error fetch courses data.", error);
    throw error;
  }
};


export const getAllEnrolledCourses = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/enrollments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
    return response.data;
  } catch (error) {
    console.error("Error fetch courses data.", error);
    throw error;
  }
};