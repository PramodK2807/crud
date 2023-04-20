const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3100

require('./db/config')

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const Student = require('./models/Student');

// app.get('/', (req, res) => {
//     res.send("hello")
//     console.log("first")
// })

app.get('/student', async (req, res) => {

    // const keyword = req.query.key
    //     let data = await Student.find({
    //     $or: [
    //         { name: { $regex: keyword, $options: 'i' } },
    //         { fatherName: { $regex: keyword, $options: 'i' } },
    //     ]

    // })
        const student = await Student.find()
        if (!student) {
            return res.status(404).send({
                success: false,
                message: "No data found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Students",
            student
        })

})

app.delete('/student/:id', async(req, res) => {
    const id = req.params.id;
    const student = await Student.deleteOne({_id: id});
    res.status(200).send({
        success: true,
        message: "Students deleted successfully",
        student
    })
})

app.get('/student/:id', async(req, res) => {
    const id = req.params.id;
    const student = await Student.findById({_id: id});
    res.status(200).send({
        success: true,
        message: "Student updated Successfully",
        student
    })
})

app.put('/student/:id', async(req, res) => {
    const id = req.params.id;
    let {name, email, age, fatherName, contact_number} = req.body;
    let student = await Student.updateOne({_id:id},
        {$set: {name, age, email, fatherName, contact_number }} )
        res.status(200).send({
            success: true,
            message: "Student updated Successfully",
            student
        })

    
})

app.post('/student', async(req, res) => {
    let {name, email, age, fatherName, contact_number} = req.body;
    // console.log(name)
    try {
        
        let existingUser = await Student.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message : "Email already registered",
            })
        }
        let student = new Student({name, email, age, fatherName, contact_number})
        await student.save()
        res.status(200).send({
            success: true,
            message: "Student Registered Successfully",
            student
        })
    } catch (error) {
        
    }
    
})


app.get('/student/:id', async (req, res) => {
    const user = await Student.findOne({_id:req.params.id})
    res.status(200).send({
        success: true,
        message: "Students",
        user
    })

})

app.listen(PORT)