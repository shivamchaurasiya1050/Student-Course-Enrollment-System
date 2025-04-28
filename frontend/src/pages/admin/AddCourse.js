import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { addCourse, getCourseById, updateCourse, uploadImage } from '../../Api/CoursesApi';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
      setIsEdit(true);
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await getCourseById(courseId, token);
      const course = response.data;
      setValue('title', course.title);
      setValue('description', course.description);
      setValue('price', course.price);
      setValue('duration', course.duration);
      setImageUrl(course.image);
    } catch (error) {
      toast.error('Failed to load course details');
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data, "dadta")
    const finalData = {
      ...data,
      image: imageUrl || data.image
    };
    console.log(finalData, "finalData")
    try {
      if (isEdit) {
        const response = await updateCourse(courseId, finalData, token);
        if (response?.message) {
          toast.success('Course updated successfully!');
          setTimeout(() => {
            navigate('/all-courses');
          }, 2000);
        }
      } else {
        const response = await addCourse(finalData, token);
        if (response?.message) {
          toast.success('Course added successfully!');
          setTimeout(() => {
            navigate('/all-courses');
          }, 2000);
        }
      }
    } catch (error) {
      toast.error('Failed to save the course');
      console.error(error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await uploadImage(formData, token);

        console.log(response)
        if (response?.file) {
          setImageUrl(response.file);
          toast.success('Image uploaded successfully!');
        }
      } catch (error) {
        toast.error('Failed to upload image');
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{isEdit ? 'Update Course' : 'Add New Course'}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Course Title</label>
          <input
            type="text"
            className="form-control"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span className="text-danger">{errors.title.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Course Description</label>
          <textarea
            className="form-control"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <span className="text-danger">{errors.description.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <span className="text-danger">{errors.price.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="text"
            className="form-control"
            {...register('duration', { required: 'Duration is required' })}
          />
          {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Course Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {imageUrl && (
          <div className="mb-3">
            <img
              src={imageUrl}
              alt="Course Preview"
              style={{ width: '200px', height: 'auto', marginTop: '10px' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {isEdit ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddCourse;
