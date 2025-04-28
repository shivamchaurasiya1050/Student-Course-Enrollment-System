const express= require("express")
const { verifyToken, isAdmin } = require("../middlewares/verify.token")
const { enrollInCourse, getUserEnrollments, deleteEnrollment, getAllEnrollments } = require("../controllers/enrollment.controller")
const router=express.Router()


router.post('/enroll/:courseId',verifyToken,enrollInCourse)
router.get('/my-enrollments', verifyToken, getUserEnrollments);
router.delete('/enroll/:courseId', verifyToken, deleteEnrollment);
router.get('/admin/enrollments', verifyToken,isAdmin, getAllEnrollments);



module.exports= router