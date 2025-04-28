const db=require("../models/index")
const Course= db.Course 
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");
const slugify = require('slugify');

exports.createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, duration, price, isActive, image } = req.body;
    const existingCourse = await Course.findOne({ where: { title } });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course with this title already exists' });
    }
    const slug = slugify(title, { lower: true, strict: true });
    const createdCourse = await Course.create({
      title,
      slug,
      description,
      duration,
      price,
      isActive:true,
      image
    });

   return res.status(201).json({
      message: 'Course created successfully',
      course: createdCourse
    });

  } catch (error) {
    console.error(error);
   return res.status(500).json({
      message: 'Something went wrong',
      error: error.message
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query; 

    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
          title: {
            [Op.like]: `%${search}%`,
          },
        }
      : {};

    const { count, rows: courses } = await Course.findAndCountAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: true,
      message: 'Courses fetched successfully!',
      data: courses,
      pagination: {
        totalCourses: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


  exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      const course = await Course.findByPk(id);
  
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found!',
        });
      }
  
      await course.destroy(); 
  
     return res.status(200).json({
        success: true,
        message: 'Course deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting course:', error);
     return res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
  

  exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { title, description, duration, price, isActive, image } = req.body;
  
    try {
      const course = await Course.findByPk(id); 
  
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found!',
        });
      }
      if (title) {
        course.title = title;
        course.slug = slugify(title, { lower: true, strict: true });
      }
      course.title = title || course.title;
      course.description = description || course.description;
      course.duration = duration || course.duration;
      course.price = price || course.price;
      course.isActive = isActive !== undefined ? isActive : course.isActive;
      course.image = image || course.image;
  
      await course.save();
  
     return res.status(200).json({
        success: true,
        message: 'Course updated successfully!',
        data: course,
      });
    } catch (error) {
      console.error('Error updating course:', error);
     return res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
  

  exports.getCourseById = async (req, res) => {
    try {
      const courseId=req.params.id
      const course = await Course.findOne({
        where:{id:courseId}
      });
      if(!courseId){
        return res.status(404).json({
          success: false,
          message: 'Course not founds!',
        });
      }
  
     return res.status(200).json({
        success: true,
        message: 'Course fetched successfully!',
        data: course,
      });
    } catch (error) {
      console.error('Error fetching courses:', error);
     return res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
  

