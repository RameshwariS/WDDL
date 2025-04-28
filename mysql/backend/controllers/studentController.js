// get all students list
const db = require("../config/db");

const getStudents = async (req , res) => {
    try{
        const [students] = await db.query('SELECT * FROM students')
        if(!students)
        {
            return res.status(404).send({
                success: false,
                message: "No data found"    
            })
        }

        res.status(200).send({
            success: true,
            message: "all students record found",
            students: students
        })
    }
    catch  (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all students api",
            error

        })
    }
};

// get students by id
const getStudentById = async (req, res) => {

    try{
       const studentId = req.params.id;
       if(!studentId)
       {
        return res.status(404).send({
            success: false,
            message: 'No student id found'
        })
       }
       const data = await db.query(`SELECT * FROM students WHERE id = ${studentId}`);
       if(!data)
       {
            res.status(404).send({
                success: false,
                message: 'No student found for given id'
            })
       }

       return res.status(200).send({
        success: true,
        message: 'Student found successfully',
        data: data[0]
       })
    }
    catch  (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all students api",
            error

        })
    }
}

// create student
const createStudent = async (req, res) => {
    try {
        const {name, roll_no, fees, standard, medium} = req.body;

        if(!name || !roll_no || !fees || !standard || !medium)
        {
            return res.status(500).send({
                success: false,
                message: 'Student data not found'
            })
        }

        const data = await db.query(
            `INSERT INTO students (name, roll_no, fees, standard, medium) VALUES (?, ?, ?, ?, ?)`,
            [name, roll_no, fees, standard, medium]
        );
        
        if(!data)
        {
            return res.status(404).send({
                success: false,
                message: 'Error inserting data'
            })
        }

        return res.status(201).send({
            success: true,
            message: 'Data inserted successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting create students api",
            error
        })
    }
}

// update student
const updateStudent = async (req, res) =>{
    
    try {
        const studentId = req.params.id;

        if(!studentId)
        {
            return res.status(404).send({
                success: false,
                message: 'Please enter valid id'
            })
        }

        const {name, roll_no, fees, standard, medium} = req.body;

        const data = db.query(`UPDATE students SET name = ?, roll_no = ?, fees = ?, standard = ?, medium = ?
            WHERE id = ?`,
        [name, roll_no, fees, standard, medium, studentId]);

        if(!data)
        {
            return res.status(500).send({
                success: false,
                message: 'Error in updating data'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Updated successfully'
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting updateStudent api',
            error
        })
    }
}


// delete student
const deleteStudent = async (req, res) =>{
    try {
        const studentId = req.params.id;
        if(!studentId)
        {
            return res.status(404).send({
                success: false,
                message: 'Please enter valid id'
            })
        }

        await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);
        res.status(200).send({
            success: true,
            message: 'Student deleted successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting the delete api',    
            error
        })
    }
}


module.exports = {getStudents, getStudentById, createStudent, updateStudent, deleteStudent}