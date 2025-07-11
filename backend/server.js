const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/studentsDB")
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  scores: {
    Java: Number,
    CPP: Number,
    Python: Number,
    GenAI: Number,
    FSD: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);


app.post("/student", async(req, res)=>{
  try{
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    res.status(400).json({ message: "Failed to add student", error: err });
  }
});

app.put("/student/:id", async(req, res)=>{
  const rollNo = req.params.id;
  try{
    const updtStud = await Student.findOneAndUpdate(
      {rollNo},
      req.body
    );
    if(updtStud){
      res.status(200).json({message:"Student updated successfully"});
    }
    else{
      res.status(404).json({message:"Student not found"});
    }
  }
  catch(err){
    res.status(400).json({message:"Failed to update student", error: err});
  }
});

app.delete("/student/:id",async(req, res)=>{
  const rollNo = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(rollNo);
    if(deletedStudent){
      res.status(200).json({ message: "Student deleted successfully", deletedStudent });
    }
    else{
      res.status(404).json({ message: "Student not found" });
    }
  }
  catch(err){
    res.status(400).json({ message: "Failed to delete student", error: err });
  }
});

app.get("/allStudents", async (req, res) => {
  try {
    const students = await Student.find({}, { name: 1, rollNo: 1, scores: 1, _id: 0 });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students", error });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
