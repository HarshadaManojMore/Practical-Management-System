import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';


export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select('-password'); // Attach user info to request object
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    next();
  } catch (error) {
    console.error('Error in protect middleware:', error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};
export const isTeacher = (req, res, next) => {
  if (req.user?.role === 'Teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Teachers only.' });
  }
};

// Middleware to check if the user is a Student
export const isStudent = (req, res, next) => {
  if (req.user?.role === 'Student') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Students only.' });
  }
};
export const isAdminOrTeacher = (req, res, next) => {
  if (req.user?.role === 'Admin' || req.user?.role === 'Teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins or Teachers only.' });
  }
};
