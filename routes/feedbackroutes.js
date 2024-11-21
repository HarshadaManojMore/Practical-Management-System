import express from 'express';
import { createUser,loginUser } from '../controllers/userControllers.js';
import { getAllUsers } from '../controllers/userControllers.js';
import { createSubject, getSubjects } from '../controllers/subjectController.js';
import { createPractical, getPracticals, enrollInPractical } from '../controllers/practicalController.js';
import { protect, isAdmin, isTeacher, isStudent } from '../middleware/Middleware.js';
import { getAllAdmins, getAllTeachers, getAllStudents} from "../controllers/userControllers.js"
import { isAdminOrTeacher } from '../middleware/Middleware.js';

const router = express.Router();

router.post('/users/create', createUser);
router.post('/users/login', loginUser);
router.get('/users/get',getAllUsers)
router.post('/subjects/create', protect, isAdmin, createSubject);
router.get('/subjects/get', getSubjects);
router.post('/practicals/create', protect, isTeacher, createPractical);
router.get('/practicals/get',  getPracticals);
router.post('/practicals/enroll', protect, isStudent, enrollInPractical);
router.get('/admins/get', protect, isAdmin, getAllAdmins);
router.get('/teachers/get', protect, isAdmin, getAllTeachers);
router.get('/students/get', protect, isAdminOrTeacher, getAllStudents);

export default router;
