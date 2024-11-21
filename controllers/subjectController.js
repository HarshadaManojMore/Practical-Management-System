import Subject from '../models/Subject.js'; 

export const createSubject = async (req, res) => {
    const { name, code } = req.body;
    const createdBy = req.user._id; 

    const newSubject = new Subject({ name, code, createdBy });
    await newSubject.save();

    res.json({ 
        message: 'Subject created successfully', newSubject
     });
};

export const getSubjects = async (req, res) => {
    try {
      const subjects = await SubjectModel.find();
      res.json({ subjects });
    } catch (error) {
      res.json({ error: 'Server error' });
      console.log(error);
      
    }
  };
