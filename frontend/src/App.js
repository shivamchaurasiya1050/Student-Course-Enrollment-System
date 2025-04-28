import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AllCourses from './pages/students/AllCourses';
import EnrolledCourses from './pages/students/EnrolledCourses';
import Navbar from './components/Navbar';
import AddCourse from './pages/admin/AddCourse';
import AdminAllEnrollments from './pages/admin/AdminAllEnrollments';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/all-courses" element={<PrivateRoute><AllCourses /></PrivateRoute>} />
          <Route path="/enrolled-courses" element={<PrivateRoute><EnrolledCourses /></PrivateRoute>} />
          <Route path="/add-course" element={<PrivateRoute><AddCourse /></PrivateRoute>} />
          <Route path="/all-enrolled-courses" element={<PrivateRoute><AdminAllEnrollments /></PrivateRoute>} />
          <Route path="/edit-course/:courseId" element={<PrivateRoute><AddCourse /></PrivateRoute>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>

      
      <Footer/>
    </Router>
  );
}

export default App;
