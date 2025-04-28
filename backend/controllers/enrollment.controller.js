const db= require("../models/index")
const Enrollments=db.Enrollment
const Course=db.Course
const User= db.User


exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.params; 
    const userId = req.user.id;
    console.log(userId,"userID")      
    
    try {
        const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found.',
        });
      }
      const existingEnrollment = await Enrollments.findOne({
        where: { userId, courseId },
      });
      if (existingEnrollment) {
        return res.status(400).json({
          success: false,
          message: 'You are already enrolled in this course.',
        });
      }
      const enrollment = await Enrollments.create({
        userId,
        courseId,
      });
  
     return res.status(201).json({
        success: true,
        message: 'You have successfully enrolled in the course.',
        data: enrollment,
      });
    } catch (error) {
      console.error('Error enrolling user:', error);
     return res.status(500).json({
        success: false,
        message: 'Server Error.',
      });
    }
  };

  exports.getUserEnrollments = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const enrollments = await Enrollments.findAll({
        where: { userId },
        include: [
          {
            model: Course,
            // attributes: ['id', 'title', 'description', 'price', 'duration', 'isActive'],
          },
        ],
      });
      
    return res.status(200).json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error.',
      });
    }
  };


  exports.deleteEnrollment = async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.params; 
  
    try {
     
      const enrollment = await Enrollments.findOne({
        where: { userId, courseId },
      });
  
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: 'Enrollment not found.',
        });
      }
      await Enrollments.destroy({
        where: { userId, courseId },
      });
  
     return res.status(200).json({
        success: true,
        message: 'Successfully unenrolled from the course.',
      });
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error.',
      });
    }
  };

  exports.getAllEnrollments = async (req, res) => {
    try {

      const enrollments = await Enrollments.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: Course,
            // attributes: ['id', 'title', 'slug'],
          },
        ],
      });
  
     return res.status(200).json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      console.error('Error fetching enrollments:', error);
     return res.status(500).json({
        success: false,
        message: 'Server error.',
      });
    }
  };