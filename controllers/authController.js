const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const register = async (req, res) => {
  const { email, password, name } = req.body;
  
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({
    email,
    password: hashedPassword,
    name
  });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
};

// Login a user and generate JWT
const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

// Validate token (for protected routes)
const validateToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { register, login, validateToken };
