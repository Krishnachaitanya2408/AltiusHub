require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true},
  password: String,
});
const User = mongoose.model('User',UserSchema);

const auth = (req, res, next)=>{
  const header = req.headers.authorization;
  if(!header)return res.sendStatus(401);

  const token = header.split(' ')[1];
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch{
    res.sendStatus(403);
  }
};

app.post('/api/register', async(req,res)=>{
  const hashed = await bcrypt.hash(req.body.password, 10);
  const mail = req.body.email;
  const user = new User({email: mail, password: hashed });
  await user.save();
  res.status(201).json({ message:'Registered'});
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


const PORT = process.env.PORT;
app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)});

