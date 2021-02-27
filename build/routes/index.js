const express = require('express');

const router = express.Router(); //Interacción con la base de datos

const User = require('../models/users');

const Student = require('../models/students');

const Course = require('../models/courses');

const Enrollment = require('../models/enrollment');

const config = require('../config');

const jwt = require('jsonwebtoken');

const {
  verifyJwt
} = require('../middlewares');

router.get('/', (req, res) => {
  res.render('index');
}); //Crear un Usuario

router.post('/addUser', async (req, res) => {
  const user = await new User(req.body);
  user.save();
  res.send('recieved');
}); //Crear un student

router.post('/addStudent', async (req, res) => {
  const student = await new Student(req.body);
  student.save();
  res.send('recived');
}); //crear un course

router.post('/addCourse', async (req, res) => {
  const courses = await new Course(req.body);
  courses.save();
  res.send('recieved');
}); //crear de enrollment

router.post('/addEnrollment', async (req, res) => {
  const enrollment = await new Enrollment(req.body);
  enrollment.save();
  res.send('recived');
}); //obtener enrollment

router.get('/getEnrollment', verifyJwt, async (req, res) => {
  const enrollment = await Enrollment.find({
    courses: 1
  });
  console.log(enrollment);
  res.json(enrollment);
}); //Crear un nuevo enrollment

router.post('/addStudentEnrollment', async (req, res) => {
  const enrollment = await Enrollment.find({
    courses: req.body.courses
  });
  const student = await Student.find({
    name: req.body.name
  });
  const arreglo = {
    credits: 0,
    _id: student[0]._id
  };
  enrollment[0].students.push(arreglo);
  await Enrollment.updateOne({
    courses: req.body.courses
  }, {
    students: enrollment[0].students
  });
  res.json(enrollment);
}); //actualizar los creditos de un estudiante

router.put('/getCredits', async (req, res) => {
  const enrollment = await Enrollment.find({
    courses: req.body.courses
  });
  const students = await Student.find({
    name: req.body.name
  });
  const id = students[0]._id;
  const student = enrollment[0].students.filter(stu => stu._id == id.toString())[0];
  student.credits += 5;
  await Enrollment.updateOne({
    courses: req.body.courses
  }, {
    students: enrollment[0].students
  });
  res.json('recieved');
}); //Obtener students

router.get('/getStudent', async (req, res) => {
  const student = await Student.find();
  console.log(student);
  res.json(student);
}); //delete students

router.delete('/deleteStudents/:id', async (req, res) => {
  await Student.findByIdAndRemove(req.params.id);
  res.json({
    status: 'success'
  });
}); //delete users

router.delete('/deleteUsers/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({
    status: 'success'
  });
}); //delete enrollment 

router.delete('/deleteEnrollment/:id', async (req, res) => {
  await Enrollment.findByIdAndRemove(req.params.id);
  res.json({
    status: 'success'
  });
}); //consultas

router.get('/students50Credits', async (req, res) => {
  // const findCourses = await Enrollment.find();
  // const creditsStudent = findCourses[0].students
  // const filtrar = await creditsStudent.filter(credits => credits.credits >= 50);
  const findCourses = await Enrollment.find();
  const arreglo = findCourses.map(course => {
    const filt = course.students.filter(cour => cour.credits >= 50);
    res.json(filt);
  }); //const filtrar = await creditsStudent.filter(credits => credits.credits >= 50);
  //console.log(filtrar);
}); //CURSO CON MAS ESTUDIANTES

router.get('/coursesStudents', async (req, res) => {
  const findCourses = await Enrollment.find();
  let mayor = 0;
  let enroll = "";
  const arreglo = findCourses.map(enrollment => {
    if (enrollment.students.length > mayor) {
      enroll = enrollment;
    }
  });
  console.log(enroll);
}); //student, sus courses y credits.

router.get('/studentsCoursesCredits/:name', async (req, res) => {
  const students = await Student.find({
    name: req.params.name
  });
  const enrollment = await Enrollment.find();
  let array = [];
  enrollment.map(async enroll => {
    const filtro = enroll.students.filter(n => n._id == students[0]._id.toString());
    const courseName = await Course.find({
      _id: enroll.courses
    });
    const obj = {
      name: courseName[0].name,
      credits: filtro[0].credits
    };
    array.push(obj);
  });
  let objeto = {
    _id: students[0]._id,
    name: students[0].name,
    courses: array
  };
  console.log(objeto);
  await res.json(objeto);
}); //course, sus students y credits ,toda la información de ambos,
//autenticacion para crear un usuario

router.post('/auth/signup', async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password)
  });
  const savedUser = await newUser.save();
  const token = jwt.sign({
    id: savedUser._id
  }, config.SECRET, {
    expiresIn: 3600
  });
  return res.json(token);
}); //metodo para logear un usuario

router.post('/auth/signin', async (req, res) => {
  const user = await User.find({
    email: req.body.email
  });
  const comp = await User.comparePassword(req.body.password, user[0].password);

  if (!comp) {
    return res.json('Invalid password').status(401);
  }

  ;
  const token = jwt.sign({
    id: user._id
  }, config.SECRET, {
    expiresIn: 3600
  });
  return res.json(token);
});
module.exports = router;