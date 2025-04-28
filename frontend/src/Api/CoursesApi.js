import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';
export const getAllCourses = async (token, page = 1, limit = 6, search = '') => {
  try {
    const response = await axios.get(`${apiUrl}/courses?page=${page}&limit=${limit}&search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching courses", error);
    throw error;
  }
};


export const addCourse = async (data,token) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/course`,data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
          
      return response.data;
    } catch (error) {
      console.error("Error fetch courses data.", error);
      throw error;
    }
  };


  export const updateCourse = async (courseId,data,token) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/course/${courseId}`,data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
          
      return response.data;
    } catch (error) {
      console.error("Error fetch courses data.", error);
      throw error;
    }
  };
  export const deleteCourse = async (courseId,token) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/course/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
          
      return response.data;
    } catch (error) {
      console.error("Error fetch courses data.", error);
      throw error;
    }
  };

  export const getCourseById = async (courseId,token) => {
    try {
      const response = await axios.get(`${apiUrl}/admin/course/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
          
      return response.data;
    } catch (error) {
      console.error("Error fetch courses data.", error);
      throw error;
    }
  };


  export const uploadImage = async (formDate,token) => {
    console.log(formDate,"formData")
    try {
      const response = await axios.post(`${apiUrl}/upload`,formDate, {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
         
          
      return response.data;
    } catch (error) {
      console.error("Error fetch courses data.", error);
      throw error;
    }
  };