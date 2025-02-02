const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mock user data
const users = [
  {
    username: 'johnDoe',
    password: 'password123', // In production, use hashed passwords
  },
];

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle login form submission
app.post('/submit-login', (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send('Username not found');
  }

  // Check if the password matches
  if (user.password !== password) {
    return res.status(400).send('Invalid credentials');
  }

  // Set a cookie for authenticated user
  res.cookie('auth', 'true', { maxAge: 3600000 }); // Cookie for 1 hour
  res.send('Login successful! You are now logged in.');
});

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('auth');
  res.send('You have logged out');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
