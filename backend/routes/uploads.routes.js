const express= require("express")
const router= express.Router()
const {uploadsFile} = require("../controllers/uploads.file.controller")
const upload= require("../middlewares/multer")

router.post('/upload',upload.single('file'),uploadsFile)

module.exports= router