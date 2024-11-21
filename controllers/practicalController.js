import Practical from '../models/Practical.js';
import Subject from '../models/Subject.js';

export const createPractical = async (req, res) => {
    const { subjectId, title, description } = req.body;
    const createdBy = req.user._id;
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.json({
        message: 'Subject not found'
    });

    const newPractical = new Practical({ subjectId, title, description, createdBy });
    await newPractical.save();

    res.json({ message: 'Practical added successfully', newPractical });
};

export const getPracticals = async (req, res) => {
    const practicals = await Practical.find().populate('subjectId', 'name code').populate('enrolledStudents', 'name email');
    res.json({ practicals });
};

export const enrollInPractical = async (req, res) => {
    const { practicalId } = req.body;
    const practical = await Practical.findById(practicalId);

    if (!practical) return res.json({ 
        message: 'Practical not found' 
    });

    practical.enrolledStudents.push(req.user._id);
    await practical.save();

    res.json({
         message: 'Enrolled in practical successfully' 
        });
};
