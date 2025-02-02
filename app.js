const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS or images)
app.use(express.static(path.join(__dirname, 'public')));

// Mock user data (replace with a real database in production)
const users = [
  { username: 'john_doe', password: 'password123' },
  { username: 'jane_doe', password: 'mypassword' }
];

// Serve the login page (HTML form)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match any user
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Redirect to a welcome page or show a success message
    res.send('<h1>Login successful!</h1>');
  } else {
    // If no match, show an error message
    res.send('<h1>Invalid username or password. Please try again.</h1>');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
