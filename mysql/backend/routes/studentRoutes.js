const express = require("express");
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

// router object
const router = express.Router();

// routes
// get all students (GET)
router.get("/getall", getStudents)

// get student by :id (GET)
router.get("/get/:id", getStudentById);

// create student (POST)
router.post("/create", createStudent);

// update student (UPDATE)
router.put('/update/:id', updateStudent);

// delete student
router.delete('/delete/:id', deleteStudent)


module.exports = router;