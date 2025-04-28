const express= require("express")
const { courseValidation } = require("../validations/course.validations")
const { verifyToken, isAdmin } = require("../middlewares/verify.token")
const { createCourse, getAllCourses, deleteCourse, updateCourse, getCourseById } = require("../controllers/course.controller")
const router= express.Router()

router.post('/admin/course',courseValidation,verifyToken,isAdmin, createCourse)
router.get('/courses',verifyToken,getAllCourses)
router.delete('/admin/course/:id',verifyToken ,isAdmin,deleteCourse);
router.put('/admin/course/:id',verifyToken,isAdmin, updateCourse);
router.get('/admin/course/:id',verifyToken,isAdmin, getCourseById);
module.exports= router
