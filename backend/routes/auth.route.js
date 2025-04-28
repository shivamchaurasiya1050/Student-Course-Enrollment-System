const express=require("express")
const { RegisterUser, loginUser } = require("../controllers/auth.controller")
const { registerUserValidation, loginUserValidations } = require("../validations/auth.validations")
const router= express.Router()


router.post("/register",registerUserValidation,RegisterUser)
router.post("/login",loginUserValidations,loginUser)

module.exports= router