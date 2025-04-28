# Project Name

Student-Course-Enrollment-System

## Tech Stack

### Frontend
-  React,React-router-dom(v6),bootstrap

### Backend
- Nodejs,express.js,JWT,Multer,uuid


### Database
- MySQL,Sequelize Type ORM
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all

### Other Tools

## Setup Instructions

### Frontend Setup
1. Clone the repository: `git clone 
2. Navigate to frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start development server: `npm start`

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables (create `.env` file):
PORT=5000
JWT_SECRET=SDFGHJKDFGHJKFGHJKDFGHJKSDFGHJKFGHJ
DB_DEVELOPMENT_USERNAME=root
DB_DEVELOPMENT_PASSWORD=root
DB_DEVELOPMENT_DATABASE=studants_management
DB_DEVELOPMENT_HOST=127.0.0.1
DB_DEVELOPMENT_DIALECT=mysql

4. Start server: `npm start`

## Sample Credentials

For testing purposes, you can use these credentials:

**Admin User:**
- Email: admin@gmail.com
- Password: Admin@123

**Regular User:**
- Email: user@example.com
- Password: User@123

## Database Schema

The database schema is available in the following ways:
1. [Attach a .sql dump file to your repository]
2. [Describe schema here if not using a dump file]

### Tables Structure
- **users** (id, name, email, password, role, createdAt, updatedAt)
- **Courses** (id title slug description duration price isActive createdAt updatedAt image)
- **Enrollments** (id userId courseId createdAt updatedAt)

