const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
console.log( token,"mmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user.role)

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only admins can create course.' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
