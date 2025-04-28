const express= require("express")
require("dotenv").config()
const bodyParser= require("body-parser")
const app= express()
const PORT= process.env.PORT||4000
const cors= require('cors')
const authRoute= require("./routes/auth.route")
const courseRoute= require("./routes/course.route")
const enrollRoute= require("./routes/enrollment.route")
const uploadFile = require("./routes/uploads.routes")

app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res)=>{
res.send("Hello from index!")
})


// route-------------
app.use("/api/auth",authRoute)
app.use("/api",courseRoute)
app.use("/api",enrollRoute)
app.use("/api",uploadFile)
app.listen(PORT,()=>{
console.log(`server is running on http://localhost:${PORT}`)
})